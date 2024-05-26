import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux'
import {useParams } from 'react-router-dom'

import { fetchProducts } from '../../features/products/getProductSlice'

import ProductsModel from "./ProductsModel";

const ProductsByCondition = () => {

    const [con, setCon] = useState('')
   

    const params = useParams()
    console.log('params', params)

    // useEffect(() => {
    //     setCon(params.status)
    // }, [params.status])

    const dispatch = useDispatch()
    const { products } = useSelector((state) => state.products)

    const filteredProducts = products.filter(product => product.condition === params.status)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    return (

        <>
            <ProductsModel products={filteredProducts} condition={params.status}/>
        </>
    )
}

export default ProductsByCondition