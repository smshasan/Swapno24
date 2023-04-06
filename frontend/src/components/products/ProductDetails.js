import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { fetchSingleProduct } from '../../features/products/singleProductSlice'
import RelatedProducts from './RelatedProducts';


const ProductDetails = () => {

    const [user, setUser] = useState([])

    const dispatch = useDispatch();
    const { product } = useSelector((state) => state.singleProduct)
    const params = useParams()
    console.log('product', product)

    useEffect(() => {
        dispatch(fetchSingleProduct(params.id))
    }, [dispatch, params.id])

    useEffect(() => {
        const getUser = async (id) => {
            try {
                const { data } = await axios.get(`/api/v1/user/${id}`)
                setUser(data.user)
                console.log('data', data)
            } catch (err) {
                console.log(err)
            }
        }
        getUser(product.user)

    }, [product.user])


    return (
        <>
            <div className='container product-details'>
                <div className='row'>

                    <div className='col-lg-4 pro_det_col_1'>
                        {
                            product.images?.map((image, index) => (
                                <img key={index} src={image.url}
                                    alt={product.name}
                                />
                            ))
                        }

                    </div>
                    <div className='col-lg-5'>
                        <div className='Pro_Det_col_2' >
                            <label >Name:</label>
                            <div>{product.name}</div>
                        </div>

                        <div className='Pro_Det_col_2' >
                            <label  >Price:</label>
                            <div>Tk. {product.price}</div>
                        </div>

                        <div className='Pro_Det_col_2' >
                            <label >Condition:</label>
                            <div style={{textTransform: 'capitalize'}}>{product.condition}</div>
                        </div>

                        <div className='Pro_Det_col_2'>
                            <label >Location:</label>
                            <div>{product.district}, {product.thana}</div>
                        </div>
                        <hr></hr>

                        <div className='Pro_Det_col_2' style={{height: 'auto'}}>
                            <label >Description:</label>
                            <div className='description'>{product.description}</div>
                        </div>
                    </div>

                    <div className='col-lg-3 pro-det-col-3'>
                        Contact the Seller: <br></br><br></br>
                        {user?.name}
                        <hr></hr>
                        {user?.phone}
                        <hr></hr>
                        <div className='chat'>
                            Chat
                        </div>
                    </div>

                </div>

                <Fragment>
                    <RelatedProducts categoryId={product.category} id={product._id}/>
                </Fragment>

            </div>
        </>
    )
}

export default ProductDetails