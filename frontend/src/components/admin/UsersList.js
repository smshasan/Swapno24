import React, {Fragment, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';

import { fetchUsers } from '../../features/users/userSlice';

import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';

const UsersList = () => {

    const {users} = useSelector((state) => state.users)
    console.log('data', users)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

  return (
    
    <Fragment>

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <ul>
            {users?.map((user) =>(
              <li key={user._id} > {user.name} </li>
            ))
            }
          </ul>
        </div>
      </div>

    </Fragment>
  )
}

export default UsersList