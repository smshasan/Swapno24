import React, { Fragment, useEffect, useState } from 'react'
import Sidebar from '../Sidebar'

import { allStuff } from '../../../features/stuff/stuffSlice'
import { useDispatch, useSelector } from 'react-redux'
import { createCommission } from '../../../features/commission/commissionSlice'

const NewCommission = () => {

    const [id, setId] = useState("")
    const [commission, setCommission] = useState(0)

    const dispatch = useDispatch()
    const { stuff } = useSelector(state => state.stuff)
    const { salary, loading } = useSelector(state => state.salary)

    console.log('stuff: ', stuff)

    useEffect(() => {
        dispatch(allStuff())
    }, [dispatch])

    const submitHandler = (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.set('stuffId', id)
        formData.set('commission', commission)

        dispatch(createCommission(formData))

    }

    const filteredStuff = (id) => {
        if (id === '') {
            return { area: '', designation: '', department: '' }
        } else {
            const stuffFilter = stuff?.find(stu => stu._id === id)
            return stuffFilter
        }

    }

    return (
        <>
            <div className='row'>

                <div className='col-lg-2 col-md-2'>
                    <Sidebar />
                </div>

                <div className='wrapper col-lg-10 col-lg-10'>
                    <Fragment>
                        <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>

                            <div className='float-left'>

                                <div className="form-group">
                                    <label htmlFor="id_field">All Employee</label>
                                    <select
                                        type="text"
                                        id="id_field"
                                        className="form-control"
                                        value={id}
                                        onChange={(e) => setId(e.target.value)}
                                    >
                                        <option value=''>Select</option>
                                        {stuff?.map((item, index) => (

                                            <option key={item._id} value={item._id}>
                                                {index + 1}. {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="basic_field">Basic Salary</label>
                                    <input
                                        type="number"
                                        id="basic_field"
                                        className="form-control"
                                        value={filteredStuff(id)?.basicSalary}
                                       
                                    />
                                </div>

                                 <div className="form-group">
                                    <label htmlFor="commission_field">Commission</label>
                                    <input
                                        type="number"
                                        id="commission_field"
                                        className="form-control"
                                        value={commission}
                                        onChange={(e) => setCommission(e.target.value)}
                                    />
                                </div>

                            </div>

                            <div className='float-right' style={{ padding: '10px', marginBottom: "30px", border: '1px solid #d7d2d2', borderRadius: '10px' }}>
                                <div style={{ textAlign: 'center' }}>Employee Details</div>
                                <div className="form-group">
                                    <div style={{ marginBottom: '1rem' }}>
                                        <label htmlFor="commision_field">Area</label>
                                        <input
                                            type="text"
                                            id="commision_field"
                                            className="form-control"
                                            value={filteredStuff(id)?.area}
                                        />
                                    </div>

                                    <div style={{ marginBottom: '1rem' }}>
                                        <label htmlFor="commision_field">Department</label>
                                        <input
                                            type="text"
                                            id="commision_field"
                                            className="form-control"
                                            value={filteredStuff(id)?.department}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="commision_field">Designation</label>
                                        <input
                                            type="text"
                                            id="commision_field"
                                            className="form-control"
                                            value={filteredStuff(id)?.designation}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                id="login_button"
                                type='submit'
                                className="btn btn-block py-3"
                                disabled={loading ? true : false}
                            >
                                Create
                            </button>
                        </form>
                    </Fragment>
                </div>
            </div>
        </>
    )
}

export default NewCommission