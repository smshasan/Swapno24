import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

const Topbar = () => {
    const [click, setClick] = useState(false)
    console.log('click', click)
    const clickHandler = () => {
        setClick(!click)
    }

    return (
        <Fragment>
            <div className='topbar' style={{height: '40px', display: 'flex', alignItems: 'center', justifyContent:'center', background: '#f7f7f7'}}>
                <Link to={`/products/used`} style={{margin:"0 20px", color: '#000'}} className='clicked'>Used Products</Link>
                <Link to={`/products/new`} style={{margin:"0 20px", color: '#000'}} className="clicked">New Products</Link>
            </div>
        </Fragment>
    )
}

export default Topbar