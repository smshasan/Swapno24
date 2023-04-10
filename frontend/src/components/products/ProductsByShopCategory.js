import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchProductsByShop } from '../../features/products/productsByShopSlice'

const ProductsByShopCategory = () => {

    const {shop} = useParams()
    console.log('shop', shop)

    const dispatch = useDispatch()
    const { products } = useSelector((state) => state.productsByShop)
    console.log('products', products)

    // const fileteredProducts = products.filter(product => product.shopCategory === shop)
    // console.log('filereducedproducts', fileteredProducts)
    

    useEffect(() => {
        dispatch(fetchProductsByShop(shop))
    }, [dispatch, shop])

  return (
    <>
        ProductsByShopCategory
    </>
  )
}

export default ProductsByShopCategory