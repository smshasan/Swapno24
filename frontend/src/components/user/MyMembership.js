import React, { Fragment, useEffect } from 'react'
import UserSidebar from './UserSidebar'
import { loadUser } from '../../features/users/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const MyMembership = () => {

    const { loading, user } = useSelector(state => state.auth)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])


    return (
        <>

            <div className='container text-center' style={{ backgroundColor: 'white', marginTop: '4rem' }}>
                <div className='row'>
                    <div className='col-lg-3 col-md-3 col-sm-6 col-12'>
                        <UserSidebar user={user} />

                    </div>
                    <div className='col-lg-9 col-md-9 col-sm-6 col-12 membership-status'>
                        <Fragment>
                            My Membership
                            <hr></hr>
                            <h2>Become Swapno24 Member</h2>
                            <p>Memberships give your business a voice and presence on Swapno24, to reach more customers, increase your sales and expand your business! Memberships unlock powerful tools like sales analytics, a dedicated business page and discounted ad promotions.</p>
                            <Link to="/user/membership/create">Learn More</Link>
                        </Fragment>

                    </div>
                </div>

            </div>
        </>
    )
}

export default MyMembership