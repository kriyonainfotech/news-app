import React, { useEffect, useState } from 'react';
import Header from '../Components/header/Header';
import Cards from '../Components/News/Cards';
import SearchBox from '../Components/News/SearchBox';
import BreackingNews from '../Components/News/BreackingNews';
import NewsCategory from '../Components/News/NewsCategory';
import Loading from '../Components/Loading';
import NewsLenguage from '../Components/News/NewsLenguage';
import Footer from '../Components/footer/Footer';

// const API_KEY = import.meta.env.VITE_EXPO_PUBLIC_API_KEY;
const API_KEYS = [
    import.meta.env.VITE_API_KEY_1,
    import.meta.env.VITE_API_KEY_2
];

let currentKeyIndex = 0;

const Home = () => {
    const [allNews, setAllNews] = useState([]);
    const [category, setCategory] = useState("top"); // Default category
    const [searchQuery, setSearchQuery] = useState("");  // Search query state
    const [language, setLanguage] = useState("en");  // Default: English
    const [latest, setLatest] = useState("news");  // Default: English

    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(""); // Error state

    const FetchNews = async () => {
        setLoading(true);
        setError("");
    
        let keyIndex = currentKeyIndex; // Start with the current key
        let apiUrl = `https://newsdata.io/api/1/${latest}?apikey=${API_KEYS[keyIndex]}&country=in&size=10&removeduplicate=1&image=1`;
    
        if (category) apiUrl += `&category=${category}`;
        if (language) apiUrl += `&language=${language}`;
        if (searchQuery.trim() !== "") apiUrl += `&q=${searchQuery}`;
    
        while (keyIndex < API_KEYS.length) {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                console.log(data, "data home page");
    
                if (data.status === "error") {
                    if (data.results.message = "You exceeded your assigned API credits, please check your plan and billing details.") {
                        console.log(`API Key ${API_KEYS[keyIndex]} exhausted. Switching to next key...`);
                        keyIndex++;
    
                        if (keyIndex < API_KEYS.length) {
                            apiUrl = apiUrl.replace(API_KEYS[keyIndex - 1], API_KEYS[keyIndex]);
                            continue; // Retry with new key
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
    
                setAllNews(data.results);
                currentKeyIndex = keyIndex; // Save the working key index
                break; // Success, exit loop
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
    }, [searchQuery, category, language, latest]); // Fetch news when language changes

    return (
        <>
            <div>
                <Header setLanguage={setLanguage} />
                <div style={{ marginTop: "100px", marginBottom: "100px" }}>
                    <div className="container">
                        <div className="row">
                            <div className='d-flex flex-wrap d-none d-md-flex justify-content'>
                                {/* <SearchBox setSearchQuery={setSearchQuery} /> */}
                                {/* <NewsLenguage setLanguage={setLanguage} /> */}
                            </div>
                        </div>
                    </div>
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
                    {/* <Cards/> */}
                </div>
                <Footer/>
            </div>
        </>
    );
};

export default Home;
