"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Footer from "../projects/footer";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
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

          <form onSubmit={handleSubmit} style={styles.form}>
            {["email", "phone", "password"].map((field, idx) => (
              <motion.input
                key={idx}
                type={
                  field === "password"
                    ? "password"
                    : field === "phone"
                    ? "tel"
                    : "email"
                }
                name={field}
                placeholder={
                  field === "phone"
                    ? "Phone Number"
                    : field.charAt(0).toUpperCase() + field.slice(1)
                }
                value={formData[field]}
                onChange={handleChange}
                style={styles.input}
                whileFocus={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              />
            ))}

            <motion.button
              type="submit"
              style={styles.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Login
            </motion.button>
            <motion.a
              href="/signup"
              style={styles.signupLink}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Not registered yet? Sign up now
            </motion.a>
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
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.4)",
    width: "360px",
    textAlign: "center",
    backdropFilter: "blur(8px)",
  },
  signupLink: {
    color: "#9370DB",
    marginTop: "10px",
    fontSize: "14px",
    textDecoration: "underline",
    cursor: "pointer",
  },
  heading: {
    color: "#fff",
    fontSize: "20px",
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    width: "100%",
    padding: "12px",
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
    padding: "12px",
    backgroundColor: "#9370DB",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "17px",
    marginTop: "10px",
  },
};

export default LoginPage;
