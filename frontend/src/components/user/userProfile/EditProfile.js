import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { loadUser } from '../../../features/users/authSlice'

import MetaData from '../../../components/layout/MetaData'

const EditProfile = () => {


  const [name, setName] = useState('')
  const [phone, setPhone] = useState(0)

  const [images, setImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])

  const [oldImages, setOldImages] = useState([]);


  const [division, setDivision] = useState('')
  const [district, setDistrict] = useState('')
  const [thana, setThana] = useState('')
  const [union, setUnion] = useState('')
  const [ward, setWard] = useState(0)
  const [village, setVillage] = useState('')

  const [update, setUpdate] = useState(false)
  const [error, setError] = useState('')


  const { user, loading } = useSelector(state => state.auth)

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {

    dispatch(loadUser())
    setName(user.name)
    setPhone(user.phone)
    setOldImages(user.avatar.url)
    setDivision(user.division)
    setDistrict(user.district)
    setThana(user.thana)
    setUnion(user.municipality)
    setWard(user.ward)
    setVillage(user.village)

    if(error !== '') {
      alert("Please try again")
    }

    if(update) {
      alert("Updated Successfully!")
    }

  }, [dispatch, error, update]);

  

  const onChange = e => {

    const files = Array.from(e.target.files)

    setImagesPreview([]);
    setImages([])
    setOldImages([])

    files.forEach(file => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setImagesPreview(oldArray => [...oldArray, reader.result])
                setImages(oldArray => [...oldArray, reader.result])
            }
        }

        reader.readAsDataURL(file)
    })
}


const submitHandler =async (e) => {
  e.preventDefault()

  const formData = new FormData();

  formData.set('name', name)
  formData.set('phone', phone)
  formData.set('division', division)
  formData.set('district', district)
  formData.set('thana', thana)
  formData.set('municipality', union)
  formData.set('ward', ward)
  formData.set('village', village)

  // images.forEach(image => {
  //     formData.append('images', image)
  // })

  try {
      const { data } = await axios.put(`/api/v1/control/user/${id}`, formData)
      console.log('data', data);
      setUpdate(data.success)
  } catch (err) {
      console.log(err)
      setError('Not updated! ')
  }
}


  return (
    <>
      <MetaData title={'New Product'} />
      <div className="container">

        <div className="wrapper col-12 col-lg-12 col-md-12 my-5" >
          <form onSubmit={submitHandler} encType='multipart/form-data' style={{ width: '1000px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '45px' }}>Edit your profile</h2>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={oldImages} alt="profile_picture" style={{ border: '1px solid gray', borderRadius: '50%' }} />
            </div>


            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                value={name}

                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone_field">Phone</label>
              <input
                type="number"
                id="phone_field"
                className="form-control"
                value={phone}

                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="division_field">Division</label>
              <input
                type="text"
                id="division_field"
                className="form-control"
                value={division}

                onChange={(e) => setDivision(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="district_field">District</label>
              <input
                type="text"
                id="district_field"
                className="form-control"
                value={district}

                onChange={(e) => setDistrict(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="thana_field">Thana</label>
              <input
                type="text"
                id="thana_field"
                className="form-control"
                value={thana}

                onChange={(e) => setThana(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="union_field">Union</label>
              <input
                type="text"
                id="union_field"
                className="form-control"
                value={union}

                onChange={(e) => setUnion(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="ward_field">Ward</label>
              <input
                type="number"
                id="ward_field"
                className="form-control"
                value={ward}

                onChange={(e) => setWard(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="village_field">Village</label>
              <input
                type="text"
                id="village_field"
                className="form-control"
                value={village}

                onChange={(e) => setVillage(e.target.value)}
              />
            </div>


            {/* <div className='form-group'>

              
              <div className='custom-file'>
                
                <input
                  type='file'
                  name='product_images'
                  className='custom-file-input'
                  id='customFile'
                  // placeholder='Choose Image'
                  onChange={onChange}
                  multiple
                />
                <label className='custom-file-label' htmlFor='customFile'>
                  Choose Images
                </label>
              </div>

              {imagesPreview.map(img => (
                <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
              ))}

            </div> */}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                style={{ width: '200px', marginTop: 0 }}
                id="login_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={loading ? true : false}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditProfile