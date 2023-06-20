import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSearchedProducts } from '../../features/products/searchProuductsSlice'
import ProductsModel from '../products/ProductsModel'
import { getCategory } from '../../features/category/categorySlice'
import axios from 'axios'
import { getPlainCategory } from '../../features/category/plainCategorySlice'

const SearchPage = () => {

  const [product, setProduct] = useState([])

  const params = useParams()
  const keyword = params.keyword
  
  console.log('keyword: ' + keyword)
  

  const dispatch = useDispatch()
  // const { products } = useSelector((state) => state.searchProducts)
  const { plainCategories } = useSelector((state) => state.plainCategory)


  useEffect(() => {
    dispatch(getPlainCategory())
  }, [dispatch])


  // useEffect(() => {
  //   dispatch(getSearchedProducts(keyword))
  // }, [keyword])

  
  // const searchRegExp = new RegExp('.*' + keyword + '.*', 'i');



  useEffect(() => {

    const filteredProducts = async (pass) => {

      try {

        const filteredCategories = plainCategories.filter(category => category.name === pass)
         console.log(filteredCategories)
        if(filteredCategories.length > 0) {
          filteredCategories.forEach(async (category) => {
            if (category.parentId === '') {
              const { data } = await axios.get(`/api/v1/products/fid/${category._id}`)
              setProduct(data.products)
            } else if (category.parentId !== '') {
              const { data } = await axios.get(`/api/v1/products/uid/${category._id}`)
              setProduct(data.products)
            }
          })
        } else {
          const {data} = await axios.get(`/api/v1/products?keyword=${keyword}`)
          setProduct(data.products)
        }
        
      } catch (error) {
        console.log(error)
      }
    }
    filteredProducts(keyword)
  }, [keyword])



  // console.log('filteredProducts', filteredProducts(keyword))
  // filteredProducts()

  console.log('KeywordProducts', product)

  return (
    <>
      <ProductsModel products={product} />
    </>
  )
}

export default SearchPage