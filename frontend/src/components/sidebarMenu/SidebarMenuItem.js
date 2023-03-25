import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './sidebarMenu.css'

const SidebarMenuItem = ({ category, condi }) => {
    console.log('condi',  condi)
    // console.log('category', category)
    const [status, setStatus] = useState(condi)
    console.log('status', status)
    const [open, setOpen] = useState(false)
    console.log('status', status)

    useEffect(() => {
        setStatus(condi)
    }, [condi])


    if (category.children.length > 0) {
        return (
            <div className={open ? "sidebar-item open" : "sidebar-item"}>
                <div className="sidebar-title">
                    <span >
                        {status !== undefined && category.parentId !== '' && <Link to={`/products/sub_category/${status}/${category._id}`}>{category.name}</Link>}
                        {status !== undefined && category.parentId === '' && <Link to={`/products/category/${status}/${category._id}`}>{category.name}</Link>}

                        {status === undefined && category.parentId !== '' && <Link to={`/products/sub_category/${category._id}`}>{category.name}</Link>}
                        {status === undefined && category.parentId === '' && <Link to={`/products/category/${category._id}`}>{category.name}</Link>}

                    </span>
                    <i className="bi-chevron-down toggle-btn" onClick={() => setOpen(!open)}></i>
                </div>
                <div className="sidebar-content">
                    {category.children.map((child, index) => <SidebarMenuItem key={index} category={child} condi={status}/>)}
                </div>
            </div>
        )
    } if(category.children.length === 0) {
        return (
            <span className="sidebar-item plain">

                {status !== undefined && category.parentId !== '' && <Link to={`/products/sub_category/${status}/${category._id}`}>{category.name}</Link>}
                {status !== undefined && category.parentId === '' && <Link to={`/products/category/${status}/${category._id}`}>{category.name}</Link>}

                {status === undefined && category.parentId !== '' && <Link to={`/products/sub_category/${category._id}`}>{category.name}</Link>}
                {status === undefined && category.parentId === '' && <Link to={`/products/category/${category._id}`}>{category.name}</Link>}

            </span>
        )
    }
}

export default SidebarMenuItem