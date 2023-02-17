import React, { Fragment } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUnApprovedProducts } from '../../features/products/unapprovedProductSlice'
import { approveProductAction, deleteProductAction } from '../../features/products/approveProductSlice'
import Sidebar from './Sidebar'

import { MDBDataTable } from 'mdbreact'

import { Link } from 'react-router-dom'



const UnaaprovedProducts = () => {


  const dispatch = useDispatch()
  const { products } = useSelector(state => state.unapprovedProducts)
  const { approved, deleted } = useSelector(state => state.approvedProduct)
  console.log('unapproved products', products)


  useEffect(() => {
    dispatch(fetchUnApprovedProducts());
    
  }, [dispatch])

  const approveProductHandler = (id) => {
    dispatch(approveProductAction(id))
    if (approved) {
      alert(' approved product successfully')
  }
}

const deleteProductHandler = (id) => {
    dispatch(deleteProductAction(id))
    if (deleted) {
      alert('deleted product successfully')
    }
}

  const setProduct = () => {
    const data = {
        columns: [
            {
                label: 'Product ID',
                field: 'id',
                sort: 'asc'
            },
            {
                label: 'Name',
                field: 'name',
                sort: 'asc'
            },
            {
                label: 'Price',
                field: 'price',
                sort: 'asc'
            },
            {
                label: 'Condition',
                field: 'condition',
                sort: 'asc'
            },
            // {
            //     label: 'Department',
            //     field: 'department',
            //     sort: 'asc'
            // },
            {
                label: 'District',
                field: 'district',
                sort: 'asc'
            },
            {
                label: 'Actions',
                field: 'actions',
            },
        ],
        rows: []
    }

    products?.forEach(product => {
        data.rows.push({
            id: product._id,
            name: product.name,
            price: product.price,
            condition: product.condition,
            district: product.district,
            actions: <Fragment>
              <button className="btn btn-primary py-1 px-2" onClick = {() => approveProductHandler(product._id)}>
                  <i className="fa fa-pencil"></i>
              </button>
              
              <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProductHandler(product._id)}>
                  <i className="fa fa-trash"></i>
              </button>
            </Fragment>

        })
    })

    return data;
}


  return (
    <Fragment>UnaaprovedProducts
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Pending Products</h1>

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

export default UnaaprovedProducts