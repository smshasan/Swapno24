import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Card } from 'react-bootstrap'



import { fetchProductsBySubCategory } from '../../features/products/productsBySubCategorySlice'


import MenuSidebar from '../layout/menuSidebar/MenuSidebar'
import SidebarMenu from '../sidebarMenu/SidebarMenu'

const NewProductsBySubCategory = () => {

    const [status, setStatus] = useState('')


 
  const dispatch = useDispatch()
  
  const {products} = useSelector(state => state.getProductsBySubCategory)
  const filteredProducts = products.filter((product) => product.condition === status);
  console.log('productsbycategory', products)
  console.log('new', filteredProducts)
  

  const params = useParams()
  
  console.log("params:", params)
  

  
  useEffect(() => {
    dispatch(fetchProductsBySubCategory(params.id))
    setStatus(params.new)
  }, [dispatch, params])


  
  
  return (
    <div className='container categoryPage'>
         <h4>Products By Category</h4>
        <div className='row'>
          <div className='col-lg-3 pl-0'>
              {/* <MenuSidebar con={status}/> */}
              <SidebarMenu con={status}/>
          </div>

          <div className='col-lg-9 ' style={{height: 'min-content'}}>
            {filteredProducts.map((product) => (
                <Card key={product._id} className='m-3' >
                  <Link to={`/product/${product._id}`}>
                    <div className='cardCustom' style={{alignItems:'center' , display: 'flex', padding: '5px', boxShadow: '1px 3px 10px #e7e0e3'}}>
                        <div className='col-3 cardImage'>
                          <img  width = "160px" height = '120px' src={product.images[0].url}/>
                        </div>
                        
                        <div className='col-9' style={{listStyle: 'none', paddingLeft: '12%'}}>
                            <li ><h5 style={{color: '#33383ecc', fontWeight: 'bold'}}>{product.name}</h5></li>
                            <li style={{color: '#212121'}}><strong><p>Tk {product.price}</p></strong></li>
                        </div>
                    </div>
                    </Link>
                </Card>     
              ))}
          </div>

        </div>
            
    </div>
  )
}

export default NewProductsBySubCategory