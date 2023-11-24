import React, { useEffect, Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import { fetchProducts } from '../../features/products/getProductSlice';
import { MDBDataTable } from 'mdbreact'
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader';
import axios from 'axios';
import { fetchUsers } from '../../features/users/userSlice';


const ProductsList = () => {

  const [removed, setRemoved] = useState(false)
  const [wrong, setWrong] = useState('')
  const [user, setUser] = useState([])

  const {users} = useSelector( state => state.users )
  const {loading, products, error} = useSelector((state) => state.products)
  console.log('productsList:', products)
  console.log('usersList:', users)

  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])
  

  useEffect(() => {
     dispatch(fetchProducts())
  }, [dispatch])


  const matchedUser= (id) => {
      const user =  users.find((user) => user._id == id)
      return user
  }

  const deleteHandler = async (id) => {
    try {
        const {data} = await axios.delete(`/api/v1/control/product/${id}`)
        console.log('deletedProduct', data)
        setRemoved(data.success)

    } catch (error) {
        setWrong('Something went wrong!')
    }

}

useEffect(() => {
      
  if(removed) {
      alert('Product deleted successfully')
      window.location.reload()
      navigate('/admin/products/list')
  }
  if(wrong !=='') {
      alert('Something went wrong!')
  }

}, [removed, wrong])

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: 'Index',
          field: 'index',
          sort: 'asc'
        },
        {
          label: "Product's Name",
          field: 'name',
          sort: 'asc'
        },
        {
          label: 'Price',
          field: 'price',
          sort: 'asc'
        },
        {
          label: 'Address',
          field: 'address',
          sort: 'asc'
        },
        {
          label: "Seller's Name",
          field: 'seller',
          sort: 'asc'
        },
        {
          label: 'Contact',
          field: 'contact',
          sort: 'asc'
        },
        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: []
    }


    let count = 0
    products?.forEach(product => {
      const findUser = matchedUser(product?.user)
      
      data.rows.push({
        index: count++,
        name: product.name,
        price: product.price,
        address: `${product?.division}, ${product?.district}, ${product?.thana}, ${product?.municipality}, ${product?.ward}, ${product?.village}`,
        seller: findUser?.name,
        contact: findUser?.phone,

        actions: <Fragment>
          {/* <Link to={'#'} className="btn btn-primary py-1 px-2">
            <i className="fa fa-pencil"></i>
          </Link> */}
          <button className="btn btn-danger py-1 px-2 ml-2" onClick={()=> deleteHandler(product._id)}>
            <i className="fa fa-trash"></i>
          </button>
        </Fragment>

      })
    })

    return data
  }
  
  return (
    <Fragment>

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5 text-center">All Products</h1>
            {/* {window.location.reload()} */}
            { 
                < MDBDataTable
                  data={setProducts()}
                  className="px-3"
                  bordered
                  striped
                  hover />
            }

          </Fragment>
        </div>
      </div>

    </Fragment>
  )
}

export default ProductsList