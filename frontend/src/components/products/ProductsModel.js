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
      <div className='container'>
        <h4>Products By Category</h4>
        <div className='row'>

          <div className='col-md-4 col-lg-3 col-sm-3 col-12 pl-0'>
            <SidebarMenu con={condition} />
          </div>

          <div className='col-md-8 col-lg-9 col-sm-9 col-12 cardGroup' style={{ height: 'min-content', left: '20px' }}>
            <div style={{ textTransform: 'capitalize' }}>{condition} Shop / Products</div>

            {products?.map((product) => (
              <div key={product._id} className='card'>
                <Link to={`/product/${product._id}`}>
                  <div className='cardCustom' style={{ marginTop: '20px', display: 'flex', padding: '5px' }}>
                    <div className='col-lg-4 col-md-4 col-sm-4 col-4 cardImage'>
                      <img width="160px" height='120px' src={product.images[0].url} />
                      {/* <div style={{position: 'absolute', top: 0, left: 0}}></div> */}
                    </div>

                    <div className='col-lg-8 col-md-8 col-sm-8 col-8' style={{ listStyle: 'none', textTransform: 'capitalize' }}>
                      <p className='product-desc-head' style={{ color: '#212121', fontWeight: '500', fontSize: '18px', marginBottom: 0 }}>{product.name}</p>
                      <ul>
                        <li className='product-desc color' style={{ color: '#950d0d' }} >{product.district}{','} {product.thana}{','} {product.village}</li>
                        <li className='product-desc color' >Condition : {product.condition} </li>
                        <li className='product-desc color'>Shop Category : {product.shopCategory} </li>
                        <li className='product-desc color'><p>Tk. {product.price}</p></li>
                      </ul>
                      <div className='float-right' style={{ color: '#33383ecc', paddingBottom: '10px' }}>Posted : <span style={{ marginLeft: '5px' }}></span>{<TimeAgo date={product.createdAt} />}</div>
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