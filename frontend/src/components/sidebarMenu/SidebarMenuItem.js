import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './sidebarMenu.css'

const SidebarMenuItem = ({ category, condi, address, location }) => {
    // console.log('condi',  condi)
    const [status, setStatus] = useState(condi)
    const [add, setAdd] = useState(address)
    const [loc, setLoc] = useState(location)
    // console.log('status', status)
    const [open, setOpen] = useState(false)
    console.log('status', status)

    console.log('address', address)

    useEffect(() => {
        setStatus(condi)
        setAdd(address)
        setLoc(location)
    }, [condi, address, address, location])


    if (category.children.length > 0) {
        return (
            <div className={open ? "sidebar-item open" : "sidebar-item"}>
                <div className="sidebar-title">
                    <span >
                        {/* {status !== undefined && category.parentId !== '' && <Link to={`/products/sub_category/${status}/${category._id}`}>{category.name}</Link>}
                        {status !== undefined && category.parentId === '' && <Link to={`/products/category/${status}/${category._id}`}>{category.name}</Link>}

                        {status === undefined && category.parentId !== '' && <Link to={`/products/sub_category/${category._id}`}>{category.name}</Link>}
                        {status === undefined && category.parentId === '' && <Link to={`/products/category/${category._id}`}>{category.name}</Link>}

                        {address !== undefined && category.parentId === '' && <Link to={`/products/category/${address}/${location}/${category._id}`}>{category.name}</Link>} */}

                        {category.parentId === '' ? (
                            status !== undefined ? (
                                <Link to={`/products/category/${status}/${category._id}`}>{category.name}</Link>
                            ) : add !== undefined ? (
                                <Link to={`/products/category/${add}/${loc}/${category._id}`}>{category.name}</Link>
                            ) : (
                                <Link to={`/products/category/${category._id}`}>{category.name}</Link>
                            )
                        ) : (
                            status !== undefined ? (
                                <Link to={`/products/sub_category/${status}/${category._id}`}>{category.name}</Link>
                            ) : add !== undefined ? (
                                <Link to={`/products/sub_category/${add}/${loc}/${category._id}`}>{category.name}</Link>
                            ) : (
                                <Link to={`/products/sub_category/${category._id}`}>{category.name}</Link>
                            )
                        )}

                    </span>
                    <i className="bi-chevron-down toggle-btn" onClick={() => setOpen(!open)}></i>
                </div>
                <div className="sidebar-content">
                    {category.children.map((child, index) => <SidebarMenuItem key={index} category={child} condi={status} address={add} location={loc} />)}
                </div>
            </div>
        )
    } if (category.children.length === 0) {
        return (
            <span className="sidebar-item plain">

                {/* {status !== undefined && category.parentId !== '' && <Link to={`/products/sub_category/${status}/${category._id}`}>{category.name}</Link>}
                {status !== undefined && category.parentId === '' && <Link to={`/products/category/${status}/${category._id}`}>{category.name}</Link>}

                {status === undefined && category.parentId !== '' && <Link to={`/products/sub_category/${category._id}`}>{category.name}</Link>}
                {status === undefined && category.parentId === '' && <Link to={`/products/category/${category._id}`}>{category.name}</Link>}

                {address !== undefined && category.parentId === '' && <Link to={`/products/category/${address}/${loc}/${category._id}`}>{category.name}</Link>} */}

                {
                    category.parentId === '' ? (
                        status !== undefined ? (
                            <Link to={`/products/category/${status}/${category._id}`}>{category.name}</Link>
                        ) : add !== undefined ? (
                            <Link to={`/products/category/${add}/${loc}/${category._id}`}>{category.name}</Link>
                        ) : (
                            <Link to={`/products/category/${category._id}`}>{category.name}</Link>
                        )
                    ) : (
                        status !== undefined ? (
                            <Link to={`/products/sub_category/${status}/${category._id}`}>{category.name}</Link>
                        ) : add !== undefined ? (
                            <Link to={`/products/sub_category/${add}/${loc}/${category._id}`}>{category.name}</Link>
                        ) : (
                            <Link to={`/products/sub_category/${category._id}`}>{category.name}</Link>
                        )
                    )
                }

            </span>
        )
    }
}

export default SidebarMenuItem