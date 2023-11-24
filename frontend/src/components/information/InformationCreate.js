import React, { Fragment, useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { createInformation } from '../../features/information/informationSlice'

const InformationCreate = () => {

    const [residentType, setResidentType] = useState('')
    const [name, setName] = useState('')

    const [fathersName, setFathersName] = useState('')
    const [mothersName, setMothersName] = useState('')

    const [presentAddress, setPresentAddress] = useState('')
    const [permanentAddress, setPermanentAddress] = useState('')
    const [nationality, setNationality] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [nid, setNid] = useState(0)
    const [phone, setPhone] = useState(0)




    const dispatch = useDispatch()

    const { loading, success, error } = useSelector(state => state.info)

    useEffect(() => {

        if (error) {
            alert(error)
        }

        if (success) {
            alert('Information created successfully')
        }

    }, [error, success])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.set('residentType', residentType)
        formData.set('name', name)
        formData.set('fathersName', fathersName)
        formData.set('mothersName', mothersName)
        formData.set('presentAddress', presentAddress)

        formData.set('permanentAddress', permanentAddress)
        formData.set('nationality', nationality)
        formData.set('dateOfBirth', dateOfBirth)
        formData.set('nid', nid)
        formData.set('phone', phone)


        dispatch(createInformation(formData))
    }

    return (

        <Fragment>
            <div className='row wrapper'>

                <div className='col-10 col-md-10 col-lg-10 col-xl-6'>
                    <h3 style={{textAlign: 'center'}}>Send Your Information to Police Station</h3>
                    <form className='shadow-lg' onSubmit={submitHandler} encType='multipart/form-data'>

                        <div className="form-group">
                            <label htmlFor="name-field">Name</label>
                            <input
                                type="text"
                                id="name-field"
                                className="form-control"
                                placeholder='Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="father_field">Father's Name</label>
                            <input
                                type="text"
                                id="father_field"
                                className="form-control"
                                placeholder="Father's Name"
                                value={fathersName}
                                onChange={(e) => setFathersName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="mother_field">Mother's Name</label>
                            <input
                                type="text"
                                id="mother_field"
                                className="form-control"
                                placeholder="Mother's Name"
                                value={mothersName}
                                onChange={(e) => setMothersName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="present_field">Present Address</label>
                            <input
                                type="text"
                                id="present_field"
                                className="form-control"
                                placeholder="Present Address"
                                value={presentAddress}
                                onChange={(e) => setPresentAddress(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="permanent_field">Permanent Address</label>
                            <input
                                type="text"
                                id="permanent_field"
                                className="form-control"
                                placeholder="Permanent Address"
                                value={permanentAddress}
                                onChange={(e) => setPermanentAddress(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nationality_field">Nationality</label>
                            <input
                                type="text"
                                id="nationality_field"
                                className="form-control"
                                placeholder="Nationality"
                                value={nationality}
                                onChange={(e) => setNationality(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="birth_field">Date of Birth</label>
                            <input
                                type="date"
                                id="birth_field"
                                className="form-control"
                                placeholder="Date of Birth"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nid_field">NID</label>
                            <input
                                type="number"
                                id="nid_field"
                                className="form-control"
                                placeholder="NID"
                                value={nid}
                                onChange={(e) => setNid(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone</label>
                            <input
                                type="number"
                                id="phone_field"
                                className="form-control"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

           

                        <div className='form-group'>

                            <label htmlFor="resident_field" style={{ marginRight: '10px', display: 'block' }}>Resident Type</label>
                            <select
                                id="resident_field"
                                onChange={(event) => setResidentType(event.target.value)}
                                value={residentType}
                            >
                                <option value="houseOwner">House Owner</option>
                                <option value="Tenant">Tenant</option>

                            </select>

                        </div>

                        <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            Send Information
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>

    )

}

export default InformationCreate