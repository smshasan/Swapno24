import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Search = () => {

    const [keyword, setKeyword] = useState('');

    const nagivate = useNavigate()

    const searchHandler = (e) => {
        e.preventDefault()

        if (keyword.trim) {
            nagivate(`/search/${keyword}`)
        } else {
            nagivate('/')
        }

    }

    return (
        <form onSubmit={searchHandler} style={{ color: 'white' }}>
            <div className="input-group header-searchbar">
                <input
                    type="text"
                    id="search_field"
                    className="form-control"
                    placeholder="Enter Product Name ..."
                    onChange={(e) => setKeyword(e.target.value)}
                />

                <button
                    className="btn"
                    id="search_btn"
                    style={{
                        backgroundColor: '#f99008',
                        borderRadius: 0,
                        borderTopRightRadius: '30px',
                        borderBottomRightRadius: '30px'
                    }} >
                    <i className="fa fa-search" style={{color: 'white'}} aria-hidden="true"></i>
                </button>

            </div>
        </form>
    )
}

export default Search
