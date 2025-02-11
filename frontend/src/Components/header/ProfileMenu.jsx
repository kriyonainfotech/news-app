import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const backend_API = import.meta.env.VITE_API_URL;
const ProfileMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate()
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  

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
      <div
        className="profile"
        style={{ width: "50px", height: "50px", cursor: "pointer" }}
        onClick={toggleMenu}
      >
        <img
          src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
          className="img-fluid w-100 h-100 rounded-5"
          alt="Profile"
        />
      </div>

      {/* Logout Menu */}
      {showMenu && (
        <div
          className="position-absolute bg-white shadow p-2 rounded"
          style={{
            top: "60px",
            right: "0px",
            minWidth: "120px",
            zIndex: 1000,
          }}
        >
          <button className="btn  w-100" onClick={() => handleLogout()}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
