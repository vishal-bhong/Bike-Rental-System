import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import './bikes.css';

import { IoAddCircleOutline } from "react-icons/io5";

const Bikes = () => {
    const [ bikes, setBikes ] = useState([]);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("userProfile"));

    useEffect(() => {
        axios.get('http://localhost:5000/user/getInvestedBikes')
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
                                <div className="my-4" type="button" onClick={handleselection}>
                                    <div className="card" id="card">               
                                        <img  alt="this is pizza variety" src={bike?.bikeImage} className="card-img-top" id="bikeimg" />
                                        <div className="card-body">
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
