import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import './bikes.css';

import { IoAddCircleOutline } from "react-icons/io5";

const Bikes = () => {
    const user = JSON.parse(localStorage.getItem('userProfile'));

    const [ bikes, setBikes ] = useState([]);
    const [ bikeDetails, setBikeDetails ] = useState({_id: '', bikeImage: '', modelName: '', avgWithCompany: '', bikeNumber: '', aboutBike: '', totalKMWithCompany: '' });
    const [ bikeOrder, setBikeOrder ] = useState({fullName: user?.result?.name, email: user?.result?.email, userId: user?.result?._id, mobileNo: user?.result?.mobileNo, modelName: '', bikeNumber: '', bikeId: '', status: '', amountPaid: 500 });
    const navigate = useNavigate();


    useEffect(() => {
        axios.get('http://localhost:5000/user/getInventoryBikes')
         .then(res => {
            setBikes(res.data);
            })
            .catch((err) => {
                console.log(err);
            })         
        }, [bikeDetails.modelName]);


    const paymentProcess = (data) => {
        const options = {
            key: "rzp_test_ToloqmvsWNJBgl",
            amount: data.amount,
            currency: data.currency,
            name: bikeOrder.modelName,
            description: "Test Transaction",
            order_id: data.id,
            handler: async (response) => {
                try {
                    const verifyUrl = "http://localhost:5000/user/payment/verify";
                    const { data } = await axios.post(verifyUrl, { response, bikeOrder });
                    console.log(data);
                    toast.success(`Bike booked successfully`);
                    navigate('/user/dashboard/myorders');
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#3399cc",
            },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    const handleConfirmAndOrder = async () => {
        setBikeOrder({ ...bikeOrder,
            modelName : bikeDetails.modelName,
            bikeNumber: bikeDetails.bikeNumber,
            bikeId: bikeDetails._id,
            status: 'booked'
        })
        if(window.confirm(`Do you want to book "${bikeOrder.modelName}" with an amount of : ${bikeOrder.amountPaid} ?`) === true) {
                try {
                    const orderUrl = "http://localhost:5000/user/payment/order";
                    const { data } = await axios.post(orderUrl, { amount: bikeOrder.amountPaid });
                    console.log(data);
                    paymentProcess(data.data);
                } catch (error) {
                    console.log(error);
                }
        } 
      }


    return (
        <>
            
            <div className="row row-cols-2 row-cols-xl-4"> 
                {
                    bikes.map((bike) => {

                        const handleselection = () => {
                             setBikeDetails([]);
                             setBikeDetails(bike);   
                        }

                        return (
                            <>
                                <div className="my-4" type="button" onClick={handleselection} data-bs-toggle="modal" data-bs-target="#bikemodal">
                                    <div className="card" id="card">               
                                        <img  alt="this is bike image" src={bike?.bikeImage} className="card-img-top" id="bikeimg" />
                                        <div className="card-body" id='cardBody'>
                                            <div className="card-title d-flex flex-column">
                                                <span className="ms-0 text-dark fs-5 fw-bold">{bike.modelName}</span>                        
                                                <span className="ms-0 text-secondary fw-bold">{`approx. Mileage ${bike.avgWithCompany}`}</span>                        
                                            </div>
                                            <div>
                                                <span id='about_bike'>{bike.aboutBike}</span>
                                            </div>
                                        </div>
                                    </div>            
                                </div>    
                            </>
                        )
                        })
                    
                }   

                <div className="my-4">
                    <div className="card" id="custom_card">               
                        <div className="card-body d-flex flex-column align-items-center justify-content-center" >
                            <div id='circle_add_icon'>
                                <IoAddCircleOutline />
                            </div>
                            <span className='text-success fw-bold fs-6'>Adding more bikes</span>
                        </div>
                    </div>            
                </div>
            </div>


            {/* modal */}

            <div className="modal" tabIndex="-1" id='bikemodal'>
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                   <div className="modal-content">
                        <div className="modal-header">
                           <h5 className="modal-title text-info fw-bold">Bike details : </h5>
                           <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='row'>
                              <img type='button' alt="this is img" src={bikeDetails?.bikeImage} />
                              <span className='text-dark fw-semibold fs-3'>{`${bikeDetails?.modelName}`}</span>
                              <span className='text-secondary fw-bold'>{`Bike average: ${bikeDetails?.avgWithCompany} km/lit`}</span>
                              <span className='text-secondary fw-bold'>{`total km with company:  ${bikeDetails?.totalKMWithCompany} km`}</span>
                              <span className='text-secondary'>&nbsp; &nbsp; &nbsp;{`${bikeDetails?.aboutBike}`}</span>

                              <div className='d-flex justify-content-end mt-5'>
                                <button className='btn btn-outline-primary fw-bold' onClick={handleConfirmAndOrder}>&nbsp; Book Now &nbsp;</button>
                              </div>
                            </div>
                        </div>
                   </div>
                </div>
            </div>            

        </>
    )
}

export default Bikes;
