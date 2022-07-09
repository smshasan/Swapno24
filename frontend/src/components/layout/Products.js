import React, { Fragment, useEffect, useState  } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts, clearErrors } from '../../actions/productActions';

const Products = () => {

    const {products, error} = useSelector(state => state.products);
    //  console.log('sec', useSelector(state => state.productsBySlug))

    const dispatch = useDispatch();
       console.log('products', products);
    
       useEffect(() => {
        dispatch(getAdminProducts());
        console.log("adminPro", getAdminProducts());
        console.log('product', products);
    

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, error])

  return (
    <div>
      <ul>
      {
        products.map(product => (

            
                <li key={product._id}>{product.name}</li>
            

        ))
       }
      </ul>
       
    </div>
  )
}

export default Products