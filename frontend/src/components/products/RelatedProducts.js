import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProductsBySubCategory } from '../../features/products/productsBySubCategorySlice'

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


    return (
        <>
            <div className='related_products'>
                {filterdProducts.length > 0 && <div className='mb-10'>
                    <p>Related Products</p>
                </div>
                }
                
                <Fragment>
                    <div className='row' style={{ textAlign: 'center' }} >
                        {filterdProducts?.map((product, index) => {

                            return <div className="card p-3 rounded col-lg-3 m-3">
                                <Link to={`/product/${product._id}`}>
                                    <img className="card-img-top mx-auto" src={product.images[0].url} alt="hello first" />
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">
                                            {product.name}
                                        </h5>

                                    </div>
                                </Link>

                            </div>
                        })}
                    </div>
                </Fragment>

            </div>
        </>
    )
}

export default RelatedProducts