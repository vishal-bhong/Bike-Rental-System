import React, { useEffect } from 'react';
import axios from 'axios';

import UserNavbar from "../../userBars/userNavbar/UserNavbar";
import UserSidebar from "../../userBars/userSidebar/UserSidebar";

import './my_orders.css'


const MyOrders = () => {
    const user = JSON.parse(localStorage.getItem("userProfile"));
    
    if(!user) {
        return (
            <>
            <h1 style={{ padding: '100px 0 0 150px', fontWeight: 'bold', color: 'red' }}>Please Log in as user to see the dashboard.. </h1>
            </>
        )
    }         
    
    return (
        <>
          <UserNavbar />
          <UserSidebar />
          <div className="row">
              <div className='col-9' id='orders_dashboard'>
                   <h1 style={{fontWeight: 'lighter', color: 'blue' }}>order Section</h1>
              </div>
          </div>
        </>
    )
}

export default MyOrders;