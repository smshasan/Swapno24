import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
import Sidebar from '../Sidebar'

import { allStuff } from '../../../features/stuff/stuffSlice'
import axios from 'axios'

const StuffList = () => {

    
    const [removed, setRemoved] = useState(false)


    const dispatch = useDispatch();

    const { loading, stuff, error } = useSelector(state => state.stuff);
    console.log('stuff', stuff);

    useEffect(
        () => {

            dispatch(allStuff());

            if (error) {
                alert(error);
            }
 
            if(removed) {
                alert("The employee is deleted successfully");
            }

        }, [dispatch, error, removed])


        const deleteStuffHandler = (id) => {
            const {data} = axios.delete(`/api/v1/stuff/delete/${id}`)
            console.log('delete', data)
            setRemoved(data.suceess)
        }

    console.log('stuff', stuff)
    const setStuff = () => {
        const data = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Phone',
                    field: 'phone',
                    sort: 'asc'
                },
                {
                    label: 'Designation',
                    field: 'designation',
                    sort: 'asc'
                },
                {
                    label: 'Department',
                    field: 'department',
                    sort: 'asc'
                },
                {
                    label: 'Area',
                    field: 'area',
                    sort: 'asc'
                },
                {
                    label: 'Basic (Tk)',
                    field: 'basic',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        stuff?.forEach(stuf => {
            data.rows.push({
                id: stuf._id,
                name: stuf.name,
                phone: stuf.phone,
                designation: stuf.designation,
                department: stuf.department,
                area: stuf.area,
                basic: stuf.basicSalary,
                actions: <Fragment>
                    <Link to={`/stuff/${stuf._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteStuffHandler(stuf._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>

            })
        })

        return data;
    }

   

    return (
        <Fragment>
            <MetaData title={'All stuff'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5 text-center">All Stuff</h1>
                    {
                        loading? <Loader />: 
                        <MDBDataTable
                        data={setStuff()}
                        className="px-3"
                        bordered
                        striped
                        hover
                    />
                    }
                       

                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

export default StuffList