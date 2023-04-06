import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {getSearchedProducts} from '../../features/products/searchProuductsSlice'
import ProuductsModel from '../products/ProuductsModel'

const SearchPage = () => {

    const params = useParams()
    const keyword = params.keyword

    const dispatch = useDispatch()
    const {products} = useSelector((state) => state.searchProducts)

    useEffect(() => {
        dispatch(getSearchedProducts(keyword))
    }, [keyword])
    
  console.log('KeywordProducts', products)
  
  return (
    <>
        <ProuductsModel products={products} />
    </>
  )
}

export default SearchPage