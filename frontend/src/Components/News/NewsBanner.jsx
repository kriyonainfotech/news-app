import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const backend_API = import.meta.env.VITE_API_URL;

const NewsBanner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const GetBanners = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backend_API}/banner/getAllBanners`, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        setBanners(response.data.banners);
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error fetching banners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetBanners();
  }, []);

  // Slider settings (Show 3 slides at a time)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 slides at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024, // For medium screens (tablets)
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // For small screens (mobile)
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container my-5">
      {loading ? (
        <p className="text-center">Loading banners...</p>
      ) : (
        <Slider {...settings} className="banner-slider">
          {banners.map((banner, index) => (
            <div key={index} className="banner-slide p-2">
              <img src={banner.imageUrl} className="w-100 rounded" style={{width:"100px",height:"100px"}} alt="Banner" />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default NewsBanner;
