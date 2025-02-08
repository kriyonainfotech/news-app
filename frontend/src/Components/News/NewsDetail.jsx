import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../header/Header";
const API_KEY = import.meta.env.VITE_EXPO_PUBLIC_API_KEY;

const NewsDetail = () => {
    const { id } = useParams();  // Get news ID from URL
    const [newsData, setNewsData] = useState(null);

    useEffect(() => {
        // Fetch particular news based on ID (mock API response)


        fetchNewsDetails();
    }, [id]);

    const fetchNewsDetails = async () => {
        try {
            const response = await fetch(`https://newsdata.io/api/1/news?apikey=${API_KEY}&id=${id}`);
            const data = await response.json();

            setNewsData(data.results);
            console.log(data.results);
        } catch (error) {
            console.error("Error fetching news details:", error);
        }
    };
    if (!newsData) return <h2>Loading...</h2>;

    return (
        <>
            <div>
                <Header />
                <div className="py-5">
                    <div className="container mt-5">
                        <div className="row">
                            <div className="co-12 mx-auto d-flex justify-content-center">
                                <div className="col-md-8 ">
                                    <div className="detaile ">
                                        <h2>{newsData[0].title}</h2>
                                        <div className="img py-2">
                                            <img src={newsData[0].image_url} alt="News" className="img-fluid" />
                                        </div>
                                       
                                        <p>{newsData[0].description}</p>
                                        <Link to={newsData[0].url} className="btn btn-danger" target="_blank" rel="noopener noreferrer">Read Full Article</Link>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    );
};

export default NewsDetail;
