import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchProductsByShop } from '../../features/products/productsByShopSlice'

import ProductsModel from './ProductsModel'

const ProductsByShopCategory = () => {

   const[status, setStatus] = useState('')

    const {shop} = useParams()
    console.log('shop', shop)

    const dispatch = useDispatch()
    const { products } = useSelector((state) => state.productsByShop)
    console.log('products', products)

    useEffect(() => {
        dispatch(fetchProductsByShop(shop))
        
    }, [dispatch, shop])

    useEffect(() => {
        setStatus(shop)
    }, [shop])
    

    


  return (
    <>
       <ProductsModel products={products} condition={status}/>
    </>
  )
}

export default ProductsByShopCategory