import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
const backend_API = import.meta.env.VITE_API_URL;

const Logout = () => {
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
        <>
            {/* <button className="btn  w-100" onClick={() => handleLogout()}>Logout</button> */}
            <button
                className=" border-0 bg-red text-white p-2 rounded-2"
                style={{ borderRadius: '10px' }}
                onClick={() => handleLogout()}
            >
                <FaSignOutAlt className="" /> Logout
            </button>
        </>
    )
}

export default Logout
