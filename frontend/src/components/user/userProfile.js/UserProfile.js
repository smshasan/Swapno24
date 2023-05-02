import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from '../../../features/users/authSlice'

import UserSidebar from '../UserSidebar'

import './userProfile.css'

const UserProfile = () => {

    const dispatch = useDispatch()
    const {user}= useSelector(state => state.auth)

    console.log('user loaded', user)


    useEffect(() => {
     dispatch(loadUser())
    }, [dispatch])

  return (
    <>
         <div className='container' style={{backgroundColor: 'white', marginTop: '4rem'}}>
            <div className='row'>
                <div className='col-lg-4 col-md-4 col-sm-6 col-12'>
                    <UserSidebar user={user}/>
                    
                </div>
                <div className='col-lg-8 col-md-8 col-sm-6 col-12'>
                    <div className='user-profile'>
                        <img 
                            src={user.avatar.url}
                        />
                    </div>
                    <div>
                        <p>Name: {user.name}</p>
                        <p>Phone : {user.phone}</p>
                    </div>
                </div>
            </div>

        </div>
    </>
  )
}

export default UserProfile