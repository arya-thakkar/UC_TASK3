import React, { useState } from "react";
import "/src/styles/task2.css";
import img1 from "/src/assets/image2.png";
import { useNavigate } from "react-router-dom";

function SignupForm({ setIsAuthenticated }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    gender: "",
    dob: "",
    bio: ""
  });
  
  const [showconditions, setShowconditions] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  async function tosignIn(e) {
    e.preventDefault();
    if (!formData.name) { alert("Name is required"); return; }
    if (formData.name.length < 3) { alert("Name must be at least 3 characters"); return; }
    if (formData.name.length > 15) { alert("Name must be less than 15 characters"); return; }

    if (!formData.email) { alert("Email is required"); return; }
    if (!regex.test(formData.email)) { alert("Email format is invalid"); return; }

    if (!formData.password) { alert("Password is required"); return; }
    if (formData.password.length < 4) { alert("Password must be at least 4 characters"); return; }
    if (formData.password.length > 20) { alert("Password must be less than 20 characters"); return; }
    if (!/[A-Z]/.test(formData.password)) { alert("Password must contain at least one capital letter"); return; }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) { alert("Password must contain at least one special character"); return; }
    if (!/[0-9]/.test(formData.password)) { alert("Password must contain at least one number"); return; }

    if (!formData.confirmPassword) { alert("Confirm Password is required"); return; }
    if (formData.password !== formData.confirmPassword) { alert("Passwords do not match"); return; }

    if (!formData.city) { alert("City is required"); return; }
    if (!formData.gender) { alert("Gender is required"); return; }
    if (!formData.dob) { alert("Date of Birth is required"); return; }
    if (!formData.bio) { alert("Bio is required"); return; }
    setLoading(true);
    try {
      const response = await fetch('https://task4-authdb.onrender.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          city: formData.city,
          gender: formData.gender,
          dob: formData.dob,
          bio: formData.bio
        })
      });

      const result = await response.json();

      if (response.ok) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        alert(result.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function displayconditions() {
    return (
      <div className="passwordConditions">
        <p>Password must contain:</p>
        <ul>
          <li>At least 4 characters</li>
          <li>At least 1 uppercase letter</li>
          <li>At least 1 number</li>
          <li>At least 1 special character</li>
          <li>Maximum 20 characters</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="signup-container">
      <div className="image-section">
        <img src={img1} alt="signinImg" className="sign-image" />
      </div>
      <form className="signup-form" onSubmit={tosignIn}>
        <div className="form-struct">
          <input
            type="text"
            placeholder="Full Name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            onFocus={() => setShowconditions(true)}
            onBlur={() => setShowconditions(false)}
            required
          />
          {showconditions && displayconditions()}
          <input
            type="password"
            placeholder="Confirm Password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="City"
            id="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <select
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            style={{marginRight:"230px",height:"35px"}}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
          <input
            type="date"
            id="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
          <textarea
            placeholder="Bio (Tell us about yourself)"
            id="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="3"
            maxLength="200"
            required
            style={{height:"60px",fontSize:"14px",padding:"8px"}}
          />
          <button type="submit" id="signInbtn" disabled={loading}>
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </div>
        <div className="login-section">
            <a href="/login" className="login-link">
          <p style={{color:"#fff"}}>
            Already have an account?{" "}
          </p>
              Log in
            </a>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;