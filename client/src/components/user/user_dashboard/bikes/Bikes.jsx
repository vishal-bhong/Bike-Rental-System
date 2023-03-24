import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import './bikes.css';

import { IoAddCircleOutline } from "react-icons/io5";

const Bikes = () => {
    const [ bikes, setBikes ] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        axios.get('http://localhost:5000/user/getInventoryBikes')
         .then(res => {
            setBikes(res.data);
            })
            .catch((err) => {
                console.log(err);
            })         
        }, []);


    return (
        <>
            
            <div className="row row-cols-2 row-cols-xl-4"> 
            {
                    bikes.map((bike) => {

                        const handleselection = () => {
                            // setSelectedPizzaVarieties([...selectedPizzaVarieties, pizzaVariety.name ]);
                            // setSelectedPizzaCosts([...selectedPizzaCosts, pizzaVariety.cost ]);
                            toast.success(`you selected ${bike.modelName}`) 
                            
                        }

                        return (
                            <>
                                <div className="my-4" type="button" onClick={handleselection} data-bs-toggle="modal" data-bs-target="#bikemodal">
                                    <div className="card" id="card">               
                                        <img  alt="this is bike image" src={bike?.bikeImage} className="card-img-top" id="bikeimg" />
                                        <div className="card-body" id='cardBody'>
                                            <div className="card-title d-flex flex-column">
                                                <span className="ms-0 text-info fs-5 fw-bold">{bike.modelName}</span>                        
                                                <span className="ms-0 text-info fs-7 fw-bold">{`approx. Mileage ${bike.bikeAverage}`}</span>                        
                                            </div>
                                            <div>
                                                <span id='pizzaVariety_message'>{bike.aboutBike}</span>
                                            </div>
                                        </div>
                                    </div>            
                                </div> 
                                
                                //modal
                                <div className="modal" tabIndex="-1" id='bikemodal'>
                                    <div className="modal-dialog modal-dialog-centered">
                                       <div className="modal-content">
                                            <div className="modal-header">
                                               <h5 className="modal-title text-info fw-bold">Bike details : </h5>
                                               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                            <img type='button' alt="this is img" src={bike?.bikeImage} />
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

        </>
    )
}

export default Bikes;
