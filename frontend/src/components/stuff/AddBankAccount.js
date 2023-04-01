
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addBankAccount } from '../../features/bank/bankSlice'

const AddBankAccount = ({stuff}) => {

    const [accountNumber, setAccountNumber] = useState('')
    const [bankName, setBankName] = useState('')
    const [branch, setBranch] = useState('')

   
    const dispatch = useDispatch()
    const { loading, success, bank, error } = useSelector((state) => state.bank)

    console.log('bank', bank)
    console.log("stuff", stuff)

    
    useEffect(() => {
      if(success) 
        alert("Bank Account added Successfully")
    }, [success])
    

    const submitHandler = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.set('accountNumber', accountNumber)
        formData.set('bankName', bankName)
        formData.set('branch', branch)
        formData.set('employeeId', stuff._id)

        dispatch(addBankAccount(formData))
        
    }

    return (
        <>
            <div className="wrapper col-12 col-lg-12 col-md-12" style={{marginTop: 0}}>
                <form onSubmit={submitHandler} encType='multipart/form-data'>

                    <h2 className="mb-4">Add Bank Account</h2>
                    <div className="form-group">
                        <label htmlFor="account_field">Account Number</label>
                        <input
                            type="text"
                            id="account_field"
                            className="form-control"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bank_field">Bank Name</label>
                        <input
                            type="text"
                            id="bank_field"
                            className="form-control"
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="branch_field">Branch</label>
                        <input
                            type="text"
                            id="branch_field"
                            className="form-control"
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                        />
                    </div>
                    <button
                        id="login_button"
                        type='submit'
                        className="btn btn-block py-3"
                        disabled={loading ? true : false}
                    >
                        Add
                    </button>
                </form>
            </div>
        </>
    )
}

export default AddBankAccount