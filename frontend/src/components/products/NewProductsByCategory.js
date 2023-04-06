import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'


import { fetchProductsByCategory} from '../../features/products/productsByCategorySlice'

import ProuductsModel from './ProuductsModel'

const NewProductsByCategory = () => {

  const [status, setStatus] = useState('')

  const dispatch = useDispatch()
  const {products} = useSelector((state) => state.getProductsByCategory)
  const filteredProducts = products.filter((product) => product.condition === status);
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
      <ProuductsModel products={filteredProducts}/>
    </>
  )
}

export default NewProductsByCategory