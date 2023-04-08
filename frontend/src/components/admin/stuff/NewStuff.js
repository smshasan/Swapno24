import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { stuffRegistration } from '../../../features/stuff/newStuffSlice';

import MetaData from '../../layout/MetaData';
import Sidebar from '../Sidebar';



const NewStuff = () => {

  const [user, setUser] = useState({
    name: '',
    phone: '',
    designation: '',
    department: '',
    area: '',
    basicSalary: 0,
    password: ''

  })


  const { name, phone, designation, department, area, basicSalary, password } = user;
  const [avatar, setAvatar] = useState('')
  const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.png')


  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { isAuthenticated, error, loading } = useSelector(state => state.newStuff);


  useEffect(() => {

    if (error) {
      alert(error);
    }

    if (isAuthenticated) {
      alert('Stuff registered successfully ')
      navigate('/')
    }

  }, [dispatch, error, isAuthenticated])


  const submitHandler = (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.set('name', name);
    formData.set('phone', phone);
    formData.set('designation', designation);
    formData.set('department', department);
    formData.set('area', area);
    formData.set('basicSalary', basicSalary);
    formData.set('password', password);
    formData.set('avatar', avatar);


    dispatch(stuffRegistration(formData))
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

  console.log('basicSalary: ' + basicSalary)
  
  return (

    <Fragment>
      <MetaData title='Stuff Registration' />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <div className='row'>

              <div className="wrapper  col-12 col-md-9 my-5 " >
                <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                  <h2 className="mb-3" style={{ textAlign: 'center' }}> Stuff Registration</h2>

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
                    <label htmlFor="designation_field">Designation</label>
                    <input
                      type="text"
                      id="designation_field"
                      className="form-control"
                      name='designation'
                      value={designation}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="department_field">Department</label>
                    <input
                      type="text"
                      id="department_field"
                      className="form-control"
                      name='department'
                      value={department}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="area_field">Area</label>
                    <input
                      type="text"
                      id="area_field"
                      className="form-control"
                      name='area'
                      value={area}
                      onChange={onChange}
                    />
                  </div>           

                  <div className="form-group">
                    <label htmlFor="basic_field">Basic Salary</label>
                    <input
                      type="number"
                      id="basic_field"
                      className="form-control"
                      name='basicSalary'
                      value={basicSalary}
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

                  <button
                    id="register_button"
                    type="submit"
                    className="btn btn-block py-3"
                    disabled={loading ? true : false}
                  >
                    REGISTER
                  </button>

                </form>
              </div>

            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  )
}

export default NewStuff