import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const API_KEYS = Object.keys(import.meta.env)
    .filter((key) => key.startsWith("VITE_API_KEY_"))
    .map((key) => import.meta.env[key]);


const Newsleter = () => {
    const [allNews, setAllNews] = useState([])
    const [search, setSearch] = useState("india")
    const [loading, setLoading] = useState(false)
    const navigate  = useNavigate()

 const [apiKeyIndex, setApiKeyIndex] = useState(0); // Track API key usage
     useEffect(() => {
          fetchNews(apiKeyIndex);
      }, [apiKeyIndex]);
      const fetchNews = async (index) => {
        if (index >= API_KEYS.length) {
            console.error("All API keys have failed.");
            setLoading(false);
            return;
        }

        try {
            let apiUrl = `https://newsdata.io/api/1/latest?apikey=${API_KEYS[index]}&country=in&language=en&&category=sports&image=1`;
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.status === "error") {
                console.warn(`API Key ${API_KEYS[index]} failed, trying next...`);
                setApiKeyIndex(index + 1); // Switch to next API key

            } else {
                const filteredNews = data.results.filter(item => item.image_url !== null);
                setAllNews(filteredNews);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching news:", error);
            setApiKeyIndex(index + 1); // Try next API key on network error
        }
    };

    return (
        <>

<section className="py-5 bg-light">
            <div className="container">
                {/* Section Heading */}
                <div className="d-flex align-items-center justify-content-between pb-3">
                    <h2 className="ps-3 fs-3 fw-bold text-danger">Sports</h2>
                </div>

                {/* News Cards */}
                <div className="row">
                    {allNews.map((news, index) => (
                        <div key={index} className="col-lg-6 col-md-6 col-sm-12 mb-4">
                            <div className="card bg-light border-0 shadow-sm h-100 overflow-hidden d-flex flex-row">
                                {/* Image Section */}
                                <div className="position-relative flex-shrink-0" style={{ width: "40%", minHeight: "150px" }}>
                                    <img 
                                        src={news.image_url || news.urlToImage} 
                                        className="card-img-top h-100 w-100"
                                        alt="News" 
                                        style={{ objectFit: "cover", borderRadius: "5px 0 0 5px" }} 
                                    />
                                  
                                </div>

                                {/* Card Body */}
                                <div className="card-body d-flex flex-column">
                                    <span className="text-muted small">{news.pubDate || news.publishedAt}</span>
                                    <h6 className="card-title mt-2 fw-bold text-dark">
                                        {news.title.length > 30 ? news.title.slice(0, 30) + "..." : news.title}
                                    </h6>
                                    <p className="card-text text-muted d-none d-md-block">
                                        {news?.description?.length > 100 ? news?.description.slice(0, 100) + "..." : news.description}
                                    </p>

                                    {/* Read More Button */}
                                    <div className="mt-auto">
                                        <button 
                                            className="btn btn-sm btn-danger w-100 fw-bold" 
                                            onClick={() => navigate(`/news/${news.article_id}`)}
                                        >
                                            Read More →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        </>
    )
}

export default Newsleter
