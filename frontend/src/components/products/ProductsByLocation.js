import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { fetchProducts } from '../../features/products/getProductSlice'

import ProductsModel from "./ProductsModel";

const ProductsByLocation = () => {

  // const [address, setAddress] = useState('')
  // const [location, setLocation] = useState('')



  const dispatch = useDispatch()
  const params = useParams()

  console.log('params:', params)

  const {address, location} = params

  const { products } = useSelector((state) => state.products)


  var filteredProducts;

  if(address === 'division') {

    filteredProducts = products.filter(product => product.division === location) 

} else if(address === 'district') filteredProducts = products.filter(product => product.district === location)
  
  else if(address === 'thana') filteredProducts = products.filter(product =>product.thana === location)






  useEffect(() => {
    dispatch(fetchProducts())
    // setAddress(params.address)
    // setLocation(params.location)
  }, [dispatch])


  return (
    <>
      <ProductsModel products={filteredProducts} condition={params.status} address={params.address}  location={params.location}/>
    </>
  )
}

export default ProductsByLocation