import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HiUserCircle, HiOutlineMail } from "react-icons/hi";
import { BsTelephone } from "react-icons/bs";
import { RiMotorbikeFill } from "react-icons/ri";

import { toast } from 'react-toastify'


import './orderDetails.css';


const SectionThree = () => {
    const [ allOrders, setAllOrders ] = useState([]);
    const [ orderDetails, setOrderDetails ] = useState([]);

    useEffect(() => {
      axios.get(`http://localhost:5000/admin/get_orders`)
      .then((res) => {
        setAllOrders(res.data)
      })
      .catch((err) => {
          console.log(err)
      });
    },[]);

    const handleOrderDelete = (order) => {
      axios.delete(`http://localhost:5000/admin/deleteOrder/${orderDetails._id}`)
       .then((res) => toast.success(res.data.message) )
       .catch((err) => console.log(err))
    }

    return (
        <>
          <div className='overflow-auto' id='sectionTh'>
            <div className='position-fixed bg-secondary'>
              <span className='row h4 text-white px-4 pt-2 fw-bold' id='custom_title'>Orders Details </span>
            </div>             
            <div className="row mt-5 pt-4 ms-1">
              <div className='col' id='orders_section'>
                  <div>

                  {
                     allOrders.map((order) => {

                           const handleOrderDelete = () => {
                             axios.delete(`http://localhost:5000/admin/deleteOrder/${order._id}`)
                              .then((res) => toast.success(res.data.message) )
                              .catch((err) => console.log(err))
                            }
                            
                            const handleOpenModal = () => {
                              console.log(order.userId)
                              console.log(order._id)
                              console.log(order.bikeId)
                             axios.get(`http://localhost:5000/admin/get/orderDetails/${order._id}/${order.userId}/${order.bikeId}`)
                              .then((res) => setOrderDetails(res.data) )
                              .catch((err) => console.log(err))

                              console.log(orderDetails)
                           }

                         return (
                             <>  
                              <div data-bs-toggle="modal" data-bs-target="#orderdetails" onClick={handleOpenModal}>
                                <div className='row'>
                                   <div className='col-1'>
                                     <h2 id='userIcon'> <HiUserCircle /> </h2>
                                   </div>
                                   <div className='col-11 pt-1'>
                                     <span className='fs-4'>{order.fullName} </span> <br />  
                                     <span> <BsTelephone /> {order.mobileNo} </span> <br />
                                     <span> <HiOutlineMail /> {order.email}</span> <br />
                                   </div>
                                </div> 

                                <div className='row mt-3'>
                                  <div className='col-1'>
                                    <h2><RiMotorbikeFill /></h2>
                                  </div>
                                  <div className='col-11 pt-2'>
                                     <span className='fs-5 ps-2'> {order.modelName}</span> <br />
                                     <span className='ps-3'>Bike No : {order.bikeNumber}</span> <br />
                                  </div>
                                </div> 

                                <div className='d-flex flex-row flex-row-reverse mt-3'>
                                  <div type='button' className='d-flex align-items-center justify-content-center fw-bold btn btn-outline-danger rounded me-2' id='orderBtn' onClick={handleOrderDelete}>delete</div>
                                  <div className='d-flex align-items-center justify-content-center fw-bold btn btn-info rounded me-2' id='orderBtn'>{order.status}</div>
                                </div>
                                <hr />
                               </div>
                             </>
                         )
                        })
                    } 
                  </div>
              </div>
          </div>

          </div> 


         {/* modal */}

          <div className="modal" tabIndex="-1" id='orderdetails'>
              <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                 <div className="modal-content">
                      <div className="modal-header">
                         <h5 className="modal-title text-info fw-bold">Order details : </h5>
                         <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                          <div className='row'>
                              <div className='col-1'>
                                <h2 id='userIcon'> <HiUserCircle /> </h2>
                              </div>
                              <div className='col-7 pt-1'>
                                <span className='fs-4'>{orderDetails._doc.fullName} </span> <br />  
                                <span> <BsTelephone /> {orderDetails._doc.mobileNo} </span> <br />
                                <span> <HiOutlineMail /> {orderDetails._doc.email}</span> <br />
                              </div>
                              <div className='col-4'>
                                <span>Adhar Image :</span>
                                <img  alt="this is bike image" src={orderDetails?.adharCardImage} className="card-img-top" id="bikeimg" />
                                <img  alt="this is bike image" src={orderDetails?.bikeImage} className="card-img-top" id="bikeimg" />
                              </div>
                            <span className='text-dark fw-semibold fs-3'>{`${orderDetails?.modelName}`}</span>
                            <span className='text-secondary fw-bold'>{`Bike average: ${orderDetails?.avgWithCompany} km/lit`}</span>
                            <span className='text-secondary fw-bold'>{`total km with company:  ${orderDetails?.totalKMWithCompany} km`}</span>
                            <span className='text-secondary'>&nbsp; &nbsp; &nbsp;{`${orderDetails?.aboutBike}`}</span>
                            <div className='d-flex justify-content-end mt-5'>
                              <button className='btn btn-outline-primary fw-bold' onClick={handleOrderDelete}>&nbsp; Delete &nbsp;</button>
                            </div>
                          </div>
                      </div>
                 </div>
              </div>
          </div> 
        </>
    )
}

export default SectionThree;