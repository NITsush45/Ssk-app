"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 5 + 2,
  duration: Math.random() * 20 + 10,
  delay: Math.random() * 2,
}));

const SignUpPage = () => {
  const router = useRouter();
  const [formStep, setFormStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errors, setErrors] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [photoPreview, setPhotoPreview] = useState("");
  const [gradientAngle, setGradientAngle] = useState(135);

  const [formData, setFormData] = useState({
    photo: "",
    name: "",
    email: "",
    phone: "",
    organization: "",
    password: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientAngle((prevAngle) => (prevAngle + 1) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        window.location.href = '/'; // Full page reload to trigger auth check
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  const fieldGroups = [
    {
      fields: ["photo"],
      title: "Profile Picture",
      description: "Upload a profile photo (optional)",
    },
    {
      fields: ["name", "email"],
      title: "Basic Information",
      description: "Tell us about yourself",
    },
    {
      fields: ["phone", "organization"],
      title: "Contact Details",
      description: "How can we reach you?",
    },
    {
      fields: ["password"],
      title: "Security",
      description: "Create a secure password",
    },
  ];

  const validations = {
    name: (v) => v.trim().length >= 2 || "Name must be at least 2 characters",
    email: (v) => /^\S+@\S+\.\S+$/.test(v) || "Invalid email address",
    password: (v) => v.length >= 8 || "Password must be at least 8 characters",
    phone: (v) => !v || /^\d{10}$/.test(v) || "Invalid phone number",
    organization: () => true,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = (e) => setPhotoPreview(e.target?.result || "");
      reader.readAsDataURL(file);

      const storage = getStorage();
      const storageRef = ref(storage, `users/${Date.now()}_${file.name}`);
      setUploadProgress(10);
      const snapshot = await uploadBytes(storageRef, file);
      setUploadProgress(70);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setFormData((prev) => ({ ...prev, photo: downloadURL }));
      setUploadProgress(100);
      setTimeout(() => setUploadProgress(0), 2000);
    } catch (error) {
      alert("Photo upload failed. Please try again.");
      setUploadProgress(0);
    }
  };

  const validateStep = (step) => {
    const currentFields = fieldGroups[step]?.fields || [];
    const newErrors = {};

    currentFields.forEach((field) => {
      if (field === "photo") return;
      const validator = validations[field];
      if (validator) {
        const result = validator(formData[field] || "");
        if (result !== true) newErrors[field] = result;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep(formStep)) return;
    setFormStep((prev) => Math.min(prev + 1, fieldGroups.length - 1));
  };

  const prevStep = () => {
    setFormStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(formStep)) return;
  
    setIsLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("userToken", data.token);
        setShowSuccessMessage(true); // This triggers the useEffect redirect
      } else {
        throw new Error(data.message || "Registration failed");
      }
    } catch (error) {
      alert(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };  

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(${gradientAngle}deg, #3b82f6, #06b6d4)`,
      }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0 }}
          animate={{ x: `${p.x}vw`, y: `${p.y}vh`, opacity: 0.4 }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, repeatType: "reverse" }}
          style={{
            position: "absolute",
            backgroundColor: "white",
            borderRadius: "50%",
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          backgroundColor: "white",
          borderRadius: "1rem",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          padding: "2rem",
          width: "100%",
          maxWidth: "28rem",
          zIndex: 10,
        }}
      >
        <h2 style={{ 
          fontSize: "1.5rem", 
          fontWeight: "bold", 
          marginBottom: "0.5rem", 
          textAlign: "center" 
        }}>
          {fieldGroups[formStep].title}
        </h2>
        <p style={{ 
          fontSize: "0.875rem", 
          color: "#6b7280", 
          marginBottom: "1.5rem", 
          textAlign: "center" 
        }}>
          {fieldGroups[formStep].description}
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {fieldGroups[formStep].fields.map((field) => (
            <div key={field}>
              {field === "photo" ? (
                <>
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} />
                  {uploadProgress > 0 && (
                    <div style={{ 
                      width: "100%", 
                      backgroundColor: "#e5e7eb", 
                      borderRadius: "9999px", 
                      height: "0.5rem", 
                      marginTop: "0.5rem" 
                    }}>
                      <div
                        style={{ 
                          backgroundColor: "#3b82f6", 
                          height: "0.5rem", 
                          borderRadius: "9999px", 
                          transition: "all 0.2s", 
                          width: `${uploadProgress}%` 
                        }}
                      ></div>
                    </div>
                  )}
                  {photoPreview && (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      style={{ 
                        width: "5rem", 
                        height: "5rem", 
                        marginTop: "0.75rem", 
                        borderRadius: "50%", 
                        objectFit: "cover" 
                      }}
                    />
                  )}
                </>
              ) : (
                <>
                  <input
                    type={field === "password" ? "password" : "text"}
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={formData[field]}
                    onChange={handleChange}
                    style={{ 
                      width: "100%", 
                      padding: "0.5rem", 
                      border: "1px solid #d1d5db", 
                      borderRadius: "0.375rem" 
                    }}
                  />
                  {errors[field] && (
                    <p style={{ color: "#ef4444", fontSize: "0.875rem", marginTop: "0.25rem" }}>
                      {errors[field]}
                    </p>
                  )}
                </>
              )}
            </div>
          ))}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.5rem" }}>
            {formStep > 0 && (
              <button 
                type="button" 
                onClick={prevStep} 
                style={{ color: "#3b82f6", fontWeight: 600 }}
              >
                Back
              </button>
            )}
            {formStep < fieldGroups.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                style={{ 
                  backgroundColor: "#3b82f6", 
                  color: "white", 
                  paddingLeft: "1rem", 
                  paddingRight: "1rem", 
                  paddingTop: "0.5rem", 
                  paddingBottom: "0.5rem", 
                  borderRadius: "0.375rem" 
                }}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                style={{ 
                  backgroundColor: "#10b981", 
                  color: "white", 
                  paddingLeft: "1rem", 
                  paddingRight: "1rem", 
                  paddingTop: "0.5rem", 
                  paddingBottom: "0.5rem", 
                  borderRadius: "0.375rem" 
                }}
              >
                {isLoading ? "Registering..." : "Submit"}
              </button>
            )}
          </div>
        </form>

        {showSuccessMessage && (
          <div style={{ 
            color: "#059669", 
            textAlign: "center", 
            fontWeight: 500, 
            marginTop: "1rem" 
          }}>
            ✅ Registered Successfully!
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SignUpPage;