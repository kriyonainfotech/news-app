import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from "../Header";
const backend_API = import.meta.env.VITE_API_URL;
const EditUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone : "",
  });
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location.state,"location");
  

  const [errors, setErrors] = useState({});
  const [loading, setLoding] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form validation
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Enter a valid email";
    if (formData.phone.length < 10) newErrors.phone = "Phone must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoding(true);
    console.log(formData, "data");

    try {
      const response = await axios.put(`${backend_API}/auth/updateUser` ,
        {
          id: location?.state?._id, // Passing the user ID in request body
          ...formData, // Merging form data
        }, {
        headers: {
          'Content-Type': 'application/json',
        }   
      })
      if (response.status === 200) {
        console.log(response.data)
        console.log(response.data.message)
        alert(response.data.message)
        // localStorage.setItem("token",JSON.stringify(response.data.token))
        navigate('/admin/users')
      }
    } catch (error) {
      console.error(error)
      console.log(error.response.data.message);
      alert(error.response.data.message)
    } finally {
      setLoding(false)
    }
  }

  useEffect(() => {
    setFormData(
        {
            name: location?.state?.name ,
            email: location?.state?.email ,
            phone: location?.state?.phone ,
        }
    )

  },[location.state])
  return (
   <>
   <div>
    <Header/>
    <div className="container" style={{marginTop:"100px",marginBottom:"100px"}}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">EditUser </h2>
            {submitted && <div className="alert alert-success">Registration successful!</div>}
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

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
              {/* phone */}
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn bg-red text-white w-100">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
   </div>
   </>
  );
};

export default EditUser;
