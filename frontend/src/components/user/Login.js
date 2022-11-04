import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useHistory } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin } from '../../features/users/authSlice';

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData';

const Login = ({ history, location }) => {

    
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const userData = {
        phone,
        password
    }


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, isAuthenticated, user, error } = useSelector(state => state.auth);
    // const redirect = location.search ? location.search.split('=')[1] : '/'

    console.log('isAuthenticated', isAuthenticated)
    console.log('user', user)
    // localStorage.setItem('user', user)


    useEffect(() => {

        if (isAuthenticated) {
             navigate('/')
        }

        if (error) {
            alert(error);
            
        }

    }, [isAuthenticated, error, history])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(fetchLogin(userData));
       
    }

    return (
        <Fragment>

            {loading ? <Loader /> : (

                <Fragment>

                    <MetaData title = {'login'} />

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

                </Fragment>)}

        </Fragment>
    )
}

export default Login