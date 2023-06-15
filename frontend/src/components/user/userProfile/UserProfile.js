import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from '../../../features/users/authSlice'

import UserSidebar from '../UserSidebar'
// import { fetchProducts } from '../../../features/products/getProductSlice'

import './userProfile.css'
import { Link, useNavigate } from 'react-router-dom'

import Loader from '../../layout/Loader'
import axios from 'axios'

const UserProfile = () => {

    const [deleted, setDeleted] = useState(false)
    const [error, setError] = useState('')

    const { loading, user } = useSelector(state => state.auth)
    // const { products } = useSelector(state => state.products)

    const dispatch = useDispatch()
    const navigate = useNavigate()


    // useEffect(() => {
    //     dispatch(fetchProducts())
    // }, [dispatch])

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])


    const deleteHandler = async (id) => {
        try {
            const {data} = await axios.delete(`/api/v1/control/user/${id}`)
            console.log('deletedUser', data)
            setDeleted(data.success)

        } catch (error) {
            setError('Something went wrong!')
        }

    }

    useEffect(() => {
      
        if(deleted) {
            alert('Your Account deleted successfully')
            navigate('/')
        }
        if(error !=='') {
            alert('Something went wrong!')
        }
      
    }, [deleted, error])


    return (
        <>
            {loading? <Loader />: 

            
            <div className='container' style={{ backgroundColor: 'white', marginTop: '4rem' }}>
                <div className='row'>
                    <div className='col-lg-3 col-md-3 col-sm-6 col-12'>
                        <UserSidebar user={user} />

                    </div>
                    <div className='col-lg-9 col-md-9 col-sm-6 col-12'>
                        <div className='user-profile'>
                            <img
                                src={user?.avatar.url}
                            />
                        </div>

                        <Fragment>
                            <table border='1' width='100%' className='mt-4 text-center'>

                                <tr>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Division</th>
                                    <th>District</th>
                                    <th>Thana</th>
                                    <th>Union</th>
                                    <th>Ward</th>
                                    <th>Village</th>
                                </tr>

                                <tr>
                                    <td>{user?.name}</td>
                                    <td>{user?.phone}</td>
                                    <td>{user?.division}</td>
                                    <td>{user?.district}</td>
                                    <td>{user?.thana}</td>
                                    <td>{user?.municipality}</td>
                                    <td>{user?.ward}</td>
                                    <td>{user?.village}</td>
                                </tr>


                            </table>
                        </Fragment>
              
                            <div className='float-right userdashboard-button mt-3' style={{ padding: '7px', gap: '5px', height: 'inherit', display: 'flex', alignItems: 'end' }}>
                                <Link to={`/user/profile/edit/${user._id}`}>Edit</Link>
                                <button onClick={() => deleteHandler(user._id)}>
                                    Delete
                                </button>
                            </div>
                
                    </div>
                </div>

            </div>
            }
        </>
    )
}

export default UserProfile