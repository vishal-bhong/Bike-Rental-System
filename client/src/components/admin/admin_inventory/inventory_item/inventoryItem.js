import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from 'axios';

import './inventoryItem.css';

const InventoryItem = () => {
    const [ bikes, setBikes ] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/admin/getInventoryBikes')
         .then(res => {
            setBikes(res.data);
            })
            .catch((err) => {
                console.log(err);
            })         
        }, []);


    return (
         <>
         {
                    bikes.map((bike) => {

                        const handleselection = () => {                
                            navigate('/admin/inventory/item_Details', { state: bike })
                        }

                        return (
                          <>   
                              <div type="button" onClick={handleselection}>
                                  <div className="row" id="rectangular_card">
                                       <div className="col-3">
                                          <img  alt="this is bike img" src={bike?.bikeImage} id="bikeimg" />
                                       </div> 
                                       <div className="col-7">
                                          <div className="d-flex flex-column my-1">
                                              <span className="ms-0 fs-5 fw-bold">{`Model Name  - ${bike.modelName} `}</span>                        
                                              <span className="ms-0 text-secondary fs-7 fw-bold">{`Owner Name  - ${bike.fullName} `}</span>                        
                                          </div>
                                          <div>
                                              <span id='null'>{`Total km with company : ${bike?.totalKMWithCompany} with an average of ${bike?.avgWithCompany} km/lit`}</span>
                                          </div>
                                      </div>
                                      <div className="col-2" id="verified">
                                        {
                                            bike.verified ? <span className="text-success fw-bold fs-5">verified</span> : <span className="text-danger fw-bold fs-5">Unverified</span>
                                        }
                                        
                                      </div>
                                  </div>            
                              </div>     
                          </>
                        )
                        })
                    
                }
     </>
    )
}

export default InventoryItem;