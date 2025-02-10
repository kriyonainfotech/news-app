import React, { useEffect, useState } from 'react';
import Header from '../Components/header/Header';
import Cards from '../Components/News/Cards';
import SearchBox from '../Components/News/SearchBox';
import BreackingNews from '../Components/News/BreackingNews';
import NewsCategory from '../Components/News/NewsCategory';
import Loading from '../Components/Loading';

const API_KEY = import.meta.env.VITE_EXPO_PUBLIC_API_KEY;

const Home = () => {
   const [allNews, setAllNews] = useState([]);
   const [category, setCategory] = useState("top"); // Default category
   const [searchQuery, setSearchQuery] = useState("");  // Search query state
   const [loading, setLoading] = useState(true); // Loading state
   const [error, setError] = useState(""); // Error state

const FetchNews = async () => {
    setLoading(true);
    setError(""); // Reset error before fetching
    try {
        let apiUrl = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=in&language=en&category=${category}&size=10&removeduplicate=1`;

        if (searchQuery.trim() !== "") {
            apiUrl += `&q=${searchQuery}`;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data, "data home page");
        if (data.status == "error") {
      setError(data.results.message)
          //     throw new Error(`HTTP Error: ${response.status}`); // Handle HTTP errors
          }
        if (!data.results || data.results.length === 0) {
            throw new Error("No news found for this category or search query.");
        }

        const filteredData = data.results.filter(item => item.image_url !== null && item.description); // Filter by image & description
        setAllNews(filteredData);
    } catch (error) {
        console.error("API Error:", error);
        // setError(error.message); // Set error message
    }
    setLoading(false);
};

// Debounce Logic
useEffect(() => {
    const delayDebounce = setTimeout(() => {
        FetchNews();
    }, 2000);

    return () => clearTimeout(delayDebounce);
}, [searchQuery, category]);

   return (
       <>
           <div>
               <Header />
               <div style={{ marginTop: "100px", marginBottom :"100px" }}>
                   <SearchBox setSearchQuery={setSearchQuery} />
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
