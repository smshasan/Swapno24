import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Card } from 'react-bootstrap'

import { fetchProducts } from '../../features/products/getProductSlice'

import MenuSidebar from '../layout/menuSidebar/MenuSidebar'
import SidebarMenu from "../sidebarMenu/SidebarMenu";


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

        <div className='container categoryPage'>
            <h4>Products By Category</h4>
            <div className='row'>
                <div className='col-lg-3 pl-0'>
                    {/* <MenuSidebar con={params.status}/> */}
                    <SidebarMenu con={params.status} />
                </div>

                <div className='col-lg-9 ' style={{ height: 'min-content' }}>

                    {filteredProducts.map((product) => (

                        <Card key={product._id} >
                            <Link to={`/product/${product._id}`}>
                            <div className='cardCustom' style={{ alignItems: 'center', display: 'flex', padding: '5px', boxShadow: '1px 3px 10px #e7e0e3' }}>

                                <div className='col-3 cardImage'>
                                    <img width="160px" height='120px' src={product.images[0].url} />
                                </div>

                                <div className='col-6' style={{ listStyle: 'none', paddingLeft: '12%' }}>
                                    <li ><h5 style={{ color: '#33383ecc', fontWeight: 'bold' }}>{product.name}</h5></li>
                                    <li style={{ color: '#212121' }}><strong><p>Tk {product.price}</p></strong></li>
                                    <br></br>
                                    <li style={{ textTransform: 'capitalize' }}>Status : {product.condition}</li>
                                </div>

                                <div className='col-3' style={{ listStyle: 'none' }}>
                                    <li style={{ textTransform: 'capitalize' }}>Status : {product.condition} </li>
                                    <br></br>
                                    <li><p>{product.district} {'>'} {product.thana} {'>'} {product.village}</p></li>
                                </div>

                            </div>
                            </Link>

                        </Card>
                    ))}
                </div>

            </div>

        </div>
    )
}

export default ProductsByCondition