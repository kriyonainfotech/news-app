import React, { useState } from "react";
import Header from "../header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backend_API = import.meta.env.VITE_API_URL;

const AddBanner = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !image) {
      alert("Please provide a title and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("banner", image); // 'banner' should match the multer field name

    try {
      const response = await axios.post(`${backend_API}/banner/addBanner`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        alert("Banner added successfully!");
        setTitle("");
        setImage(null);
        navigate("/admin/banner")
      } else {
        alert("Failed to add banner. Please try again.");
      }
    } catch (error) {
      console.error("Error adding banner:", error);
      alert("An error occurred while adding the banner.");
    }
  };

  return (
    <>
      <Header />
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg border-0 rounded">
              <div className="card-header bg-light text-center">
                <h4 className="mb-0">Add New Banner</h4>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label fw-bold">
                      Banner Title
                    </label>
                    <input
                      type="text"
                      className="form-control p-2"
                      id="title"
                      placeholder="Enter banner title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="image" className="form-label fw-bold">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      required
                    />
                  </div>

                  <button type="submit" className="btn bg-red text-white w-100">
                    Submit Banner
                  </button>
                </form>
              </div>
            </div>
            {image && (
              <div className="mt-4 text-center">
                <h5 className="fw-bold">Image Preview</h5>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Banner Preview"
                  className="img-fluid rounded shadow"
                  style={{ maxWidth: "100%", height: "200px", objectFit: "cover" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBanner;
