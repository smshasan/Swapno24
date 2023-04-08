import React from 'react'
import { Link } from 'react-router-dom'
import SidebarMenu from '../sidebarMenu/SidebarMenu'
import TimeAgo from 'react-timeago'

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
                    <li ><p style={{ color: '#212121', fontWeight: '500' }}>{product.name}</p></li>
                    <li style={{ color: '#33383ecc', textTransform: 'capitalize' }}>Condition : {product.condition} </li>
                    <li style={{ color: '#33383ecc' }}><p>Tk {product.price}</p></li>
                  </div>

                  <div className='col-3' style={{ listStyle: 'none' }}>
                   
                    <br></br>
                    <li><p style={{ color: '#33383ecc' }}>{product.district} {'>'} {product.thana} {'>'} {product.village}</p></li>
                    <li style={{ color: '#33383ecc' }}>Posted: {<TimeAgo date={product.createdAt}/>}</li>
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