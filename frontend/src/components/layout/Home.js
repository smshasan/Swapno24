
import React, {useContext, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { fetchProducts } from '../../features/products/getProductSlice'
import CategoryHome from './CategoryHome'

import MetaData from './MetaData'
import ShopCategory from './shopCategory/ShopCategory'
import Carousel from './carousel/Carousel'

import {useTranslation} from "react-i18next";
import Banner from './Banner'

import { HeaderLocationTextContext } from '../context.js/LocationContext'


const Home = (props) => {

    const {buttonText, setButtonText} = useContext(HeaderLocationTextContext)

    const [t, i18n] = useTranslation('common');
   

    const {error, loading, products} = useSelector((state) => state.products)
    console.log('data,', products)



    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(fetchProducts())
    }, [dispatch])


    // useEffect(() => {
    //   setButtonText('Location')
    // }, [])
    
    console.log('props', props)

  return (
    <>
      <MetaData title = "Homepage" />

        {/* <Carousel /> */}
        <CategoryHome t={t}/>
        <Banner />
        <ShopCategory t={t}/>
        
    </>
  )
}

export default Home