import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Collapse } from 'react-bootstrap'

import MetaData from '../layout/MetaData'

import { getCategory } from '../../features/category/categorySlice'
import { newProduct } from '../../features/products/newProductSlice'

import { divisions, thanas } from '../Location'


const filteredDistricts = (div) => {
    const districts = divisions.find(division => division.name === div)
    return districts
}

const filteredThana = (div) => {
    const thana = thanas.find(ps => ps.name === div)
    return thana
}

const NewProduct = ({ history }) => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [condition, setCondition] = useState('used')
    const [shopCategory, setShopCategory] = useState('Retail')
    const [description, setDescription] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])

    const [category, setCategory] = useState("")
    const [subCategory, setSubCategory] = useState("")

    const [open, setOpen] = useState(false)

    const [division, setDivision] = useState('')
    const [district, setDistrict] = useState('')
    const [thana, setThana] = useState('')
    const [union, setUnion] = useState('')
    const [ward, setWard] = useState(0)
    const [village, setVillage] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { categories } = useSelector((state) => state.category)
    const { loading, error, success } = useSelector((state) => state.newProducts)

    console.log('catgories: ', categories)

    useEffect(() => {

        dispatch(getCategory())

        if (error) {
            alert(error)
        }
        if (success) {
            alert('Product created successfully')
        }

    }, [dispatch, error, success])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.set('name', name)
        formData.set('price', price)
        formData.set('condition', condition)
        formData.set('shopCategory', shopCategory)
        formData.set('description', description)
        formData.set('category', subCategory)

        formData.set('division', division)
        formData.set('district', district)
        formData.set('thana', thana)
        formData.set('municipality', union)
        formData.set('ward', ward)
        formData.set('village', village)

        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(newProduct(formData))
    }

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

    console.log('category', category)

    const subCategoryFiltered = (cats) => {

        const filteredCategory = categories.filter(c => c.name === cats)
        return filteredCategory
    }
    console.log('subCategoryFiltered', subCategoryFiltered(category))

    console.log('subCategory', subCategory)
    console.log(divisions)

    return (
        <>
            <MetaData title={'New Product'} />
            <div className="container">
                <Fragment>
                    <div className='row'>

                        <div className="wrapper col-12 col-lg-12 col-md-12 my-5" >
                            <form onSubmit={submitHandler} encType='multipart/form-data' style={{ width: '1000px' }}>
                                <h2 style={{ textAlign: 'center', marginBottom: '45px' }}>Post your product</h2>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'start' }}><h4 style={{ width: 'fit-content', marginBottom: '30px', borderBottom: '2px solid rgb(249, 144, 8)' }}>Set Product Details</h4></div>
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
                                            <label htmlFor="shop_field">Shop Category</label>
                                            <select
                                                className="form-control"
                                                id="shop_field"
                                                value={shopCategory}
                                                onChange={(e) => setShopCategory(e.target.value)}
                                            >

                                                <option value="retail">Retail</option>
                                                <option value="wholeSale">Wholesale</option>
                                                <option value="manufacturer">Manufacturer</option>
                                            </select>

                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="category_field">Category</label>
                                            <select
                                                className="form-control"
                                                id="category_field"
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                            >

                                                {categories.map((category) => (
                                                    <option key={category._id} value={category.name}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className='form-group'>
                                            <label htmlFor="subCategory_field">Sub Category</label>
                                            <select
                                                type="text"
                                                className="form-control"
                                                id="subCategory_field"
                                                value={subCategory}
                                                onChange={(e) => setSubCategory(e.target.value)}
                                            >
                                                <option>Select</option>
                                                {
                                                    subCategoryFiltered(category)[0]?.children?.map(subCat => (
                                                        <option key={subCat._id} value={subCat._id}>{subCat.name}</option>
                                                    ))
                                                }
                                            </select>
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
                                            {/* <label>Images</label> */}

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

                                    </div>

                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'start' }}><h4 style={{ width: 'fit-content', marginBottom: '30px', borderBottom: '2px solid rgb(249, 144, 8)' }}>Set Your Location</h4></div>
                                        <div id="example-collapse-text">

                                            <div className="form-group">
                                                <label htmlFor="district_field">Division: </label>
                                                <select
                                                    type="text"
                                                    id="division_field"
                                                    className="form-control"
                                                    value={division}
                                                    onChange={(e) => setDivision(e.target.value)}
                                                >
                                                    < option value="select">select</option>
                                                    <option value="Barishal">Barishal</option>
                                                    <option value="Chottogram">Chottogram</option>
                                                    <option value="Dhaka">Dhaka</option>
                                                    <option value="Khulna">Khulna</option>
                                                    <option value="Mymensingh">Mymensingh</option>
                                                    <option value="Rajshahi">Rajshahi</option>
                                                    <option value="Rangpur">Rangpur</option>
                                                    <option value="Sylhet">Sylhet</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="district_field">District: </label>
                                                <select
                                                    type="text"
                                                    id="district_field"
                                                    className="form-control"
                                                    value={district}
                                                    onChange={(e) => setDistrict(e.target.value)}

                                                >   <option>select</option>
                                                    {filteredDistricts(division)?.districts.map((dist, index) => (
                                                        <option key={index} value={dist}>{dist}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="thana_field">Thana: </label>
                                                <select
                                                    type="text"
                                                    id="thana_field"
                                                    className="form-control"
                                                    value={thana}
                                                    onChange={(e) => setThana(e.target.value)}
                                                >

                                                    {filteredThana(district)?.thana.map((dist, index) => (
                                                        <option key={index} value={dist}>{dist}</option>
                                                    ))}

                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="union_field">Union: </label>
                                                <input
                                                    type="text"
                                                    id="union_field"
                                                    className="form-control"
                                                    value={union}
                                                    onChange={(e) => setUnion(e.target.value)}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="ward_field">Ward No: </label>
                                                <input
                                                    type="text"
                                                    id="ward_field"
                                                    className="form-control"
                                                    value={ward}
                                                    onChange={(e) => setWard(e.target.value)}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="village_field">Village: </label>
                                                <input
                                                    type="text"
                                                    id="village_field"
                                                    className="form-control"
                                                    value={village}
                                                    onChange={(e) => setVillage(e.target.value)}
                                                />
                                            </div>

                                        </div>
                                        {/* </Collapse> */}

                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <button
                                        style={{ width: '200px', marginTop: 0 }}
                                        id="login_button"
                                        type="submit"
                                        className="btn btn-block py-3"
                                        disabled={loading ? true : false}
                                    >
                                        CREATE
                                    </button>
                                </div>



                            </form>
                        </div>
                    </div>
                </Fragment>
            </div>
        </>
    )
}

export default NewProduct