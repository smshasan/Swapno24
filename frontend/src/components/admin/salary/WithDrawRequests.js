import React, { Fragment, useEffect } from 'react'

import Sidebar from '../Sidebar'

import { MDBDataTable } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import { salaryWithdrawRequests } from '../../../features/bank/withdrawSlice'


const WithDrawRequests = () => {

    const dispatch = useDispatch()
    const { laoding, success, withdrawRequests, error } = useSelector((state) => state.withdraw)

    console.log(withdrawRequests)

    useEffect(() => {
        dispatch(salaryWithdrawRequests())
    }, [dispatch])


    const setWithdrawRequests = () => {
        const data = {
            columns: [
                {
                    label: 'Employee ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Employee Name',
                    field: 'employeeName',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Account No',
                    field: 'accountNo',
                    sort: 'asc'
                },
                {
                    label: 'Bank Name',
                    field: 'bankName',
                    sort: 'asc'
                },
                {
                    label: 'Branch',
                    field: 'branch',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],

            rows: []
        }

        withdrawRequests?.forEach(withdraw => {
            data.rows.push({
                id: withdraw.employeeId,
                employeeName: withdraw.employeeName,
                amount: withdraw.amount,
                accountNo: withdraw.accountNumber,
                bankName: withdraw.bankName,
                branch: withdraw.branch,

                actions: <Fragment>
                    <button className="btn btn-primary py-1 px-2">
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
                        <h1 className="my-5">Salary Withdraw Requests</h1>

                        <MDBDataTable
                            data={setWithdrawRequests()}
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

export default WithDrawRequests