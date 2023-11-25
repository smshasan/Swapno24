import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';

import MetaData from '../layout/MetaData'

import Sidebar from './Sidebar'

import { useDispatch, useSelector } from 'react-redux'

import { fetchUsers } from '../../features/users/userSlice'

import { loadUser } from '../../features/users/authSlice';

const Dashboard = () => {

    const dispatch = useDispatch();

    const { users } = useSelector(state => state.users)
   
    const { user, loading } = useSelector(state => state.auth)

    console.log('user', user);


    useEffect(() => {
        dispatch(loadUser())
        dispatch(fetchUsers())
    }, [dispatch])

    return (
        <Fragment>
            <div className="row">
                
                <div className="col-12 col-sm-3 col-md-3 col-lg-2 col-xl-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-sm-9 col-md-9 col-lg-10 col-xl-10">
                    <h1 className="my-4">Dashboard</h1>
                   
                        <Fragment>
                            <MetaData title={'Admin Dashboard'} />

                            <div className="row pr-4">
                                <div className="col-xl-12 col-sm-12 mb-3">
                                    <div className="card text-white bg-primary o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Total Amount<br /> <b> Tk. totalAmount</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row pr-4">
                                <div className="col-xl-3 col-lg-6 col-sm-6 col-md-6 col-12 mb-3 px-2">
                                    <div className="card text-white bg-success o-hidden h-100">
                                        <div className="card-body">
                                        <div className="text-center card-font-size">Products<br /> <b>products && products.length </b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="#">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-lg-6 col-sm-6 col-md-6 col-12 mb-3 px-2">
                                    <div className="card text-white bg-danger o-hidden h-100">
                                        <div className="card-body">
                                        <div className="text-center card-font-size">Orders<br /> <b>orders && orders.length</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="#">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                             {user && user.role === 'admin' && (
                                    
                                <div className="col-xl-3 col-lg-6 col-sm-6 col-md-6 col-12 mb-3 px-2">
                                    <div className="card text-white bg-info o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Users<br /> <b>{users && users.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="#">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                                )}

                                <div className="col-xl-3 col-lg-6 col-sm-6 col-md-6 col-12 mb-3 px-2">
                                    <div className="card text-white bg-warning o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Out of Stock<br /> <b>outOfStock</b></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                </div>
            </div>

        </Fragment >
    )
}

export default Dashboard