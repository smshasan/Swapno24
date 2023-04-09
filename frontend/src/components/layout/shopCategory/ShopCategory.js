import React from 'react'
import { Link } from 'react-router-dom'

const ShopCategory = () => {
  return (
    <>
      <div className='container' style={{ marginTop: '80px', textAlign: 'center' }}>
        <div className='row' >
          <div className='col-lg-4 col-md-4 col-sm-4 col-12 shop-box' style={{ borderRight: '1px solid #cecece', display: 'flex' }} >
            <div className='w-100'>
              <img src='/images/retail.png'/>
              <p>Retail Products</p>
              <p style={{color: '#212529c9'}}>101 ads</p>
              <hr></hr>
              <div className='float-right shop-footer'>
                <Link to={'#'}>Visit Shop</Link>
              </div>
            </div>


          </div>
          <div className='col-lg-4 col-md-4 col-sm-4 col-12 shop-box' style={{ borderRight: '1px solid #cecece', display: 'flex' }}>
            <div className='w-100'>
              <img src='/images/wholesale.png' />
              <p>Wholesale Products</p>
              <p style={{color: '#212529c9'}}>99 ads</p>
              <hr></hr>
              <div className='float-right shop-footer'>
                <Link to={'#'}>Visit Shop</Link>
              </div>
            </div>

          </div>
          <div className='col-lg-4 col-md-4 col-sm-4 col-12 shop-box' style={{ display: 'flex' }}>
            <div className='w-100'>
              <img src='/images/manufacturer.png' />
              <p>Manufacturer's Products</p>
              <p style={{color: '#212529c9'}}>105 ads</p>
              <hr></hr>
              <div className='float-right shop-footer'>
                <Link to={'#'}>Visit Shop</Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default ShopCategory