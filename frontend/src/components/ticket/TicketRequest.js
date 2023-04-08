
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllTicket } from '../../features/ticket/ticketSlice';

import { MDBDataTable } from 'mdbreact';
import Sidebar from '../admin/Sidebar';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';

const TicketRequest = () => {

  const dispatch = useDispatch(); 
    
    // const { user, loading } = useSelector(state => state.auth)
    const {loading,success, ticket, error } = useSelector(state => state.ticket);

    useEffect(() =>{
      dispatch(getAllTicket())
    },[dispatch])


  const setTicket = () => {
    const data = {
        columns: [
            
            {
                label: 'From',
                field: 'from',
                sort: 'asc'
            },
            {
                label: 'To',
                field: 'to',
                sort: 'asc'
            },
            {
                label: 'Depart Date',
                field: 'departDate',
                sort: 'asc'
            },
            {
                label: 'Return Date',
                field: 'returnDate',
                sort: 'asc'
            },
            {
                label: 'Car Name',
                field: 'carName',
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
                label: 'Email',
                field: 'email',
                sort: 'asc'
            },
            {
                label: 'Actions',
                field: 'actions',
            },
        ],
        rows: []
    }

    ticket?.forEach(ticket => {
        data.rows.push({
            from: ticket.from,
            to: ticket.to,
            departDate: ticket.departDate,
            returnDate: ticket.returnDate,
            carName: ticket.carName,
            name: ticket.name,
            phone: ticket.phone,
            email: ticket.email,
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

    return data
}


  return (
    <Fragment>
            <MetaData title={'Ticket Requests'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5 text-center mt-20">Ticket Requests</h1>

                            <MDBDataTable
                                data={setTicket()}
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

export default TicketRequest