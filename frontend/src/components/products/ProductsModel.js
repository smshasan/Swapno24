import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SidebarMenu from '../sidebarMenu/SidebarMenu'
import TimeAgo from 'react-timeago'

const ProductsModel = ({ products, condition }) => {

  const [con, setCon] = useState('')

  useEffect(() => {
    setCon(con)
  }, [condition])

  console.log('condition', condition)
  console.log('con', con)
  console.log('products', products)

  return (
    <>
      <div className='container categoryPage'>
        <h4>Products By Category</h4>
        <div className='row'>

          <div className='col-lg-3 pl-0'>
            <SidebarMenu con={condition} />
          </div>

          <div className='col-lg-9 ' style={{ height: 'min-content' }}>
            <div style={{ textTransform: 'capitalize' }}>{condition} Shop / Products</div>
            {products?.map((product) => (
              <div key={product._id} className='card'>
                <Link to={`/product/${product._id}`}>
                  <div className='cardCustom' style={{ marginTop: '30px', display: 'flex', padding: '5px' }}>
                    <div className='col-lg-3 col-md-3 col-sm-3 col-3 cardImage'>
                      <img width="160px" height='120px' src={product.images[0].url} />
                    </div>

                    <div className='col-lg-6 col-md-6 col-sm-6 col-6' style={{ listStyle: 'none', paddingLeft: '12%', textTransform: 'capitalize' }}>
                      <li className='product-desc'><p style={{ color: '#212121', fontWeight: '500' }}>{product.name}</p></li>
                      <li className='product-desc color' >Condition : {product.condition} </li>
                      <li className='product-desc color'>Shop Category : {product.shopCategory} </li>
                      <li className='product-desc color'><p>Tk {product.price}</p></li>
                    </div>

                    <div className='col-lg-3 col-md-3 col-sm-3 col-3' style={{ listStyle: 'none' }}>
                      <div><p style={{ color: '#33383ecc' }}>{product.district} {'>'} {product.thana} {'>'} {product.village}</p></div>
                      <div style={{ color: '#33383ecc', minHeight: '100px', display: 'flex', alignItems: 'end' }}>Posted : <span style={{ marginLeft: '10px' }}></span>{<TimeAgo date={product.createdAt} />}</div>
                    </div>
                  </div>
                </Link>

              </div>
            ))}
          </div>

        </div>

      </div>
    </>
  )
}

export default ProductsModel