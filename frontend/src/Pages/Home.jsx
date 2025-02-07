import React, { useEffect, useState } from 'react'
import Header from '../Components/header/Header'
import Cards from '../Components/News/Cards'
import SearchBox from '../Components/SearchBox'
import BreackingNews from '../Components/News/BreackingNews'

const API_KEY = import.meta.env.VITE_EXPO_PUBLIC_API_KEY
const Home = () => {
   const [allNews, setAllNews] = useState([])
      // const [search, setSearch] = useState("india")
   
  
      const FetchNews = async () => {
          try {
              const response = await fetch(`https://newsdata.io/api/1/news?apikey=pub_68284ccc3e5ecbae8e43af659598b5b277d89&country=in&language=en&category=business&removeduplicate=1 `);
              const data = await response.json();
              console.log(data, "data home page");
              const alldata = data.results.filter(item => item.image_url !== null);
              setAllNews(alldata);
          }
          catch (error) {
              console.error(error);
          }
  
  
      }
      useEffect(() => {
          FetchNews();
      }, [])
  return (
    <>
      <div>
        <Header />
       <div className='' style={{marginTop:"100px"}}>
       <SearchBox/>
        <BreackingNews allNews={allNews} />
        <Cards />
       </div>
      </div>
    </>
  )
}

export default Home
