import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCategory } from '../../../features/category/categorySlice'


// import './style.css'

const MenuSidebar = ({con}) => {
    const [open, setOpen] = useState(false)
    console.log('con', con)
    const dispatch = useDispatch()
    const { categories } = useSelector(state => state.category)
    console.log('category', categories)

    useEffect(() => {
        dispatch(getCategory())
    }, [dispatch])

    // const renderCategories = (categories) => {
    //     let myCategories = [];
    //     for (let category of categories) {
    //         myCategories.push(
                
    //             <li key={category.name} 
    //             {...category.children.length !== 0 &&
    //                 <i className="bi-chevron-down toggle-btn" onClick={() => setOpen(!open)}></i>}
    //             >
                   
    //                 {con !==undefined && category.parentId !== '' && <Link to={`/products/sub_category/${con}/${category._id}`}>{category.name}</Link>}
    //                 {con !==undefined && category.parentId === '' && <Link to={`/products/category/${con}/${category._id}`}>{category.name}</Link>}

    //                 {con === undefined && category.parentId !== '' && <Link to={`/products/sub_category/${category._id}`}>{category.name}</Link>}
    //                 {con === undefined && category.parentId === '' && <Link to={`/products/category/${category._id}`}>{category.name}</Link>}
                    
    //                 {
    //                     category.children.length > 0 ? (
    //                         <ul  className ={open ? "sidebar-item open" : "sidebar-item"}>
    //                             {
    //                                 renderCategories(category.children)
                                    
    //                             }
                                
    //                         </ul>
    //                     ) : null
    //                 }
    //             </li>
    //         )
    //     }
    //     return myCategories;
    // }

return(
    categories.forEach(item => {
        
        item.children.length > 0 &&
           (
                <div className={open ? "sidebar-item open" : "sidebar-item"}>
                    <div className="sidebar-title">
                        <span>
                            {/* { item.icon && <i className={item.icon}></i> } */}
                            {item.name}    
                        </span> 
                        <i className="bi-chevron-down toggle-btn" onClick={() => setOpen(!open)}></i>
                    </div>
                    <div className="sidebar-content">
                        { item.children.map((child, index) => <MenuSidebar key={index} item={child} />) }
                    </div>
                </div>
            )
        
        item.children.length === 0 &&
             (
                <a href={item.path || "#"} className="sidebar-item plain">
                    {/* { item.icon && <i className={item.icon}></i> } */}
                    {item.name}
                </a>
            )
        

    
             }))
    
    // return (
    //     <Fragment>

    //         <div className='menuHeader'>
    //             <ul>
    //                 {
    //                     renderCategories(categories)
    //                 }
    //             </ul>
    //         </div>

    //     </Fragment>
    // )
}

export default MenuSidebar