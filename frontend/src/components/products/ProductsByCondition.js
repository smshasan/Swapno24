import React, { useEffect } from "react";

import { useDispatch, useSelector } from 'react-redux'
import {useParams } from 'react-router-dom'

import { fetchProducts } from '../../features/products/getProductSlice'

import ProuductsModel from "./ProuductsModel";

const ProductsByCondition = () => {

    const params = useParams()
    console.log('params', params)

    const dispatch = useDispatch()
    const { products } = useSelector((state) => state.products)

    const filteredProducts = products.filter(product => product.condition === params.status)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    return (

        <>
            <ProuductsModel products={filteredProducts}/>
        </>
    )
}

export default ProductsByCondition