import React, { useEffect, useState } from 'react'

const Cards = () => {
    const [allNews, setAllNews] = useState([])
    const [search, setSearch] = useState("india")

    const FetchNews = async () => {
        try {
            const response = await fetch(`https://newsdata.io/api/1/latest?apikey=pub_68284ccc3e5ecbae8e43af659598b5b277d89&country=in&language=en&q=${search}`);
           const data = await response.json();
            console.log(data, "data");

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

            <section>
                <div className="container">
                    <div className="row">
                        <div className='d-flex align-items-center justify-content-between py-4'>
                            <h1 className=' ps-3 fs-3'>Letest</h1>

                        </div>

                        <div className="col-12 d-flex flex-wrap">
                            {
                                allNews.map((news, index) => {
                                    return (
                                        <div key={index} className="col-md-3 p-2">
                                        <div className="card h-100">
                                            {/* Image Section */}
                                            <div className="img" style={{ height: "200px" }}>
                                                <img src={news.urlToImage || news.image_url} className="card-img-top w-100 h-100" alt="..." />
                                            </div>

                                            {/* Card Body with Flexbox */}
                                            <div className="card-body d-flex flex-column">
                                                <h5 className="card-title heading">{news.title || news.name}</h5>
                                                <p className="card-text text">{news.description}</p>
                                                <p className="card-text">{news.publishedAt}</p>

                                                {/* Push the button to the bottom */}
                                                <div className="mt-auto">
                                                    <a href={news.url} className="btn bg-danger text-white w-100">View</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    )
                                })
                            }


                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Cards
