import React, { useContext } from 'react';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../contex/AuthContext';
import Header from '../Components/header/Header';
import Footer from '../Components/footer/Footer';

const Profile = () => {
    const { user } = useContext(AuthContext);
    return (
       <>
       <div>
        <Header/>
        <div className="container" style={{marginTop:"100px",marginBottom:"100px"}}>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="shadow-lg p-4 w-100 d-flex flex-wrap" style={{ borderRadius: '15px', backgroundColor: '#f8f9fa' }}>
                        <div className="col-12 col-md-12 ">
                            <div className='text-center'>
                                <FaUserCircle size={90} className="text-red mb-3" />
                                <h2 className="fw-bold">{user?.name}</h2>
                                <p className="text-muted">{user?.email}</p>
                                <p className="text-muted">+91{user?.phone}</p>
                            </div>
                        </div>
                        
                        <div className='col-12 col-md-12'>
                            <div className='d-flex justify-content-end'>
                                <button
                                    className=" border-0 bg-red text-white p-2 rounded-2"
                                    style={{ borderRadius: '10px' }}
                                // onClick={onLogout}
                                >
                                    <FaSignOutAlt className="" /> Logout
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
        <Footer/>
       </div>
       </>
    );
};

export default Profile;
