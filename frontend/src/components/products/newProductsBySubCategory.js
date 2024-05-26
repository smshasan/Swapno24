import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'

import { fetchProductsBySubCategory } from '../../features/products/productsBySubCategorySlice'

import ProductsModel from './ProductsModel'

const NewProductsBySubCategory = () => {

  const [status, setStatus] = useState('')

  const dispatch = useDispatch()
  
  const {products} = useSelector(state => state.getProductsBySubCategory)

  // const filteredProducts = products.filter((product) => product.condition === status);


  const params = useParams()
  
  console.log("params:", params)
  

  var filteredProducts;

  if(status === 'new' || status === 'used') {
    filteredProducts = products.filter((product) => product.condition === status);
  }
    else if(params.address === 'division') {

      filteredProducts = products.filter(product => product.division === params.location) 
  
  } else if(params.address === 'district') filteredProducts = products.filter(product => product.district === params.location)
    
    else if(params.address === 'thana') filteredProducts = products.filter(product =>product.thana === params.location)
       else {
    filteredProducts = products.filter((product) => product.shopCategory === status);
  }
  
  console.log('productsbycategory', products)
  console.log('new', filteredProducts)

  
  useEffect(() => {
    dispatch(fetchProductsBySubCategory(params.id))
    setStatus(params.new)
  }, [dispatch, params])

  
  return (
    <>
      <ProductsModel products={filteredProducts} condition={status} address={params.address} location={params.location}/>
    </>
  )
}

export default NewProductsBySubCategory