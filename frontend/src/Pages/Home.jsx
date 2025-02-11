import React, { useEffect, useState } from 'react';
import Header from '../Components/header/Header';
import Cards from '../Components/News/Cards';
import SearchBox from '../Components/News/SearchBox';
import BreackingNews from '../Components/News/BreackingNews';
import NewsCategory from '../Components/News/NewsCategory';
import Loading from '../Components/Loading';
import NewsLenguage from '../Components/News/NewsLenguage';

const API_KEY = import.meta.env.VITE_EXPO_PUBLIC_API_KEY;

const Home = () => {
   const [allNews, setAllNews] = useState([]);
   const [category, setCategory] = useState("top"); // Default category
   const [searchQuery, setSearchQuery] = useState("");  // Search query state
   const [language, setLanguage] = useState(localStorage.getItem("selectedLanguage") || "en");  

   useEffect(() => {
       localStorage.setItem("selectedLanguage", language);  // Save language when changed
   }, [language]);
   
   const [loading, setLoading] = useState(true); // Loading state
   const [error, setError] = useState(""); // Error state

   const FetchNews = async () => {
    setLoading(true);
    setError(""); 
    try {
        let apiUrl = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=in&size=10&removeduplicate=1`;

        if (category) {
            apiUrl += `&category=${category}`;
        }

        if (language) {
            apiUrl += `&language=${language}`;
        }

        if (searchQuery.trim() !== "") {
            apiUrl += `&q=${searchQuery}`;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data, "data home page");

        if (data.status === "error") {
            setError(data.results.message);
        }

        if (!data.results || data.results.length === 0) {
            throw new Error("No news found for this category or search query.");
        }

        // const filteredData = data.results.filter(item => item.image_url !== null && item.description);
        // setAllNews(filteredData);
        setAllNews(data.results);
    } catch (error) {
        console.error("API Error:", error);
        setError(error.message);
    }
    setLoading(false);
};

useEffect(() => {
    const delayDebounce = setTimeout(() => {
        FetchNews();
    }, 2000);

    return () => clearTimeout(delayDebounce);
}, [searchQuery, category, language]); // Fetch news when language changes

   return (
       <>
           <div>
               <Header />
               <div style={{ marginTop: "100px", marginBottom :"100px" }}>
                   <div className="container">
                  <div className="row">
                  <div className='d-flex flex-wrap justify-content'>
                   <SearchBox setSearchQuery={setSearchQuery} />
                   <NewsLenguage setLanguage={setLanguage} />
                   </div>
                  </div>
                   </div>
                   <NewsCategory setCategory={setCategory} />

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
           </div>
       </>
   );
};

export default Home;
