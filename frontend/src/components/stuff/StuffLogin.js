import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useHistory, Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { stuffLogin } from '../../features/stuff/newStuffSlice'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData';

const StuffLogin = () => {

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const stuffData = {
        phone,
        password
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, isAuthenticated, stuff, error } = useSelector(state => state.newStuff);
    // const redirect = location.search ? location.search.split('=')[1] : '/'

    console.log('isAuthenticated', isAuthenticated)
    console.log('stuff', stuff)


    useEffect(() => {

        if (isAuthenticated) {
            navigate('/stuff/dashboard')
        }

        if (error) {
            alert(error);

        }

    }, [isAuthenticated, error])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(stuffLogin(stuffData));

    }

    return (
        <Fragment>

            <MetaData title={'login'} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Login</h1>
                        <div className="form-group">
                            <label htmlFor="phone_field">Phone</label>
                            <input
                                type="text"
                                id="phone_field"
                                className="form-control"
                                placeholder='Phone Number'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            LOGIN
                        </button>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default StuffLogin