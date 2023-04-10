import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { fetchProductsByCategory } from '../../features/products/productsByCategorySlice'

import ProuductsModel from './ProductsModel'

const ProductsByCategory = () => {

  const params = useParams()

  console.log("params:", params)

  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.getProductsByCategory)

  const filteredProducts = (status) => {
    return products.filter((product) => product.condition === status)
  }

  console.log('productsbycategory', products)
  console.log('new', filteredProducts)


  useEffect(() => {
    dispatch(fetchProductsByCategory(params.id))
  }, [dispatch, params.id])

  return (
    <>
      <ProuductsModel products={products} />
    </>
  )
}

export default ProductsByCategory