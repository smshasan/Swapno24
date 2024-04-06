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


import ImageGallery from "react-image-gallery";
// import Slider from 'react-slick';

import "react-image-gallery/styles/css/image-gallery.css";

import ReactImageMagnify from 'react-image-magnify';



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
            const { data } = await axios.post(`/api/v1/conversations`, conversations)
            console.log(data)
            setConv(data.savedConversation)
            setSuccess(data.success)

        } catch (error) {
            console.log(error.response.data)
        }

    }

    useEffect(() => {
        if (success === true) {
            navigate(`/product/messenger/${conv._id}/${product.user}/${product._id}`)
        }
    }, [success])



    // const handleThumbnailClick = (event, index) => {
    //     setSelectedImage(images[index].original);
    //   };



    const images = product?.images?.map(image => ({
        original: image.url,
        thumbnail: image.url,

    }));

    // const [selectedImage, setSelectedImage] = useState(images[0]?.original);


    // const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)

    // useEffect(() => {
    //     if (images && images.length > 0) {
    //         // Set the first image as the selected image initially
    //         setSelectedImage(images[0]?.original);
    //     }
    // }, [images]);

    // const [selectedImage, setSelectedImage] = useState(images[0]?.original);

    const handleThumbnailClick = (event, index) => {
        if (images && images[index]) {
            setSelectedImageIndex(index);
            // setSelectedImage(images[index]?.original);
        }
    };

    if (!images || images.length === 0) {
        return <div>No images available.</div>;
    }


    console.log('images', images)


    return (
        <>
            <div className='container product-details'>
                <div className='row d-flex justify-content-around'>

                    <div className='col-lg-4 col-md-4 pro_det_col_1 img-fluid'>

                        <div className="product-detail">

                            <div>
                                 <ImageGallery
                                        items={images}
                                        showPlayButton={false}
                                        showThumbnails={true}
                                        onClickThumbnail={handleThumbnailClick}
                                        // renderItem={(item) => (
                                        //     <ReactImageMagnify
                                        //         {...{
                                        //             smallImage: {
                                        //                 // alt: item.description,
                                        //                 isFluidWidth: true,
                                        //                 src: item.thumbnail,
                                        //             },
                                        //             largeImage: {
                                        //                 // src: selectedImage,
                                        //                 src: item.original,
                                        //                 width: 1200,
                                        //                 height: 1800,
                                        //             },
                                        //             // isHintEnabled: true,
                                        //             isActivatedOnTouch: true,
                                        //             enlargedImagePosition: "beside",
                                        //             // enlargedImageContainerStyle: {position: "relative",},
                                        //             // enlargedImageContainerDimensions: {width: '100%', height: '100%'},
                                        //             // enlargedImageStyle: { left:'500px', top:'0', zIndex:'99999999'},
                                        //         }}
                                        //     />
                                        // )}
                                    />  
                                    

                                {/* <ReactImageMagnify
                                    {...{
                                        smallImage: {
                                            // alt: item.description,
                                            isFluidWidth: true,
                                            src: images[0].thumbnail,
                                        },
                                        largeImage: {
                                            // src: selectedImage,
                                            src: images[0].original,
                                            width: 1200,
                                            height: 1800,
                                        },
                                        // isHintEnabled: true,
                                        isActivatedOnTouch: true,
                                        enlargedImagePosition: "beside",
                                        // enlargedImageContainerStyle: {position: "relative",},
                                        // enlargedImageContainerDimensions: {width: '100%', height: '100%'},
                                        enlargedImageStyle: {zIndex:'9999999'}
                                    }}
                                /> */}
                            </div>
                        </div>

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
                            <div style={{ textTransform: 'capitalize' }}>{product.condition}</div>
                        </div>

                        <div className='Pro_Det_col_2'>
                            <label >Location:</label>
                            <div>{product.district}, {product.thana}</div>
                        </div>
                        <hr></hr>

                        <div className='Pro_Det_col_2' style={{ height: 'auto' }}>
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
                    <RelatedProducts categoryId={product.category} id={product._id} />
                </Fragment>

            </div>
        </>
    )
}

export default ProductDetails