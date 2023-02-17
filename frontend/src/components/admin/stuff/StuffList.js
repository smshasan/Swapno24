import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
import Sidebar from '../Sidebar'

//import { useAlert } from 'react-alert'

import { loadUser } from '../../../features/users/authSlice'
import { allStuff } from '../../../features/stuff/stuffSlice'

const StuffList = () => {
    const dispatch = useDispatch(); 
    
    // const { user, loading } = useSelector(state => state.auth)
    const {loading,   stuff, error, } = useSelector(state => state.stuff);
    console.log('stuff', stuff);
     //const alert = useAlert();
    

    useEffect(
        () => {
       
        //  dispatch(loadUser())
        dispatch(allStuff());

        if (error) {
            alert(error);
        }

        // if (isDeleted) {
        //     alert('User deleted successfully');
        //     history.push('/admin/users');
        //     dispatch({ type: DELETE_USER_RESET })
        // }

    }, [dispatch, error])

    // const deleteUserHandler = (id) => {
    //     dispatch(deleteUser(id))
    // }
    
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
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        stuff?.forEach(stuff => {
            data.rows.push({
                id: stuff._id,
                name: stuff.name,
                phone: stuff.phone,
                designation: stuff.designation,
                department: stuff.department,
                area: stuff.area,
                actions: <Fragment>
                    <Link to={`/#`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" >
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>

            })
        })

        return data;
    }


    return (
        <Fragment>
            stuff
            <MetaData title={'All stuff'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Stuff</h1>

                            <MDBDataTable
                                data={setStuff()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />

                    </Fragment>
                </div>
            </div>
            {stuff?.map(st => <p>{st.name}</p>)}
            
                
            

        </Fragment>
    )
}

export default StuffList