import React, { useContext } from 'react';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../contex/AuthContext';
import Header from '../Components/header/Header';
import Footer from '../Components/footer/Footer';
import Logout from '../Components/Logout';
import { Link } from 'react-router-dom';

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
                                <h2 className="fw-bold">{user?.name}  {
                                    user.role == "admin" ? ( 
                                    <Link to={"/admin"} className='fs-6 text-red'><strong>Admin</strong></Link>
                                ) : (
                                    <></>
                                 )
                                }</h2>
                                <p className="text-muted">{user?.email}</p>
                                <p className="text-muted">+91{user?.phone}</p>
                               
                               
                            </div>
                        </div>
                        
                        <div className='col-12 col-md-12'>
                            <div className='d-flex justify-content-end'>
                               <Logout/>
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
