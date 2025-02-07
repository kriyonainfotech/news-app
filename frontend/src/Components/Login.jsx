import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form validation
  const validateForm = () => {
    let newErrors = {};
    if (!formData.email.includes("@")) newErrors.email = "Enter a valid email";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Login Successful:", formData);
      alert("Login Successful!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? <FaEye/> : <FaEyeSlash/>}
                  </button>
                </div>
                {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn bg-red text-white w-100">
                Login
              </button>
              <p className="py-3" >Don't have an Account ? <Link to={'/signUp'} className="text-red">Sign Up</Link> </p>
           
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
