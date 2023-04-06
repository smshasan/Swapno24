import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'

import { fetchProductsBySubCategory } from '../../features/products/productsBySubCategorySlice'

import ProuductsModel from './ProuductsModel'

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
    <>
      <ProuductsModel proudcts={filteredProducts}/>
    </>
  )
}

export default NewProductsBySubCategory