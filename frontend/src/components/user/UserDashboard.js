import React, { useEffect, useState } from 'react'
import UserSidebar from './UserSidebar'

import { useSelector, useDispatch } from 'react-redux'

import { loadUser } from '../../features/users/authSlice'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../layout/Loader'

import TimeAgo from 'react-timeago'


const UserDashboard = () => {

    const [products, setProducts] = useState([])
    const [deleted, setDeleted] = useState(false)
    const [error, setError] = useState('')


    const dispatch = useDispatch()
    const { user, loading } = useSelector(state => state.auth)

    const navigate = useNavigate()

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

    const deleteHandler = async (id) => {
        try {
            const {data} = await axios.delete(`/api/v1/control/product/${id}`)
            console.log('deletedProduct', data)
            setDeleted(data.success)

        } catch (error) {
            setError('Something went wrong!')
        }

    }

    useEffect(() => {
      
        if(deleted) {
            alert('Product deleted successfully')
            navigate('/user/dashboard')
        }
        if(error !=='') {
            alert('Something went wrong!')
        }
      
    }, [deleted, error])
    


    return (
        <>
        {loading ? <Loader /> :
            <div className='container' style={{ backgroundColor: 'white', marginTop: '4rem' }}>
                <div className='row'>
                    <div className='col-lg-4 col-md-4 col-sm-6 col-12'>
                        <UserSidebar user={user} />

                    </div>
                    <div className='col-lg-8 col-md-8 col-sm-6 col-12 mt-4'>
                        {products?.map((product, index) => {
                            return (
                                <div key={index} className='userdashboard-card'>
                                    <div className="float-left" style={{ display: 'flex', height: '100%' }}>
                                        <img src={product.images[0].url} alt={product.name} style={{margin: '5px'}}/>
                                        <div  className="userdashboard-details" style={{margin: '20px 10'}}>
                                            <p>{product.name}</p>
                                            <p>{product.division}/{product.district}/{product.thana}</p>
                                            <p>Tk. {product.price}</p>

                                            <p><TimeAgo date={product.createdAt} /></p>
                                        </div>
                                    </div>

                                    <div className='float-right userdashboard-button' style={{padding: '7px', gap: '5px', height: 'inherit', display: 'flex', alignItems: 'end'}}>
                                        <Link to={`/product/edit/${product._id}`}>Edit</Link>
                                        <button onClick={() => deleteHandler(product._id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
            }

        </>
    )
}

export default UserDashboard