import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { getMySalary } from '../../features/salary/salarySlice'
import { getBankAccount } from '../../features/bank/bankSlice'
import { withdrawSalary } from '../../features/bank/withdrawSlice'

const WithdrawSalary = ({ stuff, balance }) => {

   
    
    console.log('balance', balance)

    const dispatch = useDispatch()
    const { bank } = useSelector((state) => state.bank)
    const { loading, success, withdraw, error } = useSelector((state) => state.withdraw)
    console.log('withdraw', withdraw)


    useEffect(() => {
        dispatch(getBankAccount())
    }, [dispatch])

    
    console.log('success', success)

    console.log('bank', bank)

    const submitHandler = (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.set('employeeId', stuff?._id)
        formData.set('employeeName', stuff?.name)
        formData.set('amount', balance)
        formData.set('accountNumber', bank?.accountNumber)
        formData.set('bankName', bank?.bankName)
        formData.set('branch', bank?.branch)

        dispatch(withdrawSalary(formData))

    }

    return (
        <>
            <div className="wrapper col-12 col-lg-12 col-md-12" style={{marginTop: 0}}>
                
                <form onSubmit={submitHandler} encType='multipart/form-data'>

                    <h2 className="mb-4">Withdraw Salary</h2>
                    <div className="form-group">
                        <label htmlFor="amount_field">Amount</label>
                        <input
                            type="text"
                            id="amount_field"
                            className="form-control"
                            value={balance}

                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bank_field">Bank Name</label>
                        <input
                            type="text"
                            id="bank_field"
                            className="form-control"
                            value={bank?.bankName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="branch_field">Branch</label>
                        <input
                            type="text"
                            id="branch_field"
                            className="form-control"
                            value={bank?.branch}
                        />
                    </div>
                    <button
                        id="login_button"
                        type='submit'
                        className="btn btn-block py-3"
                        disabled={loading ? true : false}
                    >
                        Withdraw
                    </button>
                </form>
            </div>
        </>
    )
}

export default WithdrawSalary