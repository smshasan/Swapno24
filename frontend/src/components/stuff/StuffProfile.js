import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMySalary } from '../../features/salary/salarySlice'
import { loadStuff } from '../../features/stuff/stuffSlice'

const StuffProfile = () => {

  const dispatch = useDispatch()
  const { loading, stuff, error } = useSelector((state) => state.stuff)
  const { salary } = useSelector((state) => state.salary)
  console.log(salary)

  useEffect(() => {
    dispatch(loadStuff())
  }, [dispatch])

  useEffect(() => {
    dispatch(getMySalary())
  }, [dispatch])

  return (
    <>
      <h1>Stuff Profile</h1>
      <div className='container'>

        <Fragment>
          <div style={{justifyContent: 'center', display: 'flex'}}>
            <figure className="avatar avatar-nav float-center" style={{ width: '10rem', height: '10rem', border: '1px solid #ccccee' }}>
              <img
                src={stuff?.avatar.url}
                alt={stuff?.name}
                className="rounded-circle"
              />
            </figure>
          </div>
        </Fragment>

        <Fragment>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
              <p>Name: {stuff?.name}</p>
              <p>Designation: {stuff?.designation}</p>
              <p>Area: {stuff?.area}</p>
              <p>Department: {stuff?.department}</p>
            </div>

            <div>
              <p>Basic Salary: Tk. {salary?.basicSalary}</p>
              <p>Commision: {salary?.commision}</p>
              <p>Total Salary: {Number(salary?.commision) + Number(salary?.basicSalary)}</p>
            </div>
          </div>
        </Fragment>
        
      </div>
    </>
  )
}

export default StuffProfile