import React from "react";
import { useNavigate } from "react-router-dom";

const BreackingNews = ({ allNews }) => {
    const navigate = useNavigate();

    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="d-flex align-items-center justify-content-between py-4">
                            <h1 className="ps-3 fs-3">Breaking News</h1>
                        </div>

                        <div className="col-12 d-flex flex-wrap">
                            {allNews.map((news, index) => {
                                return (
                                    <div key={index} className="col-md-3 p-2">
                                        <div className="card h-100">
                                            {/* Image Section */}
                                            <div className="img" style={{ height: "200px" }}>
                                                <img src={news.image_url || news.urlToImage} className="card-img-top w-100 h-100" alt="News" />
                                            </div>

                                            {/* Card Body with Flexbox */}
                                            <div className="card-body d-flex flex-column">
                                                <span className="d-flex justify-content-end py-1">{news.pubDate}</span>
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
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BreackingNews;
