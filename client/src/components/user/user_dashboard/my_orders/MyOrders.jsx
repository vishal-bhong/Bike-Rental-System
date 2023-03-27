import React, { useEffect } from 'react';
import axios from 'axios';

import UserNavbar from "../../userBars/userNavbar/UserNavbar";
import UserSidebar from "../../userBars/userSidebar/UserSidebar";

import './my_orders.css'


const MyOrders = () => {
    const user = JSON.parse(localStorage.getItem("userProfile"));
    const [ orders, setOrders ] = React.useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/user/get_Myorders/${user?.result?._id}`)
        .then((res) => {
            setOrders(res.data)
        })
        .catch((err) => {
            console.log(err)
        });
    }, []);
    
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
                  <div>

                  {
                     orders.map((order) => {
                         return (
                             <>                               
                                <span> Bike Model Name : {order.modelName}</span> <br />
                                <span> mobile no : {order.mobileNo}</span> <br />
                                <span>Provided email : {order.email}</span> <br /> <br />
                                <span> Amount Paid : {order.amountPaid}</span> <br />
                                <br />
                               <div className='d-flex align-items-center justify-content-center fw-bold rounded' id='statusField'>{order.status}</div> <hr />
                             </>
                         )
                        })
                    } 
                  </div>
              </div>
          </div>
        </>
    )
}

export default MyOrders;