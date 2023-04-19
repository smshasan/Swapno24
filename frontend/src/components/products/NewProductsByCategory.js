import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams } from 'react-router-dom'


import {fetchProductsByCategory} from '../../features/products/productsByCategorySlice'

import ProductsModel from './ProductsModel'

const NewProductsByCategory = () => {

  const [status, setStatus] = useState('')

  const dispatch = useDispatch()
  const {products} = useSelector((state) => state.getProductsByCategory)

  var filteredProducts;

  if(status === 'new' || status === 'used') {
    filteredProducts = products.filter((product) => product.condition === status);
  } else {
    filteredProducts = products.filter((product) => product.shopCategory === status);
  }

  
  console.log('productsbycategory', products)
  console.log('new', filteredProducts)

  const params = useParams()
  console.log("params:", params)

  
  useEffect(()=> {
    dispatch(fetchProductsByCategory(params.id))
    setStatus(params.new)
   }, [dispatch, params])


  return (
    <>
      <ProductsModel products={filteredProducts} condition={status}/>
    </>
  )
}

export default NewProductsByCategory