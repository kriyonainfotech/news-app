import React, { useEffect, useState } from 'react'
import Header from '../Components/header/Header'
const API_KEY = import.meta.env.VITE_EXPO_PUBLIC_API_KEY;

const Newsleter = () => {
    
       const [newsleter, setNewsleter] = useState([]);
      const [loading, setLoading] = useState(true); // Loading state
       const [error, setError] = useState(""); // Error state
    

    const FetchNews = async () => {
    
        setLoading(true);
        setError(""); // Reset error before fetching
        try {
            let apiUrl = `https://newsdata.io/api/1/latest?apikey=${API_KEY}&country=in`
         
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log(data, "data headline page");
            if (data.status == "error") {
                setError(data.results.message)
            }
            if (!data.results || data.results.length === 0) {
                throw new setErrorError("No news found for this category or search query.");
            }

            const filteredData = data.results.filter(item => item.image_url !== null && item.description); // Filter by image & description
            setNewsleter(filteredData);
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
    }, []);

    return (
        <div>
            <Header />
            <div style={{ marginTop: "100px" }}>
                
                <div className="container">
                    <div className="row">
                        <div>
                            <h5>NewsLetter</h5>
                        </div>
                        <div className="col-12 d-flex flex-wrap">
                        {
                            newsleter.map((item, index) => {
                                return (
                                    <div key={index} className="col-12 col-md-4 d-flex flex-md-column border border-1 rounded-2">
                                    <div className="col-4 col-md-12 d-flex align-items-center justify-content-center">
                                        <div className="img p-2 w-auto rounded-3 overflow-hidden d-flex align-items-center justify-content-center" style={{width :"120px", height :"150px"}}>
                                            <img src={item.image_url} className='w-auto h-100 rounded-2 img-fluid ' style={{objectFit:"cover"}} alt="" />
                                        </div>
                                    </div>
                                    <div className="col-8 col-md-12">
                                        <div className="content p-2">
                                            <span className='d-flex justify-content-end'>20-2-2025</span>
                                           <h6 className='heading'>{item.title}</h6>
                                           <p className='heading'>{item.description}</p>
                                           <div>
                                            <button onClick={() => navigate(`/news/${item.article_id}`)} className="btn bg-red text-white p-1">Read More</button>
                                           </div>
                                        </div>
                                    </div>
                                </div>
                                )
                            })
                        }
                        <div className="col-12 col-md-4 d-flex flex-md-column border border-1 rounded-2">
                            <div className="col-4 col-md-12 d-flex align-items-center justify-content-center">
                                <div className="img p-2 w-auto rounded-3 overflow-hidden d-flex align-items-center justify-content-center" style={{width :"120px", height :"150px"}}>
                                    <img src="https://a57.foxnews.com/cf-images.us-east-1.prod.boltdns.net/v1/static/694940094001/99f994dc-40f5-4746-ba5b-1c6d6dc115b8/2b160948-58f7-4b70-b85f-9cedce88cb78/1280x720/match/896/500/image.jpg?ve=1&tl=1" className='w-auto h-100 rounded-2 img-fluid ' style={{objectFit:"cover"}} alt="" />
                                </div>
                            </div>
                            <div className="col-8 col-md-12">
                                <div className="content p-2">
                                    <span className='d-flex justify-content-end'>20-2-2025</span>
                                   <h6 className='heading'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, quam.</h6>
                                   <p className='heading'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad consectetur quis maxime id totam eligendi fugiat, amet minima vel excepturi. Laudantium ducimus, quae ad expedita alias eaque quos possimus dolor.</p>
                                   <div>
                                    <button className="btn bg-red text-white p-1">Read More</button>
                                   </div>
                                </div>
                            </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Newsleter