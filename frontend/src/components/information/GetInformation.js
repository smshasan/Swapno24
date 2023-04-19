import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { MDBDataTable } from 'mdbreact'
import { getInformation } from '../../features/information/informationSlice'
import Sidebar from '../admin/Sidebar'


const GetInformation = () => {

  const dispatch = useDispatch()
  const {information} = useSelector(state => state.info)

  console.log('information', information)

  
  useEffect(() => {
      dispatch(getInformation())
  }, [dispatch])


  const setProduct = () => {
    const data = {
        columns: [
            {
                label: 'Name',
                field: 'name',
                sort: 'asc'
            },
            
            {
                label: 'Father',
                field: 'father',
                sort: 'asc'
            },
            {
                label: 'Mother',
                field: 'mother',
                sort: 'asc'
            },
           
            {
              label: 'Phone',
              field: 'phone',
              sort: 'asc'
          },
         
            {
                label: 'Nid',
                field: 'nid',
                sort: 'asc'
            },
            {
              label: 'Date of Birth',
              field: 'date_of_birth',
              sort: 'asc'
          },

            {
              label: 'Resident Type',
              field: 'residentType',
              sort: 'asc'
          },
          {
            label: 'Nationality',
            field: 'nationality',
            sort: 'asc'
        },
            {
                label: 'Present Address',
                field: 'presentAddress',
                sort: 'asc'
            },
            {
                label: 'Permanent Address',
                field: 'permanentAddress',
                sort: 'asc'
            },
           
            {
                label: 'Actions',
                field: 'actions',
            },
        ],
        rows: []
    }

    information?.forEach(info => {
        data.rows.push({

            name: info.name,
            father: info.fathersName,
            mother: info.mothersName,
            phone: info.phone,
            nid: info.nid,
            date_of_birth: info.dateOfBirth,
            residentType: info.residentType,
            nationality: info.nationality,
            presentAddress: info.presentAddress,
            permanentAddress: info.permanentAddress,
            
            actions: <Fragment>
              <button className="btn btn-primary py-1 px-2" >
                  <i className="fa fa-pencil"></i>
              </button>
              
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
                        <h2 className="my-5 text-center text-secondary">Information</h2>

                            <MDBDataTable
                                data={setProduct()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />

                    </Fragment>
                </div>

      </div>
    </Fragment>
  )

}

export default GetInformation