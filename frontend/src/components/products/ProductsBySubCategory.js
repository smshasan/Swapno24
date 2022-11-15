import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'
import { Card } from 'react-bootstrap'


import { fetchProductsBySubCategory } from '../../features/products/productsByCategorySlice'


const ProductsBySubCategory = () => {

const params = useParams()
  
  console.log("params:", params)

  const dispatch = useDispatch()
  const {products} = useSelector((state) => state.getProductsByCategory)
 


  useEffect(()=> {

    dispatch(fetchProductsBySubCategory(params.id))

   }, [dispatch])

  return (
    <div className='container'>
         <h1>Products By Category</h1>
        
            {products.map((product) => (
              <Card key={product._id} className='m-3'>
                   <div style={{alignItems:'center' , display: 'flex', padding: '5px'}}>
                      <div className='col-3'>
                        <img  width = "160px" height = '120px' src={product.images[0].url}/>
                      </div>
                      
                      <div className='col-9' style={{listStyle: 'none'}}>
                          <li ><h5 style={{color: '#33383ecc', fontWeight: 'bold'}}>{product.name}</h5></li>
                          <li style={{color: '#212121'}}><strong><p>Tk {product.price}</p></strong></li>
                      </div>
                    </div>
              </Card>     
            ))}
    </div>
  )
}

export default ProductsBySubCategory