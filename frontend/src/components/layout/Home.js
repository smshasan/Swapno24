
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { fetchProducts } from '../../features/products/getProductSlice'
import CategoryHome from './CategoryHome'

import MetaData from './MetaData'
import ShopCategory from './shopCategory/ShopCategory'
import Carousel from './carousel/Carousel'


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

        {/* <Carousel /> */}
        <CategoryHome />
        <ShopCategory />
        
    </>
  )
}

export default Home