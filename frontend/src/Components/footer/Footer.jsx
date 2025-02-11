import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const categories = [
    "top", "business", "crime", "sports", "entertainment", "health", "science",
    "technology", "domestic", "education", "environment", "food", "lifestyle",
    "politics", "tourism", "world", "other"
  ];

  const midIndex = Math.ceil(categories.length / 2); // Find the middle index
  const firstHalf = categories.slice(0, midIndex); // First half of categories
  const secondHalf = categories.slice(midIndex); // Second half of categories


  return (
    <footer className="bg-light  py-4">
      <div className="container">
        <div className="row">
          {/* Website Name & Description */}
          <div className="col-md-4">
            <h4 className="fw-bold text-red py-2">Gujarat News</h4>
            <p>Stay updated with the latest news from Gujarat and around the world.</p>
          </div>

          {/* Categories */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold d-md-block d-none">Categories</h5>
            <div className="row d-none d-md-flex">
              <div className="col-6">
                <ul className="list-unstyled footer-cat">
                  {firstHalf.map((category) => (
                    <li key={category} className="py-2">
                      <a href="#" className=" text-decoration-none">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-6">
                <ul className="list-unstyled footer-cat">
                  {secondHalf.map((category) => (
                    <li key={category} className="py-2">
                      <a href="#" className="text-decoration-none">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mobile View (Dropdown) */}
            <div className="d-md-none">
              <button className="fs-5 p-0 bg-transparent text-light border-0 d-flex justify-content-start w-100" type="button" data-bs-toggle="collapse" data-bs-target="#categoryDropdown">
                Categories ▼
              </button>
              <div className="collapse mt-2" id="categoryDropdown">
                <ul className="list-unstyled footer-cat">
                  {categories.map((category) => (
                    <li key={category}>
                      <a href="#" className="text-white text-decoration-none d-block py-1">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Contact Us</h5>
            <p><i className="fas fa-phone-alt me-2"></i> +91 98765 43210</p>
            <p><i className="fas fa-envelope me-2"></i> contact@gujaratnews.com</p>
            <p><i className="fas fa-map-marker-alt me-2"></i> Ahmedabad, Gujarat, India</p>
            <Link to={"/privecyPolicy"}>Privacy Policy</Link>
              {/* Social Media Links */}
        <div className="my-3">
          <a href="#" className="text-red fs-5 me-3"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="text-red fs-5 me-3"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-red fs-5 me-3"><i className="fab fa-instagram"></i></a>
          <a href="#" className="text-red fs-5 me-3"><i className="fab fa-linkedin"></i></a>
        </div>
          </div>
        </div>

      

        {/* Copyright */}
        <div className="text-center my-3">
          <p className="mb-0">&copy; 2025 Gujarat News. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
