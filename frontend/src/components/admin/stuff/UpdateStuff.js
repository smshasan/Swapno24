import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../../layout/MetaData';
import Sidebar from '../Sidebar'

import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { FetchStuffDetails } from '../../../features/stuff/stuffSlice'

import axios from 'axios'

const UpdateStuff = () => {

    const [name, setName] = useState('')
    const [phone, setPhone] = useState(0)
    const [designation, setDesignation] = useState('')
    const [department, setDepartment] = useState('')
    const [area, setArea] = useState('')
    const [basicSalary, setBasicSalary] = useState(0)

    const [update, setUpdate] = useState(false)
    const [error, setError] = useState('')

    const dispatch = useDispatch();

    const {stuff } = useSelector(state => state.stuff)

    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {

        console.log('checking:',stuff && stuff._id !== id);
        if (stuff && stuff._id !== id) {
            dispatch(FetchStuffDetails(id))
        } else {
            setName(stuff?.name);
            setPhone(stuff?.phone);
            setDesignation(stuff?.designation)
            setDepartment(stuff?.department)
            setArea(stuff?.area)
            setBasicSalary(stuff?.basicSalary)
        }

        if (error !== '')  {
            alert(error);
        }

        if (update) {
            console.log('update success', update);
            alert('Employee updated successfully')
            navigate('/stuff/list')
        }

    }, [dispatch, stuff, update, navigate, id, error]);

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('phone', phone);
        formData.set('designation', designation);
        formData.set('department', department);
        formData.set('area', area);
        formData.set('basicSalary', basicSalary);

        try {
            const { data } = await axios.put(`/api/v1/stuff/update/${id}`, formData)
            console.log('data', data);
            setUpdate(data.success)
        } catch (err) {
            console.log(err)
            setError(err.response.data)
        }
    }


    return (
        <Fragment>
            <MetaData title={`Update User`} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mt-2 mb-5 text-center">Update Employee</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="name"
                                        id="name_field"
                                        className="form-control"
                                        name='name'
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
                                        name='phone'
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="designation_field">Designation</label>

                                    <select
                                        id="designation_field"
                                        className="form-control"
                                        name='designation'
                                        value={designation}
                                        onChange={(e) => setDesignation(e.target.value)}
                                    >
                                        <option value="Manager">Manager</option>
                                        <option value="Sales Man">Sales Man</option>
                                        <option value="Executive">Executive</option>
                                        <option value="Admin">Admin</option>

                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="department_field">Department</label>
                                    <input
                                        type="text"
                                        id="department_field"
                                        className="form-control"
                                        name='department'
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
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
                                        onChange={(e) => setArea(e.target.value)}
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
                                        onChange={(e) => setBasicSalary(e.target.value)}
                                    />
                                </div>

                                <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
                            </form>
                        </div>
                    </div>
                </div> 
            </div>

        </Fragment>
    )
}

export default UpdateStuff