import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { getCategory } from '../../features/category/categorySlice'
import { newProduct } from '../../features/products/newProductSlice'

const NewProduct = ({ history }) => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [condition, setCondition] = useState('used')
    const [description, setDescription] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])

    
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const {categories} = useSelector((state) => state.category)
    const {loading, error, success} = useSelector((state) => state.newProducts)

    console.log('catgories: ', categories)


    useEffect(() => {

        dispatch(getCategory())

        if(error) {
            alert(error)
        }

        if(success) {
            alert('Product created successfully')
        }

    }, [dispatch, error, success])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.set('name', name)
        formData.set('price', price)
        formData.set('condition', condition)
        formData.set('description', description)
        formData.set('category', categoryId)

        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(newProduct(formData))
    }
    console.log('newProduct', newProduct)
    const onChange = (e) => {
        const files = Array.from(e.target.files)

        setImagesPreview([])
        setImages([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }

    const createCategoryList = (categories, options =[]) => {
        for(let category of categories) {
            options.push({
                value: category._id,
                name: category.name,
                // parentId: category.parentId,
                // type: category.type
            })

            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }

        return options
    }


  return (
    <Fragment>
            <MetaData title={'New Product'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">New Product</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price_field">Price</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="condition_field">Condition</label>
                                     <select
                                        className="form-control"
                                        id="condition_field"
                                        value={condition}
                                        onChange={(e) => setCondition(e.target.value)}
                                    >
                                        <option>select condition</option>
                                        <option value="used">used</option>
                                        <option value="new">new</option>
                                    </select>
                                   
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category_field">Category</label>
                                     <select
                                        className="form-control"
                                        value={categoryId}
                                        onChange={(e) => setCategoryId(e.target.value)}
                                    >
                                        <option>select category</option>
                                            {createCategoryList(categories).map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.name}
                                            </option>
                                            ))}
                                    </select>
                                    {/* <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>
                                        {categories.map(category => (
                                            <option key={category} value={category} >{category}</option>
                                        ))}

                                    </select> */}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea 
                                        className="form-control" 
                                        id="description_field" 
                                        rows="8" 
                                        value={description} 
                                        onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>
                                
                                <div className='form-group'>
                                    <label>Images</label>

                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='product_images'
                                            className='custom-file-input'
                                            id='customFile'
                                            onChange={onChange}
                                            multiple
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Images
                                     </label>
                                    </div>

                                    {imagesPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                    ))}

                                </div>

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    CREATE
                                </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
  )
}

export default NewProduct