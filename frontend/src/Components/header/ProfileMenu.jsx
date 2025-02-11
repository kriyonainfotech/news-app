import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
const backend_API = import.meta.env.VITE_API_URL;
const ProfileMenu = () => {
  const navigate = useNavigate()

  

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${backend_API}/auth/logout`, {
        withCredentials: true // Ensure cookies are sent with the request
      });

      if (response.status === 200) {
        // toast(response.data.message || "Logout Successful...");
        console.log(response.data.message);
        alert(response.data.message)
        navigate('/signin');
      }
    } catch (error) {
      console.error("Error during logout:", error);
      //   toast.error(error?.response?.data?.message ||"Logout failed. Please try again.");
    }
  };
  return (
    <div className="d-flex position-relative">
      {/* Profile Image */}
      <Link to={"/profile"}
        className="profile"
        style={{ width: "50px", height: "50px", cursor: "pointer" }}
      >
        <img
          src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
          className="img-fluid w-100 h-100 rounded-5"
          alt="Profile"
        />
      </Link >

   
    </div>
  );
};

export default ProfileMenu;
