import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Components/header/Header';
import { FaArrowLeft } from 'react-icons/fa';

const API_KEY = import.meta.env.VITE_EXPO_PUBLIC_API_KEY;

const DiscoverResults = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categories = queryParams.get("categories");
    const country = queryParams.get("country");

    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                let apiUrl = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=${country}&language=en`;

                if (categories) {
                    apiUrl += `&category=${categories}`;
                }

                const response = await fetch(apiUrl);
                const data = await response.json();

                if (data.results) {
                    const filteredNews = data.results.filter(item => item.image_url !== null);
                    setNews(filteredNews);
                }
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };

        fetchNews();
    }, [categories, country]);

    return (
        <>
            <Header />
            <div className="container" style={{ marginTop: "100px" }}>
                <button className=" border-0 bg-white pb-3 text-black" onClick={() => window.history.back()}>
                    <FaArrowLeft />
                </button>
                <h2>News </h2>
                <div className="row">
                    {news.map((item, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="card">
                                <img src={item.image_url} className="card-img-top" alt={item.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <a href={item.link} className="btn btn-danger" target="_blank" rel="noopener noreferrer">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default DiscoverResults;
