"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../projects/footer";

// Import Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";

const LoginPage = () => {
  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBnvISpigqkZ6aBe7D6emTjnGMKjh7hli4",
    authDomain: "ssk-port.firebaseapp.com",
    projectId: "ssk-port",
    storageBucket: "ssk-port.firebasestorage.app",
    messagingSenderId: "18307451979",
    appId: "1:18307451979:web:5610fbfd954645c3c211ce",
    measurementId: "G-J7SL77ZSNG",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
  const auth = getAuth(app);

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const [loginMethod, setLoginMethod] = useState("email");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationId, setVerificationId] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Initialize reCAPTCHA verifier for phone auth
  useEffect(() => {
    if (typeof window !== "undefined" && loginMethod === "phone") {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        }
      );
    }
  }, [loginMethod, auth]);

  // Check if user is already logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          // User is logged in, get the token
          const idToken = await user.getIdToken();
          
          // Store authentication in localStorage or cookies
          localStorage.setItem('authToken', idToken);
          localStorage.setItem('userUID', user.uid);
          
          // Set the current user
          setCurrentUser(user);
        } catch (error) {
          console.error("Error getting user token:", error);
        }
      }
    });
    
    return () => unsubscribe();
  }, [auth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleLoginMethodChange = (method) => {
    setLoginMethod(method);
    setError("");
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      if (loginMethod === "email") {
        if (!formData.email || !formData.password) {
          throw new Error("Email and password are required");
        }

        // 1. Firebase authentication
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        
        // 2. PROPERLY get ID token
        const idToken = await userCredential.user.getIdToken();
        
        // 3. Store authentication in localStorage or cookies
        localStorage.setItem('authToken', idToken);
        localStorage.setItem('userUID', userCredential.user.uid);
        
        // 4. Send to backend
        const response = await fetch("/api/login", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${idToken}` // Proper header format
          }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || "Login failed");
        }
        
        // Store user data in context/state
        setCurrentUser(data.user);
        
        // Use router for navigation instead of direct redirection
        // This ensures the user state is properly set before navigation
        setTimeout(() => {
          window.location.href = "/"; // Change this to your protected home route
        }, 500);
      } else if (loginMethod === "phone") {
        if (!verificationSent) {
          // Send verification code
          if (!formData.phone) {
            throw new Error("Phone number is required");
          }

          const phoneNumber = formData.phone;
          const appVerifier = window.recaptchaVerifier;

          const confirmationResult = await signInWithPhoneNumber(
            auth,
            phoneNumber,
            appVerifier
          );
          setVerificationId(confirmationResult.verificationId);
          setVerificationSent(true);

          // Store confirmationResult globally to access later
          window.confirmationResult = confirmationResult;
        } else {
          // Verify code
          if (!verificationCode) {
            throw new Error("Verification code is required");
          }

          const confirmationResult = window.confirmationResult;
          if (!confirmationResult) {
            throw new Error("Verification session expired. Please try again.");
          }

          const userCredential = await confirmationResult.confirm(verificationCode);
          
          // Get Firebase ID token
          const idToken = await userCredential.user.getIdToken();
          
          // Store authentication in localStorage or cookies
          localStorage.setItem('authToken', idToken);
          localStorage.setItem('userUID', userCredential.user.uid);
          
          // Verify with backend
          const response = await fetch("/api/phone-login", {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "Authorization": `Bearer ${idToken}` // Proper header format
            }
          });
          
          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.message || "Login failed");
          }
          
          // Store user data in context/state
          setCurrentUser(data.user);
          
          // Use router for navigation
          setTimeout(() => {
            window.location.href = "/"; // Change this to your protected home route
          }, 500);
        }
      }
    } catch (err) {
      console.error("Login error:", err);

      // Handle Firebase specific errors
      if (err.code) {
        switch (err.code) {
          case "auth/invalid-email":
            setError("Invalid email address format.");
            break;
          case "auth/user-disabled":
            setError("This account has been disabled.");
            break;
          case "auth/user-not-found":
            setError("No account found with this email.");
            break;
          case "auth/wrong-password":
            setError("Incorrect password.");
            break;
          case "auth/invalid-phone-number":
            setError("Invalid phone number format.");
            break;
          case "auth/invalid-verification-code":
            setError("Invalid verification code.");
            break;
          default:
            setError(err.message || "Failed to login. Please try again.");
        }
      } else {
        setError(err.message || "Failed to login. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.background}></div>
      <div style={styles.container}>
        <motion.div
          style={styles.card}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 style={styles.heading}>Login to Ssk&apos;s Web</h2>

          <div style={styles.tabs}>
            <motion.button
              style={{
                ...styles.tabButton,
                backgroundColor:
                  loginMethod === "email" ? "#9370DB" : "#2E2E2E",
              }}
              onClick={() => handleLoginMethodChange("email")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Email
            </motion.button>
            <motion.button
              style={{
                ...styles.tabButton,
                backgroundColor:
                  loginMethod === "phone" ? "#9370DB" : "#2E2E2E",
              }}
              onClick={() => handleLoginMethodChange("phone")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Phone
            </motion.button>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            {loginMethod === "email" ? (
              <>
                <motion.input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                  whileFocus={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  style={styles.input}
                  whileFocus={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                />
              </>
            ) : (
              <>
                <motion.div style={styles.serviceNotice}>
                  Currently, Phone Login Service is not available. Kindly use
                  Email Login Services, Sorry for the inconvenience caused.
                </motion.div>
                <motion.input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (with country code)"
                  value={formData.phone}
                  onChange={handleChange}
                  style={styles.input}
                  whileFocus={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  disabled={verificationSent || true}
                />
                {verificationSent && (
                  <motion.input
                    type="text"
                    placeholder="Verification Code"
                    value={verificationCode}
                    onChange={handleVerificationCodeChange}
                    style={styles.input}
                    whileFocus={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                <div id="recaptcha-container"></div>
              </>
            )}

            {error && <p style={styles.error}>{error}</p>}

            <motion.button
              type="submit"
              style={styles.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              disabled={loading || loginMethod === "phone"}
            >
              {loading
                ? "Please wait..."
                : verificationSent
                  ? "Verify Code"
                  : "Login"}
            </motion.button>

            <motion.div style={styles.linksContainer}>
              <motion.a
                href="/forgot-password"
                style={styles.forgotPasswordLink}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Forgot password?
              </motion.a>

              <motion.a
                href="/signup"
                style={styles.signupLink}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Not registered yet? Sign up now
              </motion.a>
            </motion.div>
          </form>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  wrapper: {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    overflow: "hidden",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: "url('/background/data.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    filter: "blur(8px)",
    zIndex: 0,
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    position: "relative",
    zIndex: 1,
    padding: "20px",
  },
  card: {
    backgroundColor: "rgba(30, 30, 30, 0.9)",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.4)",
    width: "380px",
    textAlign: "center",
    backdropFilter: "blur(8px)",
  },
  tabs: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  tabButton: {
    padding: "10px 25px",
    border: "none",
    borderRadius: "5px",
    margin: "0 5px",
    cursor: "pointer",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "500",
  },
  heading: {
    color: "#fff",
    fontSize: "24px",
    marginBottom: "20px",
    fontWeight: "600",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "8px",
    border: "1px solid #555",
    backgroundColor: "#2E2E2E",
    color: "#fff",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  button: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#9370DB",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "17px",
    fontWeight: "500",
    marginTop: "10px",
  },
  error: {
    color: "#ff6b6b",
    fontSize: "14px",
    margin: "0",
    textAlign: "left",
  },
  linksContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "15px",
  },
  forgotPasswordLink: {
    color: "#9370DB",
    fontSize: "14px",
    textDecoration: "none",
    cursor: "pointer",
  },
  signupLink: {
    color: "#fff",
    fontSize: "14px",
    textDecoration: "none",
    cursor: "pointer",
  },
  serviceNotice: {
    color: "#ff6b6b",
    fontSize: "14px",
    padding: "10px",
    backgroundColor: "rgba(255, 107, 107, 0.1)",
    borderRadius: "8px",
    textAlign: "center",
    marginBottom: "5px",
  },
};

export default LoginPage;