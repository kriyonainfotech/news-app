import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Components/header/Header';
import { FaArrowLeft } from 'react-icons/fa';
import Footer from '../Components/footer/Footer';
import Loading from '../Components/Loading';

const API_KEYS = Object.keys(import.meta.env)
    .filter((key) => key.startsWith("VITE_API_KEY_"))
    .map((key) => import.meta.env[key]);


const DiscoverResults = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categories = queryParams.get("categories");
    const country = queryParams.get("country");

    const [news, setNews] = useState([]);
    const [apiKeyIndex, setApiKeyIndex] = useState(0); // Track API key usage
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNews(apiKeyIndex);
    }, [categories, country, apiKeyIndex]);

    const fetchNews = async (index) => {
        if (index >= API_KEYS.length) {
            console.error("All API keys have failed.");
            setLoading(false);
            return;
        }

        try {
            let apiUrl = `https://newsdata.io/api/1/news?apikey=${API_KEYS[index]}&country=${country}&language=en&image=1`;

            if (categories) {
                apiUrl += `&category=${categories}`;
            }

            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.status === "error") {
                console.warn(`API Key ${API_KEYS[index]} failed, trying next...`);
                setApiKeyIndex(index + 1); // Switch to next API key

            } else {
                const filteredNews = data.results.filter(item => item.image_url !== null);
                setNews(filteredNews);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching news:", error);
            setApiKeyIndex(index + 1); // Try next API key on network error
        }
    };

    return (
        <>
            <Header />
            <div className="container" style={{ marginTop: "100px" }}>
                <button className=" border-0 bg-white pb-3 text-black" onClick={() => window.history.back()}>
                    <FaArrowLeft />
                </button>
                <h2>News </h2>
                <div className="row">
                    {loading && <Loading />}

                    {!loading && 
                        news.map((news, index) => (
                            <div key={index} className="col-md-3 p-2">
                                <div className="card h-100">
                                    {/* Image Section */}
                                    <div className="img" style={{ height: "200px" }}>
                                        <img src={news.image_url || news.urlToImage} className="card-img-top w-100 h-100" alt="News" />
                                    </div>

                                    {/* Card Body with Flexbox */}
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title heading">{news.title}</h5>
                                        <p className="card-text text">{news.description}</p>
                                        <p className="card-text">{news.publishedAt}</p>

                                        {/* Redirect to News Detail Page */}
                                        <div className="mt-auto">
                                            <button
                                                className="btn bg-danger text-white w-100"
                                                onClick={() => navigate(`/news/${news.article_id}`)}
                                            >
                                                Read More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DiscoverResults;
