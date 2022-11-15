import React, { Fragment, useEffect } from 'react'

import {useDispatch, useSelector} from 'react-redux'

import {getCategory} from '../../features/category/categorySlice'

import {Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'


const CategoryHome = () => {

    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getCategory())
    }, [dispatch])
    
    console.log('getCategory', getCategory)

const {categories} = useSelector(state => state.category)
console.log('categories:', categories)

  return (
    <Fragment>
      <div className='container'>
           <div className='row'>
                {categories.map(category => (
                  
                   <div className="col-4 p-3">
                      <Link to={`/products/category/${category._id}`}>
                          <Card key={category._id} >
                              <div style={{alignItems:'center' , display: 'flex', padding: '5px'}}>
                                <div className='col-3'>
                                  <img  width = "50px" height = '50px' src={category.images[0].url}/>
                                </div>
                                
                                <div className='col-9' style={{color: '#212529c9', display: 'flex', justifyContent: 'center'}}>
                                    <span>{category.name}</span>
                                </div>
                              </div>
                              
                          </Card>
                      </Link>
                  </div>
                  
                ))}
          </div>
      </div>
       
    </Fragment>
    
  )
}

export default CategoryHome