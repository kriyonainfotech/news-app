import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const backend_API = import.meta.env.VITE_API_URL;

const EditBanner = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [bannerId, setBannerId] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state, "edit banner");
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      alert("Please provide a banner title.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("bannerId", bannerId); // Ensure bannerId is sent
    if (image) {
      formData.append("banner", image); // 'banner' should match the multer field name
    }

    try {
      const response = await axios.post(`${backend_API}/banner/updateBanner`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

        if (response.status === 200) {
              alert("Banner added successfully!");
              toast(response.data.message)
              setTitle("");
              setImage(null);
              navigate("/admin/banner")
            }
          } catch (error) {
            console.error(error)
            console.log(error.response.data.message);
            toast(error.response.data.message)
          }
  };

  useEffect(() => {
    if (location.state) {
      setBannerId(location.state._id);
      setTitle(location.state.title);
      setPreviewImage(location.state.imageUrl);
    }
  }, [location.state]);

  return (
    <>
      <Header />
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg border-0 rounded">
              <div className="card-header bg-light text-center">
                <h4 className="mb-0">Edit Banner</h4>
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
                    />
                  </div>

                  <button type="submit" className="btn bg-red text-white w-100">
                    Update Banner
                  </button>
                </form>
              </div>
            </div>
            {previewImage && (
              <div className="mt-4 text-center">
                <h5 className="fw-bold">Image Preview</h5>
                <img
                  src={previewImage}
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

export default EditBanner;
