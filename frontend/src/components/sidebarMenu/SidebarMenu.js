import React, { useEffect, useState } from 'react'
import items from "../data/sidebar.json"
import SidebarMenuItem from './SidebarMenuItem'
import { getCategory } from '../../features/category/categorySlice'

import './sidebarMenu.css'
import { useDispatch, useSelector } from 'react-redux'

const SidebarMenu = ({ con, close, mobileButton }) => {
  const [status, setStatus] = useState(con)

  console.log('con', con)
  console.log('close:', close)

  const dispatch = useDispatch()
  const { categories } = useSelector(state => state.category)

  useEffect(() => {
    dispatch(getCategory())
    setStatus(con)
  }, [dispatch, con])

  const handleSidebarMenu = () => {
    const sidebarMenu = document.getElementsByClassName("mobile-sidebar")
    
    // sidebarMenu[0].style.transition = "all 5s";
    sidebarMenu[0].style.display = "none";

    mobileButton(false)

    // const mobileButton = document.getElementsByClassName("mobile-button")
    // mobileButton[0].style.display = "block";
  }

  return (
    <div className="sidebar" style={{ display: 'flex' }}>
      <div>
        {categories.map((category, index) => <SidebarMenuItem key={index} category={category} condi={status} />)}
      </div>
      {!close && 
        <div>
          <button style={{border: 'none', background: 'transparent', color: '#5f5c5c'}} onClick={handleSidebarMenu}><i className="fa fa-close"></i></button>
        </div>
      }


    </div>
  )
}

export default SidebarMenu