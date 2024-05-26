import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams } from 'react-router-dom'


import {fetchProductsByCategory} from '../../features/products/productsByCategorySlice'

import ProductsModel from './ProductsModel'

const NewProductsByCategory = () => {

  const [status, setStatus] = useState('')
  
  const dispatch = useDispatch()
  const {products} = useSelector((state) => state.getProductsByCategory)

  const params = useParams()
  console.log("params:", params)

  var filteredProducts;

  if(status === 'new' || status === 'used') {
    filteredProducts = products.filter((product) => product.condition === status);

  }  else if(params.address === 'division') {

    filteredProducts = products.filter(product => product.division === params.location) 

} else if(params.address === 'district') filteredProducts = products.filter(product => product.district === params.location)
  
  else if(params.address === 'thana') filteredProducts = products.filter(product =>product.thana === params.location)
  else {
    filteredProducts = products.filter((product) => product.shopCategory === status);
  }

  
  console.log('productsbycategory', products)
  console.log('new', filteredProducts)

  

  
  useEffect(()=> {
    dispatch(fetchProductsByCategory(params.id))
    setStatus(params.new)
    
   }, [dispatch, params])


  return (
    <>
      <ProductsModel products={filteredProducts} condition={status} address={params.address} location={params.location}/>
    </>
  )
}

export default NewProductsByCategory