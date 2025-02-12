import React from "react";
import { useNavigate } from "react-router-dom";

const BreakingNews = ({ allNews }) => {
    const navigate = useNavigate();

    return (
        <section className="py-5 bg-light">
            <div className="container">
                {/* Section Heading */}
                <div className="d-flex align-items-center justify-content-between pb-3">
                    <h2 className="ps-3 fs-3 fw-bold text-danger">Breaking News</h2>
                </div>

                {/* News Cards */}
                <div className="row">
                    {allNews.map((news, index) => (
                        <div key={index} className="col-lg-3 col-md-6 col-sm-12 mb-4 ">
                            <div className="card border-0 shadow-lg h-100 overflow-hidden">
                                {/* Image Section */}
                                <div className="position-relative">
                                    <img 
                                        src={news.image_url || news.urlToImage} 
                                        className="card-img-top" 
                                        alt="News" 
                                        style={{ height: "220px", objectFit: "cover" }} 
                                    />
                                   
                                </div>

                                {/* Card Body */}
                                <div className="card-body d-flex flex-column">
                                    <span className="text-muted small">{news.pubDate || news.publishedAt}</span>
                                    <h6 className="card-title mt-2 fw-bold text-dark">
                                        {news.title.length > 20 ? news.title.slice(0, 20) + "..." : news.title}
                                    </h6>
                                    <p className="card-text text-muted">
                                        {news?.description?.length > 50 ? news?.description.slice(0, 50) + "..." : news?.description}
                                    </p>

                                    {/* Read More Button */}
                                    <div className="mt-auto">
                                        <button 
                                            className="btn btn-danger w-100 fw-bold" 
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
    );
};

export default BreakingNews;
    