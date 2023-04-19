import React from 'react'
import { Link } from 'react-router-dom'

const ProductCarousel = ({item}) => {
    return (
   <div className="card p-3 rounded col-lg-3 m-3 w-50 text-center" style={{ minWidth: '98%' }}>
            <Link to={`/product/${item._id}`}>
                <img className="card-img-top mx-auto" src={item.images[0].url} alt="hello first" />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        {item.name}
                    </h5>

                </div>
            </Link>

        </div>
    )
}

export default ProductCarousel