import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegistration } from '../../features/users/authSlice'

import { divisions, thanas } from '../Location'


const filteredDistricts = (div) => {
  const districts = divisions.find(division => division.name === div)
  return districts
}

const filteredThana = (div) => {
  const thana = thanas.find(ps => ps.name === div)
  return thana
}



const Register = () => {

  const [user, setUser] = useState({
    name: '',
    phone: '',
    password: ''

  })

  const [division, setDivision] = useState('')
  const [district, setDistrict] = useState('')
  const [thana, setThana] = useState('')
  const [union, setUnion] = useState('')
  const [ward, setWard] = useState(0)
  const [village, setVillage] = useState('')

  const { name, phone, password } = user;
  const [avatar, setAvatar] = useState('')
  const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.png')


  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { isAuthenticated, error, loading } = useSelector(state => state.auth);

  useEffect(() => {

    if (error) {
      alert(error);
    }

    if (isAuthenticated) {
      alert('registraion ')
      navigate('/')
    }

  }, [dispatch, error, isAuthenticated])

  const submitHandler = (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.set('name', name);
    formData.set('phone', phone)
    formData.set('password', password);
    formData.set('avatar', avatar);

    formData.set('division', division);
    formData.set('district', district);
    formData.set('thana', thana);
    formData.set('munic', division);
    formData.set('division', division);
    formData.set('division', division);


    dispatch(fetchRegistration(formData))
  }

  const onChange = e => {
    if (e.target.name === 'avatar') {

      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result)
          setAvatar(reader.result)
        }
      }

      reader.readAsDataURL(e.target.files[0])

    } else {
      setUser({ ...user, [e.target.name]: e.target.value })
    }
  }

  return (
    <Fragment>

      <MetaData title={'Register User'} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data' style={{ width: '1000px' }}>
            <h1 className="mb-3 text-center">Register</h1>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'start' }}><h4 style={{ width: 'fit-content', marginBottom: '30px', borderBottom: '2px solid rgb(249, 144, 8)' }}>Set Your details</h4></div>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    name='name'
                    value={name}
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone_field">Phone</label>
                  <input
                    type="text"
                    id="phone_field"
                    className="form-control"
                    name='phone'
                    value={phone}
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    name='password'
                    value={password}
                    onChange={onChange}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='avatar_upload'>Avatar</label>
                  <div className='d-flex align-items-center'>
                    <div>
                      <figure className='avatar mr-3 item-rtl'>
                        <img
                          src={avatarPreview}
                          className='rounded-circle'
                          alt='Avatar Preview'
                        />
                      </figure>
                    </div>
                    <div className='custom-file'>
                      <input
                        type='file'
                        name='avatar'
                        className='custom-file-input'
                        id='customFile'
                        accept="images/*"
                        onChange={onChange}
                      />
                      <label className='custom-file-label' htmlFor='customFile'>
                        Choose Avatar
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'start' }}><h4 style={{ width: 'fit-content', marginBottom: '30px', borderBottom: '2px solid rgb(249, 144, 8)' }}>Set Your Location</h4></div>
                <div id="example-collapse-text">

                  <div className="form-group">
                    <label htmlFor="district_field">Division: </label>
                    <select
                      type="text"
                      id="division_field"
                      className="form-control"
                      value={division}
                      onChange={(e) => setDivision(e.target.value)}
                    >
                      < option value="select">select</option>
                      <option value="Barishal">Barishal</option>
                      <option value="Chottogram">Chottogram</option>
                      <option value="Dhaka">Dhaka</option>
                      <option value="Khulna">Khulna</option>
                      <option value="Mymensingh">Mymensingh</option>
                      <option value="Rajshahi">Rajshahi</option>
                      <option value="Rangpur">Rangpur</option>
                      <option value="Sylhet">Sylhet</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="district_field">District: </label>
                    <select
                      type="text"
                      id="district_field"
                      className="form-control"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}

                    >   <option>select</option>
                      {filteredDistricts(division)?.districts.map((dist, index) => (
                        <option key={index} value={dist}>{dist}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="thana_field">Thana: </label>
                    <select
                      type="text"
                      id="thana_field"
                      className="form-control"
                      value={thana}
                      onChange={(e) => setThana(e.target.value)}
                    >

                      {filteredThana(district)?.thana.map((dist, index) => (
                        <option key={index} value={dist}>{dist}</option>
                      ))}

                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="union_field">Union: </label>
                    <input
                      type="text"
                      id="union_field"
                      className="form-control"
                      value={union}
                      onChange={(e) => setUnion(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="ward_field">Ward No: </label>
                    <input
                      type="text"
                      id="ward_field"
                      className="form-control"
                      value={ward}
                      onChange={(e) => setWard(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="village_field">Village: </label>
                    <input
                      type="text"
                      id="village_field"
                      className="form-control"
                      value={village}
                      onChange={(e) => setVillage(e.target.value)}
                    />
                  </div>

                </div>
              </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <button
                id="register_button"
                type="submit"
                className="btn w-50 py-3"
                disabled={loading ? true : false}
              >
                REGISTER
              </button>
            </div>

          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default Register
