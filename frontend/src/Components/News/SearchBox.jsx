import React, { useState } from 'react';

const SearchBox = ({ setSearchQuery }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchQuery(searchTerm); // Home Component ma search query update kariye
    };

    return (
        <>
          <div className="container">
            <div className="row">
                <div className='col-md-4 p-3'>
                    <form className="d-flex" role="search" onSubmit={handleSubmit}>
                        <input 
                            className="form-control me-2" 
                            type="search"  
                            placeholder="Search" 
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-outline-danger" type="submit">Search</button>
                    </form>
                </div>
            </div>
          </div>
        </>
    );
};

export default SearchBox;
