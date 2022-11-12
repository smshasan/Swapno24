import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Container, Row, Col, Modal, Button } from "react-bootstrap";


import MetaData from "../../layout/MetaData";
import Sidebar from "../Sidebar";

import {createCategory, getCategory} from "../../../features/category/categorySlice";

import Input from "./Input";


// import "react-checkbox-tree/lib/react-checkbox-tree.css";

// import './style.css';
import { Fragment } from "react";
import shortid from "shortid";
import { setAutoFreeze } from "immer";


/**
 * @author
 * @function Category
 **/

const Category = (props) => {
  const {categories} = useSelector((state) => state.category);

  console.log('category', categories);

  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  // const [fid, setFid] = useState("");
  // const [categoryImage, setCategoryImage] = useState("");
  const [images, setImages] = useState([]);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(`Category.js`);
    console.log(getCategory);
    dispatch(getCategory());
  }, [dispatch]);

  const handleClose = () => {
    const form = new FormData();

    form.append('name', categoryName);
    form.append('parentId', parentCategoryId);
    // form.append('fid', fid)
    
     images.forEach(image => {
            form.append('images', image)
     })
    
    dispatch(createCategory(form));

   

    setShow(false);
  };

  const handleShow = () => setShow(true);


  const onChange = e => {

        const files = Array.from(e.target.files)

        // setImagesPreview([]);
        setImages([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    // setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }




  const renderCategories = (categories) => {
    let myCategoriess = [];
    for (let category of categories) {
      myCategoriess.push(
        <li key={category.name}>
          {category.name}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myCategoriess;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        // parentId: category.parentId,
        // type: category.type
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };
  console.log('createCategoryList', createCategoryList);


  // const createFid = async (categories, options= []) => {
  //   for (let category of categories) {

  //     if(category.parentId.length === 0) {
       
  //       const id =  await shortid.generate()
  //       console.log('shortid:', id)
  //         setFid(id)
  //     }
  //       // else {
          

  //       // } 

  //     }
  //   }
  


  return (
    <Fragment>

      <div className="row">
          <div className="col-12 col-md-2"> <Sidebar /></div>
        <div className="col-12 col-md-8">
            <ul>
              {renderCategories(categories)}
              {/* {JSON.stringify(createCategoryList(category.categories))} */}
            </ul>
        </div>
        <div className="col-12 col-md-2">
            <button onClick={handleShow}>Add</button>
        </div>
      </div>



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            value={categoryName}
            placeholder={`Category Name`}
            onChange={(e) => setCategoryName(e.target.value)}
          />

          <select
            className="form-control"
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)
            }
                      >
            <option>select category</option>
            {createCategoryList(categories).map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>

          <input
            type="file"
            name="images"
            // onChange={handleCategoryImage}
            onChange={onChange}
            multiple
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>

  )
}

export default Category;
