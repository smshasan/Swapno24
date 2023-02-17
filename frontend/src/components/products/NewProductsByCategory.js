import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'
import { Card } from 'react-bootstrap'

import { fetchProductsByCategory } from '../../features/products/productsByCategorySlice'

import MenuSidebar from '../layout/menuSidebar/MenuSidebar'

const NewProductsByCategory = () => {

const params = useParams()
  
  console.log("params:", params)

  const dispatch = useDispatch()
  const {products} = useSelector((state) => state.getProductsByCategory)


  const filteredProducts = products.filter((product) => product.condition === "new");
  console.log('productsbycategory', products)
  console.log('new', filteredProducts)


  useEffect(()=> {
    dispatch(fetchProductsByCategory(params.id))
   }, [dispatch, params.id])

  return (
    <div className='container categoryPage'>
         <h4>Products By Category</h4>
        <div className='row'>
          <div className='col-lg-3 pl-0'>
              <MenuSidebar status='new'/>
          </div>

          <div className='col-lg-9 ' style={{height: 'min-content'}}>
            {filteredProducts.map((product) => (
                <Card key={product._id} className='m-3' >
                    <div className='cardCustom' style={{alignItems:'center' , display: 'flex', padding: '5px', boxShadow: '1px 3px 10px #e7e0e3'}}>
                        <div className='col-3 cardImage'>
                          <img  width = "160px" height = '120px' src={product.images[0].url}/>
                        </div>
                        
                        <div className='col-9' style={{listStyle: 'none', paddingLeft: '12%'}}>
                            <li ><h5 style={{color: '#33383ecc', fontWeight: 'bold'}}>{product.name}</h5></li>
                            <li style={{color: '#212121'}}><strong><p>Tk {product.price}</p></strong></li>
                        </div>
                    </div>
                </Card>     
              ))}
          </div>

        </div>
            
    </div>
  )
}

export default NewProductsByCategory