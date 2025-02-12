import React, { useEffect, useState } from 'react';
import Header from '../Components/header/Header';
import BreackingNews from '../Components/News/BreackingNews';
import NewsCategory from '../Components/News/NewsCategory';
import Loading from '../Components/Loading';
import Footer from '../Components/footer/Footer';
import NewsBanner from '../Components/News/NewsBanner';

// Dynamically fetch API keys from .env
const API_KEYS = Object.keys(import.meta.env)
    .filter((key) => key.startsWith("VITE_API_KEY_"))
    .map((key) => import.meta.env[key]);

let currentKeyIndex = 0;
let requestCounts = Array(API_KEYS.length).fill(0); // Track requests per key
const MAX_REQUESTS = 200; // Max 200 requests per key

const Home = () => {
    const [allNews, setAllNews] = useState([]);
    const [category, setCategory] = useState("top");
    const [searchQuery, setSearchQuery] = useState("");
    const [language, setLanguage] = useState("en");
    const [latest, setLatest] = useState("news");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const FetchNews = async () => {
        setLoading(true);
        setError("");

        let keyIndex = currentKeyIndex;

        let apiUrl = `https://newsdata.io/api/1/${latest}?apikey=${API_KEYS[keyIndex]}&country=in&size=10&removeduplicate=1&image=1`;
        if (category) apiUrl += `&category=${category}`;
        if (language) apiUrl += `&language=${language}`;
        if (searchQuery.trim() !== "") apiUrl += `&q=${searchQuery}`;

        while (keyIndex < API_KEYS.length) {
            try {
                // Check if the key has exceeded 200 requests
                if (requestCounts[keyIndex] >= MAX_REQUESTS) {
                    console.warn(`API Key ${API_KEYS[keyIndex]} reached ${MAX_REQUESTS} requests. Switching key...`);
                    keyIndex++;

                    if (keyIndex < API_KEYS.length) {
                        apiUrl = apiUrl.replace(API_KEYS[keyIndex - 1], API_KEYS[keyIndex]);
                        continue;
                    } else {
                        throw new Error("All API keys have reached their daily limit.");
                    }
                }

                // console.log(`Using API Key: ${API_KEYS[keyIndex]} (Request Count: ${requestCounts[keyIndex] + 1})`);

                const response = await fetch(apiUrl);
                const data = await response.json();
                console.log(data,"news data");
                
                if (data.status === "error") {
                    if (data.results?.message === "You exceeded your assigned API credits, please check your plan and billing details.") {
                        console.warn(`API Key ${API_KEYS[keyIndex]} exhausted. Switching to next key...`);
                        keyIndex++;

                        if (keyIndex < API_KEYS.length) {
                            apiUrl = apiUrl.replace(API_KEYS[keyIndex - 1], API_KEYS[keyIndex]);
                            continue;
                        } else {
                            throw new Error("All API keys have reached their daily limit.");
                        }
                    } else {
                        throw new Error(data.message);
                    }
                }

                if (!data.results || data.results.length === 0) {
                    throw new Error("No news found for this category or search query.");
                }

                // Increment request count for this key
                requestCounts[keyIndex]++;
                // console.log(`Request Count for ${API_KEYS[keyIndex]}: ${requestCounts[keyIndex]}`);

                setAllNews(data.results);
                console.log(data.results,"news");
                currentKeyIndex = keyIndex; // Save the working key index
                break;
            } catch (error) {
                console.error("API Error:", error);
                setError(error.message);
                break;
            }
        }

        setLoading(false);
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            FetchNews();
        }, 2000);

        return () => clearTimeout(delayDebounce);
    }, [searchQuery, category, language, latest]);

    return (
        <>
            <div>
                <Header setLanguage={setLanguage} />
                <div style={{ marginTop: "100px", marginBottom: "100px" }}>
                    <NewsBanner/>
                    <NewsCategory setCategory={setCategory} setLatest={setLatest} />

                    {/* Show Loading While Fetching */}
                    {loading && <Loading />}

                    {/* Show Error Message if API Fails */}
                    {error && (
                        <div className="alert alert-danger text-center my-3">
                            <strong>Error:</strong> {error}
                        </div>
                    )}

                    {/* Show News Only If No Error & No Loading */}
                    {!loading && !error && <BreackingNews allNews={allNews} />}
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Home;
