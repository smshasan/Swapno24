import React, { useEffect, useState } from 'react'
import UserSidebar from './UserSidebar'

import { useSelector, useDispatch } from 'react-redux'

import { loadUser } from '../../features/users/authSlice'
import axios from 'axios'
import { Link } from 'react-router-dom'

import TimeAgo from 'react-timeago'


const UserDashboard = () => {

    const [products, setProducts] = useState([])

    const dispatch = useDispatch()
    const { user, loading } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    useEffect(() => {
        const unapprovedProducts = async () => {
            try {
                const { data } = await axios.get(`/api/v1/unapproved/products/me`)
                console.log(data)
                setProducts(data.products)
            } catch (error) {
                console.log(error)
            }
        }
        unapprovedProducts()
    }, [user])

    console.log(products)


    return (
        <>
            <div className='container' style={{ backgroundColor: 'white', marginTop: '4rem' }}>
                <div className='row'>
                    <div className='col-lg-4 col-md-4 col-sm-6 col-12'>
                        <UserSidebar user={user} />

                    </div>
                    <div className='col-lg-8 col-md-8 col-sm-6 col-12 mt-4'>
                        {products?.map((product, index) => {
                            return (
                                <div key={index} className='userdashboard-card'>
                                    <div className="float-left" style={{ display: 'flex' }}>
                                        <img src={product.images[0].url} alt={product.name} />
                                        <div  className="userdashboard-details" style={{margin: '20px 0'}}>
                                            <p>{product.name}</p>
                                            <p>{product.division}/{product.district}/{product.thana}</p>
                                            <p>Tk. {product.price}</p>

                                            <p><TimeAgo date={product.createdAt} /></p>
                                        </div>
                                    </div>

                                    <div className='float-right userdashboard-button' style={{padding: '7px', gap: '5px', height: 'inherit', display: 'flex', alignItems: 'end'}}>
                                        <Link to={`/product/edit/${product._id}`}>Edit</Link>
                                        <Link to="#">Delete</Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
        </>
    )
}

export default UserDashboard