import React from 'react';

const NewsCategory = ({ setCategory, setLatest }) => {
    const categories = [
        "top", "business", "crime", "sports", "entertainment", "health", "science",
        "technology", "domestic", "education", "environment", "food", "lifestyle",
        "politics", "tourism", "world", "other"
    ];

    return (
        <>
            <section>
                <div className="container pb-5">
                    <div className="row">
                        <div className="col-12">
                            <div className="category-slider">
                                {/* All Button - Reset Category */}
                                <button className="category-btn" onClick={() => setCategory("")}>
                                    All
                                </button>
                                <button className="category-btn" onClick={() => setLatest("latest")}>
                                    Latest
                                </button>
                                {categories.map((cat, index) => (
                                    <button key={index} className="category-btn" onClick={() => setCategory(cat)}>
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default NewsCategory;
