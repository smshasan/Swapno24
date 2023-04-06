import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useParams } from 'react-router-dom'


import { fetchProductsBySubCategory } from '../../features/products/productsBySubCategorySlice'
import ProuductsModel from './ProuductsModel'

const ProductsBySubCategory = () => {

  const params = useParams()

  console.log("params:", params)

  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.getProductsBySubCategory)


  useEffect(() => {

    dispatch(fetchProductsBySubCategory(params.id))

  }, [dispatch, params.id])

  return (
    <>
      <ProuductsModel products={products}/>
    </>
  )
}

export default ProductsBySubCategory