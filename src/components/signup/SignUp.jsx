import React, { useState } from "react";
import "./SignUp.css";
import { Icons } from "../CloudImages/CloudImages";
import { Image, Transformation } from "cloudinary-react";
import { signupUser } from "../../services/authService";

function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); 
    if (name === "password") {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (password.length < minLength) {
      setPasswordError("Password must be at least 8 characters long");
    } else if (!hasUpperCase) {
      setPasswordError("Password must contain at least one uppercase letter");
    } else if (!hasSpecialChar) {
      setPasswordError("Password must contain at least one special character");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordError) {
      alert("Please fix the password requirements.");
      return;
    }
    setIsSubmitting(true);
    setApiError("");
    try {
      // Use the signupUser function from authService.jsx
      const data = await signupUser(formData); 
      setSuccessMessage(data.message, data.fullName); 
      setFormData({ fullName: "", email: "", password: "" }); // Reset 
      
      // Clear success message after timeout
      setTimeout(() => {
        setSuccessMessage(""); 
      }, 5000);
    } catch (error) {
      console.error("Signup Error:", error);
      setApiError(error.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = () => {
    console.log("Sign up with Google");
  };

  const handleAppleSignup = () => {
    console.log("Sign up with Apple");
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Create Account</h2>
        {successMessage && <p className="success-text">{successMessage}</p>} {/* Display success message */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="fullName">Enter Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="input"
            required
          />
          <div className="email">
            <label htmlFor="email">Enter Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <label htmlFor="password">Choose Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="input"
            required
          />
          {passwordError && <p className="error-text">{passwordError || "Unknown error"}</p>}
          {apiError && <p className="error-text">{apiError || "Unknown error"}</p>}
          <button
            type="submit"
            className="signup-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </button>
        </form>
        <div className="google-icon">
          <button onClick={handleGoogleSignup} className="google-button">
            <Image cloudName="degnky4ab" publicId={Icons.google}>
              <Transformation crop="scale" angle="0" className="google-icon4" />
            </Image>
            Sign Up with Google{" "}
          </button>
        </div>
        <div className="google-icon">
          <button onClick={handleAppleSignup} className="apple-button">
            <Image cloudName="degnky4ab" publicId={Icons.apple}>
              <Transformation crop="scale" angle="0" className="google-icon4" />
            </Image>
            Sign Up with Apple{" "}
          </button>
        </div>
        <p className="login-text">
          Already Have An Account? <a href="/signin">Login</a>
        </p>
      </div>
      <div className="image-container">
        <img
          src="https://www.deere.co.in/assets/images/region-1/products/tractors/john-deere-e-series-cab.jpg"
          alt="Tractor"
          className="image"
        />
      </div>
    </div>
  );
}

export default SignUp;
