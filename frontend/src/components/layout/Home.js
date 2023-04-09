
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { fetchProducts } from '../../features/products/getProductSlice'
import CategoryHome from './CategoryHome'

import MetaData from './MetaData'
import ShopCategory from './shopCategory/ShopCategory'


const Home = (props) => {

    const {error, loading, products} = useSelector((state) => state.products)
    console.log('data,', products)
   

    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(fetchProducts())
    }, [dispatch])
    
    console.log('props', props)

  return (
    <>
      <MetaData title = "Homepage" />

        <CategoryHome />
        <ShopCategory />
        
    </>
  )
}

export default Home