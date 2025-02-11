import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from '../Components/header/Header';
import { FaArrowAltCircleRight, FaArrowLeft, FaPlus } from "react-icons/fa";
import Footer from '../Components/footer/Footer';

const Discover = () => {
    const categories = [
        "top", "business", "crime", "sports", "entertainment", "health", "science",
        "technology", "domestic", "education", "environment", "food", "lifestyle",
        "politics", "tourism", "world", "other"
    ];

    const countries = [
        { code: "in", name: "India" },
        { code: "us", name: "USA" },
        { code: "gb", name: "UK" },
        { code: "ca", name: "Canada" },
        { code: "au", name: "Australia" },
        { code: "de", name: "Germany" },
        { code: "fr", name: "France" },
        { code: "jp", name: "Japan" }
    ];

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("in");
    const navigate = useNavigate(); // Initialize useNavigate

    const toggleCategory = (category) => {
        setSelectedCategories(prevSelected =>
            prevSelected.includes(category)
                ? prevSelected.filter(cat => cat !== category)
                : [...prevSelected, category]
        );
    };

    const selectCountry = (countryCode) => {
        setSelectedCountry(countryCode);
    };

    const handleSearch = () => {
        // Convert categories to comma-separated string
        const categoryQuery = selectedCategories.join(",");
        navigate(`/news?categories=${categoryQuery}&country=${selectedCountry}`);
    };

    return (
        <>
            <div>
                <Header />
                <div style={{ marginTop: "100px", marginBottom: "100px" }}>
                    <div className='d-flex justify-content-between align-items-center px-2 pb-3'>
                        <button className=" border-0 bg-white text-black" onClick={() => window.history.back()}>
                            <FaArrowLeft />
                        </button>
                        <button className='btn bg-red text-white' onClick={handleSearch}>Search</button>
                    </div>
                    <div className='category'>
                        <h5 className='px-2'>Categories</h5>
                        <div className="d-flex flex-wrap mt-4">
                            {categories.map((category, index) => (
                                <button
                                    key={index}
                                    className={`btn m-2 ${selectedCategories.includes(category) ? "btn-danger" : "btn-outline-danger"}`}
                                    onClick={() => toggleCategory(category)}
                                    style={{ position: "relative", paddingRight: "30px" }}
                                >
                                    {category}
                                    {selectedCategories.includes(category) && (
                                        <FaPlus style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }} />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className='py-3'>
                        <h5 className='px-2'>Country</h5>
                        <div className="d-flex flex-wrap">
                            {countries.map((country, index) => (
                                <button
                                    key={index}
                                    className={`btn m-2 ${selectedCountry === country.code ? "bg-red text-white" : "btn-outline-danger"}`}
                                    onClick={() => selectCountry(country.code)}
                                >
                                    {country.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    );
};

export default Discover;
