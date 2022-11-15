import React, { Fragment, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { getCategory } from '../../../features/category/categorySlice'


// import './style.css'

const MenuSidebar = () => {
    const dispatch = useDispatch()
    const { categories } = useSelector(state => state.category)
    console.log('category', categories)

    useEffect(() => {
        dispatch(getCategory())
    }, [dispatch])

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                <li key={category.name}>
                    {
            category.parentId !== '' && <Link to={`/products/sub_category/${category._id}`}>{category.name}</Link> }
            { category.parentId === ''  && <Link to={`/products/category/${category._id}`}>{category.name}</Link>
          }
                    {
                        category.children.length > 0 ? (
                                <ul className='menu'>{ renderCategories(category.children)}</ul>
                                    ) : null 
                    }  
                 </li>           
            )
        }
        return myCategories;
    }

  return (
    <Fragment>
        <h1>Menu Sidebar</h1>
        <div  className='menuHeader'>
            <ul>
                {
                    renderCategories(categories)
                }
            </ul>
        </div>
       
    </Fragment>
  )
}

export default MenuSidebar