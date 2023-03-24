import React from 'react';
import AdminNavbar from '../adminBars/adminNavbar/AdminNavbar';
import AdminSidebar from '../adminBars/adminSidebar/AdminSidebar';
import { useNavigate } from 'react-router-dom';

import './inventory.css';
import InventoryItem from './inventory_item/inventoryItem'

const Inventory = () => {
  const navigate = useNavigate();

  const handleAddBike = () => {
    navigate('/admin/inventory/add_bike')
  }
  

  return (
        <div id='inventory_page'>
          <AdminNavbar />
          <AdminSidebar />
          <InventoryItem />
          <div id='adddiv'>
            <button className='btn btn-dark' type="submit" id='addButton' onClick={handleAddBike}> <span id='btntext'>Add more bikes</span></button>
          </div>
          
        </div>
        
    )
}

export default Inventory;