import React from 'react'
import { Link } from 'react-router-dom'

const UserSidebar = ({user}) => {

    console.log('user loaded', user)

    return (
        <>
            <div className='sidebar-wrapper'>
                <nav id='user-sidebar'>
                    {user && user.role !== 'admin' && (
                            <ul className='list-unstyled'>
                                <Link to="/user/profile"><li className='components'>My Profile</li></Link>
                                <li className='components'>Settings</li>
                                <Link to="/user/membership"><li className='components'>My Membership</li></Link>
                            </ul>
                    )
                    
                    }
                    
                </nav>
            </div>
        </>
    )
}

export default UserSidebar