import React from 'react'

const SearchBox = () => {
    return (
        <>
          <div className="container ">
            <div className="row">
            <div className='col-md-4 p-3'>
            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search"  placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-danger" type="submit">Search</button>
            </form>
            </div>
            </div>
          </div>
        </>
    )
}

export default SearchBox
