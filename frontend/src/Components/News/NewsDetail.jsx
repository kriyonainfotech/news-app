import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../header/Header";
import { FaArrowLeft } from "react-icons/fa";
import Footer from "../footer/Footer";
import Loading from "../Loading";

const API_KEYS = [
  import.meta.env.VITE_API_KEY_1,
  import.meta.env.VITE_API_KEY_2,
  import.meta.env.VITE_API_KEY_3,
];

const NewsDetail = () => {
  const { id } = useParams();  
  const [newsData, setNewsData] = useState(null);
  const [apiKeyIndex, setApiKeyIndex] = useState(0);  // Track which API key to use

  useEffect(() => {
    fetchNewsDetails(apiKeyIndex);
  }, [id, apiKeyIndex]);

  const fetchNewsDetails = async (index) => {
    if (index >= API_KEYS.length) {
      console.error("All API keys have failed.");
      return;
    }

    try {
      const response = await fetch(`https://newsdata.io/api/1/news?apikey=${API_KEYS[index]}&id=${id}`);
      const data = await response.json();

      if (data.status === "error") {
        console.warn(`API Key ${API_KEYS[index]} failed, trying next...`);
        setApiKeyIndex(index + 1);  // Try next API key
      } else {
        setNewsData(data.results);
      }
    } catch (error) {
      console.error("Error fetching news details:", error);
      setApiKeyIndex(index + 1);  // Try next API key on network error
    }
  };

  if (!newsData) return <Loading/>;

  return (
    <>
      <Header />
      <div className="py-5">
        <div className="container mt-5">
          <div className="row">
            <button 
              className="d-flex justify-content-start border-0 bg-white pb-3 text-black" 
              onClick={() => window.history.back()}
            >
              <FaArrowLeft />
            </button>
            <div className="co-12 mx-auto d-flex justify-content-center">
              <div className="col-md-8">
                <div className="detail">
                  <h2>{newsData[0]?.title}</h2>
                  <div className="img py-2">
                    <img src={newsData[0]?.image_url} alt="News" className="img-fluid" />
                  </div>
                  <p>{newsData[0]?.description}</p>
                  <Link 
                    to={newsData[0]?.url} 
                    className="btn btn-danger" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Read Full Article
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default NewsDetail;
