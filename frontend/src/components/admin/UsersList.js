import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers } from '../../features/users/userSlice';

import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';

import { MDBDataTable } from 'mdbreact'
import { Link } from 'react-router-dom';
import Loader from '../layout/Loader';

const UsersList = () => {

  const {loading, users, error } = useSelector((state) => state.users)
  console.log('data', users)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])


  const setUser = () => {
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
          label: 'Address',
          field: 'address',
          sort: 'asc'
        },
        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: []
    }

    users?.forEach(user => {
      data.rows.push({
        id: user._id,
        name: user.name,
        phone: user.phone,
        address: `${user.division}, ${user.district}, ${user.thana}, ${user.municipality}, ${user.ward}, ${user.village}`,

        actions: <Fragment>
          <Link to={'#'} className="btn btn-primary py-1 px-2">
            <i className="fa fa-pencil"></i>
          </Link>
          <button className="btn btn-danger py-1 px-2 ml-2">
            <i className="fa fa-trash"></i>
          </button>
        </Fragment>

      })
    })

    return data;
  }

  return (

    <Fragment>

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5 text-center">All Users</h1>
            {
              loading ? <Loader /> :
                < MDBDataTable
                  data={setUser()}
                  className="px-3"
                  bordered
                  striped
                  hover />
            }
          </Fragment>
        </div>
      </div>

    </Fragment>
  )
}

export default UsersList