import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useHistory, Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin } from '../../features/users/authSlice';

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData';

const Login = () => {


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

    }, [isAuthenticated, error])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(fetchLogin(userData));

    }

    return (
        <Fragment>

            {loading ? <Loader /> : (

                <Fragment>

                    <MetaData title={'login'} />

                    <div className="row wrapper" style={{ marginTop: '10rem', marginBottom: '7rem' }}>
                        <div className="col-10 col-lg-3">
                            <form className="shadow-lg text-center" onSubmit={submitHandler} style={{ borderRadius: '20px' }}>
                                <h1 className="mb-3" style={{ fontSize: '26px' }}>Login</h1>
                                <div className="form-group" style={{ marginTop: '40px' }}>

                                    <input
                                        style={{ borderRadius: '8px' }}
                                        type="text"
                                        id="phone_field"
                                        className="form-control"
                                        placeholder='Phone Number'
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    {/* <label htmlFor="password_field">Password</label> */}
                                    <input
                                        style={{ borderRadius: '8px' }}
                                        type="password"
                                        id="password_field"
                                        className="form-control"
                                        placeholder='Password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <button
                                    style={{ borderRadius: '10rem', padding: '5px 0' }}
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                >
                                    LOGIN
                                </button>
                                <div className='text-muted mt-5'>
                                    ___ Don't have a Swapno24 Account? ___
                                </div>
                                <div style={{
                                    marginTop: "30px", paddingBottom: '5px', display: "flex", justifyContent: "center",
                                }}><span style={{
                                    border: " 1px solid #fa9c23",
                                    borderRadius: '10rem',
                                    width: '55%', padding: '5px 0'
                                }}><Link to="/register" style={{ display: 'block' }}>Sign Up</Link></span></div>
                            </form>
                        </div>
                    </div>

                </Fragment>)}

        </Fragment>
    )
}

export default Login