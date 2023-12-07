import React, { Fragment, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { getCategory } from '../../features/category/categorySlice'

import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const CategoryHome = ({t}) => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategory())
  }, [dispatch])

  console.log('getCategory', getCategory)

  const { categories } = useSelector(state => state.category)
  console.log('categories:', categories)

  return (
    <Fragment>
      <div className='container'style={{ marginTop: '80px'}}>
        <h3 className='text-center'>{t('homePage.category.categoryHead')}</h3>
        <div className='row'>
                  
          {categories.map(category => (

            <div key={category._id} className="col-lg-4 col-md-4 col-sm-6 col-12 p-3">
              <Link to={`/products/category/${category._id}`}>
                <Card style={{ textDecoration: 'none' }} key={category._id} >
                  <div className='category' style={{ alignItems: 'center', display: 'flex', padding: '5px', textDecoration: 'none' }}>
                    <div className='col-3'>
                      <img width="50px" height='50px' src={category.images[0].url} />
                    </div>

                    <div className='col-9' style={{ color: '#212529c9', display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
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