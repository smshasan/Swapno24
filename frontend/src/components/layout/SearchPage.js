import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSearchedProducts } from '../../features/products/searchProuductsSlice'
import ProductsModel from '../products/ProductsModel'


const SearchPage = () => {

  const params = useParams()
  const keyword = params.keyword
  
  console.log('keyword: ' + keyword)
  

  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.searchProducts)
  

  useEffect(() => {
    dispatch(getSearchedProducts(keyword))
  }, [keyword])

  
  console.log('KeywordProducts', products)

  return (
    <>
      <ProductsModel products={products} />
    </>
  )
}

export default SearchPage