"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Footer from "../projects/footer";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    photo: null,
    name: "",
    email: "",
    phone: "",
    password: "",
    organization: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
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
          <h2 style={styles.heading}>Register to go in Ssk&apos;s Web</h2>

          {/* Photo Upload */}
          <motion.div
            style={styles.photoContainer}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <label style={styles.uploadLabel}>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handlePhotoUpload}
              />
              {formData.photo ? (
                <motion.img
                  src={formData.photo}
                  alt="Profile"
                  style={styles.profileImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              ) : (
                <motion.div style={styles.uploadBox}>Upload</motion.div>
              )}
            </label>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={styles.form}>
            {["name", "email", "phone", "password", "organization"].map(
              (field, idx) => (
                <motion.input
                  key={idx}
                  type={
                    field === "password"
                      ? "password"
                      : field === "email"
                        ? "email"
                        : "text"
                  }
                  name={field}
                  placeholder={
                    field === "name"
                      ? "Full Name"
                      : field.charAt(0).toUpperCase() + field.slice(1)
                  }
                  value={formData[field]}
                  onChange={handleChange}
                  style={styles.input}
                  whileFocus={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                />
              )
            )}

            <motion.button
              type="submit"
              style={styles.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Register
            </motion.button>
            <motion.a
              href="/login"
              style={styles.signupLink}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Already registered? Just Log In now
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
  photoContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "15px",
  },
  uploadLabel: {
    cursor: "pointer",
  },
  profileImage: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #9370DB",
    transition: "transform 0.3s",
  },
  uploadBox: {
    width: "80px",
    height: "80px",
    backgroundColor: "#444",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "14px",
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

export default SignUpPage;
