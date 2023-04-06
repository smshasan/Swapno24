import React from 'react'
import { Link } from 'react-router-dom'
import SidebarMenu from '../sidebarMenu/SidebarMenu'

const ProuductsModel = ({products}) => {

  return (
    <>
        <div className='container categoryPage'>
      <h4>Products By Category</h4>
      <div className='row'>
        <div className='col-lg-3 pl-0'>
          {/* <MenuSidebar /> */}
          <SidebarMenu />
        </div>

        <div className='col-lg-9 ' style={{ height: 'min-content' }}>
          {products?.map((product) => (
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
    </>
  )
}

export default ProuductsModel