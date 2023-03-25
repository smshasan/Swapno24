import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Card } from 'react-bootstrap'

import { fetchProductsByCategory } from '../../features/products/productsByCategorySlice'

// import MenuSidebar from '../layout/menuSidebar/MenuSidebar'
import SidebarMenu from '../sidebarMenu/SidebarMenu'

const ProductsByCategory = () => {

  const params = useParams()

  console.log("params:", params)

  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.getProductsByCategory)


  // const filteredProducts = products.filter((product) => product.condition === "new");
  const filteredProducts = (status) => {
    return products.filter((product) => product.condition === status)
  }

  console.log('productsbycategory', products)
  console.log('new', filteredProducts)


  useEffect(() => {
    dispatch(fetchProductsByCategory(params.id))
  }, [dispatch, params.id])

  return (
    <div className='container categoryPage'>
      <h4>Products By Category</h4>
      <div className='row'>
        <div className='col-lg-3 pl-0'>
          {/* <MenuSidebar /> */}
          <SidebarMenu />
        </div>

        <div className='col-lg-9 ' style={{ height: 'min-content' }}>
          {products.map((product) => (
            <div key={product._id} className='card'>
              <Link to={`/product/${product._id}`}>
                <div className='cardCustom' style={{ marginTop: '30px', display: 'flex', padding: '5px' }}>
                  <div className='col-3 cardImage'>
                    <img width="160px" height='120px' src={product.images[0].url} />
                  </div>

                  <div className='col-6' style={{ listStyle: 'none', paddingLeft: '12%' }}>
                    <li ><h5 style={{ color: '#33383ecc', fontWeight: 'bold' }}>{product.name}</h5></li>
                    <br></br>
                    <li style={{ color: '#212121' }}><strong><p>Tk {product.price}</p></strong></li>
                  </div>

                  <div className='col-3' style={{ listStyle: 'none' }}>
                    <li style={{ textTransform: 'capitalize' }}>Status : {product.condition} </li>
                    <br></br>
                    <li><p>{product.district} {'>'} {product.thana} {'>'} {product.village}</p></li>
                  </div>
                </div>
              </Link>

            </div>
          ))}
        </div>

      </div>

    </div>
  )
}

export default ProductsByCategory