import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Topbar = () => {

    // let products =[
    //     {
    //         id: 1,
    //         title: 'Used Products'
    //     },

    //     {
    //         id: 2,
    //         title: 'New Products'
    //     }
    // ]

    return (
        <Fragment>
            <div style={{height: '40px', display: 'flex', alignItems: 'center', justifyContent:'center', background: 'chocolate'}}>
                <Link to={`/products/used`} style={{margin:"0 20px", color: '#f8f9fa'}}>Used Products</Link>
                <Link to={`/products/new`} style={{margin:"0 20px", color: '#f8f9fa'}}>New Products</Link>
            </div>
        </Fragment>
    )
}

export default Topbar