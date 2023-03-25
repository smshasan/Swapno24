import React, { useEffect, useState } from 'react'
import items from "../data/sidebar.json"
import SidebarMenuItem from './SidebarMenuItem'
import { getCategory } from '../../features/category/categorySlice'

import './sidebarMenu.css'
import { useDispatch, useSelector } from 'react-redux'

const SidebarMenu = ({con}) => {
  const [status, setStatus] = useState(con)
  console.log('con', con)

  const dispatch = useDispatch()
  const {categories} = useSelector(state => state.category)

  useEffect(() => {
    dispatch(getCategory())
    setStatus(con)
  }, [dispatch, con])

  return (
    <div className="sidebar">
          { categories.map((category, index) => <SidebarMenuItem key={index} category={category} condi={status} />) }
        </div>
  )
}

export default SidebarMenu