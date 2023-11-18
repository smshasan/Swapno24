import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProductsBySubCategory } from '../../features/products/productsBySubCategorySlice'

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCarousel from './ProductCarousel';


const RelatedProducts = ({ categoryId, id }) => {
    console.log('categoryId', categoryId)

    const dispatch = useDispatch();

    const { products } = useSelector(state => state.getProductsBySubCategory);
    console.log('products', products)

    const filterdProducts = products.filter(product => product._id !== id)
    console.log('fileterd product', filterdProducts)

    useEffect(() => {
        dispatch(fetchProductsBySubCategory(categoryId))
    }, [dispatch, categoryId, id])


    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <>
            <div className='related_products'>
                {filterdProducts.length > 0 && <div className='mb-10'>
                    <p>Related Products</p>
                </div>
                }

                <Fragment>
                    <Carousel
                        ssr={true}
                        responsive={responsive}
                    >
                       { filterdProducts.map((product, index) => (<ProductCarousel key={index} item={product} />))}

                    </Carousel>
                </Fragment>
            </div>
        </>
    )
}

export default RelatedProducts