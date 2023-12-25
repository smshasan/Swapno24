import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'
//import { useAlert } from 'react-alert'
import { loadUser, fetchLogout } from '../../features/users/authSlice'
//import Loader from '../layout/Loader'



import Search from './Search'

import '../../App.css'
import axios from 'axios'

const Header = (props) => {

    const [googleUser, setGoogleUser] = useState({})
    
    const { user, loading, isAuthenticated } = useSelector(state => state.auth)
    const { t, i18n } = props;
    
    const dispatch = useDispatch();

   
    // const { cartItems } = useSelector(state => state.cart)

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])
    
    console.log('LoadUser', user)


	useEffect(() => {
    const getGoogleUser = async () =>  {
        try {
          const {data} =  await axios.get('/auth/login/success', { withCredentials: true })
          console.log('dataOfGoogleUser:', data)
          setGoogleUser(data.user)
        } catch (error) {
          console.log(error)
        
    }}
    getGoogleUser()
  },[])

  console.log('googleUser: ', googleUser)

    const logoutHandler = () => {
        dispatch(fetchLogout());
    }

   
    const googleLogoutHandler = async () => {
        try {
          const response = await fetch('/auth/google/logout', {
            method: 'GET',
            credentials: 'include',
          });
      
        //   console.log('Response Status:', response.status);
        //   console.log('Response Headers:', response.headers);
      
          if (response.ok) {
            // Redirect the user to the desired URL after successful logout
            window.location.href = 'http://localhost:3000';
          } else {
            console.error('Logout failed');
            const errorData = await response.json(); // Assuming your server sends JSON error details
            console.error('Error details:', errorData);
          }
        } catch (error) {
          console.error('Error during logout:', error);
        }
      };

    console.log('googleUser:', googleUser)

    return (
        <Fragment>
            <nav className="navbar row header">
                <div className='container'>
                    <div className="col-12 col-lg-2 col-md-2 col-sm-2" style={{ marginLeft: '0 !important' }}>
                        <div className="navbar-brand" style={{ marginLeft: '0 !important' }}>
                            <Link to="/">
                                <img className="logoSize" src="/images/swapno24White.png" alt="logo" style={{ marginLeft: '0 !important' }} />
                            </Link>
                        </div>
                    </div>

                    <div className="col-12 col-lg-7 col-md-6 col-sm-6 mt-2 mt-md-0">
                        <Search />
                    </div>
                    <div className="col-12 col-lg-2 col-md-2 col-sm-2 mt-2 mt-md-0 sell-products">
                        <Link to={`/products/create`}>{t('menuBar.sellProducts')}</Link>
                    </div>

                    <div className="col-12 col-lg-1 col-md-1 col-sm-1 mt-4 mt-md-0 text-center user_profile">

                        {/* <Link to="/cart" style={{ textDecoration: 'none' }} >
                        <span id="cart" className="ml-3">Cart</span>
                        <span className="ml-1" id="cart_count">{cartItems.length}</span>
                        </Link> */
                        }

                        {user ? (

                            <div className="ml-4 dropdown d-inline">
                                <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                    <figure className="avatar avatar-nav">
                                        <img
                                            src={user.avatar && user.avatar.url}
                                            alt={user && user.name}
                                            className="rounded-circle"
                                        />
                                    </figure>
                                    <span style={{ color: '#ffffff', fontSize: '16px' }}>{user && user.name}</span>
                                </Link>

                                <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                                    {user && user.role === 'admin' && (
                                        <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                    )}


                                    {user && user.role === 'vendor' && (
                                        <Link className="dropdown-item" to="#">Dashboard</Link>
                                    )}


                                    {/* {user && (user.role === 'admin' || user.role === 'vendor') && (
                                    <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                )} */}

                                    {/* if(user){
                                    if(user.role === 'admin' || user.role === 'vendor'){
                                        <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                    }
                                } */}

                                    {/* <Link className="dropdown-item" to="#">Orders</Link>
                                <Link className="dropdown-item" to="#">Profile</Link>
                                <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                                    Logout
                                </Link> */}

                                    <Link className="dropdown-item" to="#">Orders</Link>
                                    {
                                        user && user.role !== 'admin' && (
                                            <Link className="dropdown-item" to="/user/dashboard">Profile</Link>
                                        )
                                    }

                                    <Link className="dropdown-item logout" to="/"  onClick={logoutHandler}>
                                        Logout
                                    </Link>

                                </div>

                            </div>

                        )
                            : googleUser && googleUser.image ? (
                                <div>
                                    <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                        <figure className="avatar avatar-nav">
                                            {
                                                <img src={googleUser && googleUser.image}
                                                // alt="..."
                                                className="rounded-circle"
                                                /> 
                                                
                                            }
                                        </figure>
                                        <span style={{ color: '#ffffff', fontSize: '16px' }}>{googleUser && googleUser.name}</span>
                                    </Link>

                                    <div className="dropdown-menu" aria-labelledby="dropDownMenu">

                                        <Link className="dropdown-item text-danger" to="/" onClick={googleLogoutHandler}>
                                            Logout
                                        </Link>
                                    </div>
                                </div>

                            )
                                : !loading && <Link to="/login" className="btn login" id="login_btn">{t('menuBar.login')}</Link>

                        }

                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

export default Header