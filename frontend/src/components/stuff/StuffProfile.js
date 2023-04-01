import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'

import { getMySalary } from '../../features/salary/salarySlice'
import { loadStuff } from '../../features/stuff/stuffSlice'

import { useDispatch, useSelector } from 'react-redux'

import AddBankAccount from './AddBankAccount'
import WithdrawSalary from './WithdrawSalary'

const StuffProfile = () => {

  const [withdrawStatus, setWithdrawStatus] = useState(true)
  const [employee, setEmployee] = useState([])
  const [balance, setBalance] = useState(0)

  const dispatch = useDispatch()
  const { stuff, error } = useSelector((state) => state.stuff)
  const { salary } = useSelector((state) => state.salary)
  const { loading, bank } = useSelector((state) => state.bank)

  useEffect(() => {
    dispatch(loadStuff())
  }, [dispatch, loading])

  useEffect(() => {
    setEmployee(stuff)
  }, [stuff])

  console.log('employee:', employee)

  useEffect(() => {
    dispatch(getMySalary())
  }, [dispatch])

  var mySalary = Number(salary?.commision) + Number(salary?.basicSalary)

  useEffect(() => {

    const withdrawRequest = async () => {
      try {
        const { data } = await axios.get('/api/v1/salary/withdraw/request')
        setWithdrawStatus(data?.withdraw?.withdrawStatus)

        // console.log('effectSalary', mySalary)
        console.log('withdrawRequest', data)
      } catch (error) {
        console.log(error)
      }
    }
    withdrawRequest()
  }, [loading])

  useEffect(() => {
    setBalance(mySalary)
  }, [mySalary])

 

  console.log('withdrawStatus', withdrawStatus)
  console.log(stuff)
  console.log(salary)
  console.log('bank:', bank)
  console.log('mySalary', mySalary)
  console.log('balance', balance)

  return (
    <>
      {/* <h1>Stuff Profile</h1> */}
      <div className='container'>

        <Fragment>
          <div style={{ justifyContent: 'center', display: 'flex' }}>
            <figure className="avatar avatar-nav float-center" style={{ width: '10rem', height: '10rem', border: '1px solid #ccccee' }}>
              <img
                src={employee?.avatar?.url}
                alt={employee?.name}
                className="rounded-circle" />
            </figure>
          </div>
        </Fragment>

        <Fragment>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <p>Name: {employee?.name}</p>
              <p>Designation: {employee?.designation}</p>
              <p>Area: {employee?.area}</p>
              <p>Department: {employee?.department}  </p>
            </div>

            <div>

              {
                withdrawStatus === false &&
                <div className='salary' >
                  <strong>Withdraw Status: </strong> Pending...
                  <p> It will take 7 working days<br></br> to make transaction</p>
                </div>

                // withdrawCheck()

              }

              <p>Balance: Tk. {balance}</p>
              <p>Basic Salary: Tk. {salary?.basicSalary}</p>
              <p>Commision: Tk. {salary?.commision}</p>

              {
                balance > 0 ? <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#withdrawModal">
                  Add Bank
                </button> : <button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Tooltip on top">
                  You don't have balance to withdraw.
                </button>
              }

            </div>
          </div>
        </Fragment>

        <Fragment>

          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" >
            Add Bank
          </button>

          <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body" style={{ padding: 0 }}>
                  <AddBankAccount stuff={employee} />
                </div>
              </div>
            </div>
          </div>

        </Fragment>

        <Fragment>

          <div className="modal fade" id="withdrawModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body" style={{ padding: 0 }}>
                  <WithdrawSalary stuff={employee} balance={balance} bank={bank} />
                </div>
              </div>
            </div>
          </div>
        </Fragment>

      </div>
    </>
  )
}

export default StuffProfile