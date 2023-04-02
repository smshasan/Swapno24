import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'

import { getMySalary } from '../../features/salary/salarySlice'
import { loadStuff } from '../../features/stuff/stuffSlice'

import { useDispatch, useSelector } from 'react-redux'

import AddBankAccount from './AddBankAccount'
import WithdrawSalary from './WithdrawSalary'
import { getMyCommission } from '../../features/commission/commissionSlice'

const StuffProfile = () => {

  const [withdrawStatus, setWithdrawStatus] = useState(true)
  const [employee, setEmployee] = useState([])
  const [balance, setBalance] = useState(0)

  const dispatch = useDispatch()
  const { stuff, error } = useSelector((state) => state.stuff)
  const {commission} = useSelector((state) => state.commission)
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
      dispatch(getMyCommission())
  }, [dispatch])
  

  useEffect(() => {
    dispatch(getMySalary())
  }, [dispatch])


  useEffect(() => {

    const withdrawRequest = async () => {
      try {
        const { data } = await axios.get('/api/v1/salary/withdraw/request')
        setWithdrawStatus(data?.withdraw?.withdrawStatus)

        console.log('withdrawRequest', data)
      } catch (error) {
        console.log(error)
      }
    }
    withdrawRequest()
  }, [loading])

  useEffect(() => {
    setBalance(salary?.totalSalary)
  }, [salary?.totalSalary])

 

  console.log('withdrawStatus', withdrawStatus)
  console.log(stuff)
  console.log('commission', commission)
  console.log("salary", salary)
  console.log('bank:', bank)
  console.log('balance', balance)

  return (
    <>
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
              }

              <p>Balance: Tk. {salary?.totalSalary}</p>
              <p>Basic Salary: Tk. {employee?.basicSalary}</p>
              {
                commission?.map((comm, index) => {
                  return  <p key={index}>Commision: Tk. {comm.commission}</p>
                })
              }
             
              {
                balance > 0 ? <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#withdrawModal">
                  Withdraw
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