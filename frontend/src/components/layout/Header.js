import React, { Fragment, useEffect } from 'react'
import {BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
//import { useAlert } from 'react-alert'
import { loadUser, fetchLogout } from '../../features/users/authSlice'
//import Loader from '../layout/Loader'

import Search from './Search'

import '../../App.css'

const Header = () => {
    // const alert = useAlert();
    const dispatch = useDispatch();

    const { user, loading, isAuthenticated } = useSelector(state => state.auth)
    console.log('LoadUser', user)
    // const { cartItems } = useSelector(state => state.cart)

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    const logoutHandler = () => {
        dispatch(fetchLogout());
        // alert('Logged out successfully.')
        // console.log('logged out successfully')
    }

    return (
        <Fragment>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand" style={{display: 'flex', justifyContent: 'right'}}>
                        <Link to="/">
                            <img className="logoSize" src="/images/swapno24.png" alt="logo" />
                        </Link>
                    </div>
                </div>

                <div className="col-12 col-md-6 mt-2 mt-md-0">
                   
                     <Search />
                    {/* <Routes>
                        <Route render={({ history }) => <Search history={history} />} />
                    </Routes> */}
                </div>

                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">

                    

                    {/* <Link to="/cart" style={{ textDecoration: 'none' }} >
                        <span id="cart" className="ml-3">Cart</span>
                        <span className="ml-1" id="cart_count">{cartItems.length}</span>
                    </Link> */}

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
                                <span>{user && user.name}</span>
                            </Link>

                            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                                {user && user.role === 'admin'  && (
                                    <Link className="dropdown-item" to="dashboard">Dashboard</Link>
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
                                <Link className="dropdown-item" to="#">Profile</Link>
                                <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                                    Logout
                                </Link>

                            </div>

                        </div>

                    ) : !loading && <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>}

                </div>
            </nav>
        </Fragment>
    )
}

export default Header