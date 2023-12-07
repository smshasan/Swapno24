import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSingleProduct } from '../../features/products/singleProductSlice'
import RelatedProducts from './RelatedProducts';

import { createConversation } from '../../features/messenger/conversationSlice'
import { loadUser } from '../../features/users/authSlice';
import Messenger from '../messenger/Messenger';

import Loader from '../layout/Loader'
import ProductMessenger from '../messenger/ProductMessenger';
import { Carousel } from 'react-bootstrap'

const ProductDetails = () => {

    const [poster, setPoster] = useState([])
    const [conv, setConv] = useState([])
    const [success, setSuccess] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { product } = useSelector((state) => state.singleProduct)

    const { user } = useSelector((state) => state.auth)

    const params = useParams()
    console.log('product', product)

    useEffect(() => {
        dispatch(fetchSingleProduct(params.id))
    }, [dispatch, params.id])

    useEffect(() => {
        const getUser = async (id) => {
            try {
                const { data } = await axios.get(`/api/v1/user/${id}`)
                setPoster(data.user)
                console.log('data', data)
            } catch (err) {
                console.log(err)
            }
        }
        getUser(product.user)

    }, [product.user])

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])


    const handleSubmit = async (e) => {
        
        e.preventDefault()

        const conversations = {
            senderId: user._id,
            receiverId: product.user,
        }

        try {
            const {data} = await axios.post(`/api/v1/conversations`, conversations)
            console.log(data)
            setConv(data.savedConversation)
            setSuccess(data.success)
            
        } catch (error) {
            console.log(error.response.data)
        }
      
     }

     useEffect(() => { 
        if(success===true) {
            navigate(`/product/messenger/${conv._id}/${product.user}/${product._id}`)
        }
    }, [success])
     

    return (
        <>
            <div className='container product-details'>
                <div className='row d-flex justify-content-around'>

                    <div className='col-lg-4 col-md-4 pro_det_col_1 img-fluid'>
                        <Carousel  pause='hover'>
                        {
                            product.images?.map((image, index) => (
                                <Carousel.Item >
                                    <img  className="d-block w-100" key={index} src={image.url}
                                    alt={product.name}
                                />
                                </Carousel.Item>
                                
                            ))
                        }
                        </Carousel>  
                    </div>
                    <div className='col-lg-5 col-md-5'>
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
                            <div className='description'><label >Description:</label>{product.description}</div>
                        </div>
                    </div>

                    <div className='col-lg-2 col-md-3 col-6 pro-det-col-3'>
                        Contact the Seller: <br></br><br></br>
                        {poster?.name}
                        <hr></hr>
                        {poster?.phone}
                        <hr></hr>
                        <div className='chat' onClick={handleSubmit}>
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