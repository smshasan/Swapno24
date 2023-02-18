
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { fetchProducts } from '../../features/products/getProductSlice'
import CategoryHome from './CategoryHome'

import MetaData from './MetaData'


const Home = (props) => {

    const {error, loading, products} = useSelector((state) => state.products)
    console.log('data,', products)
   

    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(fetchProducts())
    }, [dispatch])
    
    console.log('props', props)

  return (
    <>
      <MetaData title = "Homepage" />

        <CategoryHome />
        {/* <h2>List of Products</h2> */}
        <>
          {loading && <div>Loading...</div>}
          {!loading && error ? <div>Error: {error}</div> : null }
          
              {/* <ul>  
                     {products.map((product) => (
                          <li key={product._id}>{product.name}</li>
                          )
                          
                      ) }
              </ul> */}
          
        </>
    </>
  )
}

export default Home