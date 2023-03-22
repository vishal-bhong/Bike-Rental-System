import React from "react";
import { useLocation } from "react-router-dom";

import './itemDetails.css';

const ItemDetails = () => {
    const location = useLocation();
    const bike = location.state;

    return (
        <div id="detail_page">
            <h3 className="mx-2 mt-2 mb-3 fw-bold">Bike Info :</h3>
            <div className="row" id="block1">
                <div className="col-3">
                     <img  alt="this is bike img" src={bike?.bikeImage} id="detailed_image1" />
                </div> 
                <div className="col-9 ps-3">
                     <div className="d-flex flex-column my-3">
                         <span className="fs-5 fw-bold">{`Model Name  - ${bike.modelName} `}</span>                        
                         <span className="text-secondary fs-7 fw-bold">{`Bike Number  - ${bike.bikeNumber} `}</span>                        
                     </div>
                     <div>
                         <span>{bike?.aboutBike}</span>
                     </div>
                </div>
             </div>

            <h3 className="mx-2 mt-5 mb-3 fw-bold">Owner Info :</h3>
            <div className="row" id="block1">
                <div className="col-3">
                     <img  alt="this is bike img" src={bike?.adharCardImage} id="detailed_image2" />
                </div> 
                <div className="col-9 ps-3">
                     <div className="d-flex flex-column my-3">
                         <span className="fs-5 fw-bold">{`Owner Name  - ${bike.fullName} `}</span>                        
                         <span className="text-secondary fs-7 fw-bold">{`Mobile Number  - ${bike.mobileNo} `}</span>                        
                         <span className="text-secondary fs-7 fw-bold">{`Email Id  - ${bike.email} `}</span>                        
                     </div>
                </div>
             </div>

            <h3 className="mx-2 mt-5 mb-3 fw-bold">Documents :</h3>
            <div className="row" id="documents">
                <div className="col-4">
                     <img  alt="this is bike img" src={bike?.bikeRc} id="detailed_image3" />
                </div> 
                <div className="col-4">
                     <img  alt="this is bike img" src={bike?.insurancePaper} id="detailed_image4" />
                </div>
                <div className="col-4">
                     <img  alt="this is bike img" src={bike?.pucPaper} id="detailed_image5" />
                </div>
            </div>

            
            <div className="my-5 ms-4">
              <p className="fs-5 fw-bold text-secondary">Total km with company :       <span className="text-dark">{bike?.totalKMWithCompany}</span></p>
              <p className="fs-5 fw-bold text-secondary">average km/lit with company : <span className="text-dark">{bike?.avgWithCompany}</span></p>
              <p className="fs-5 fw-bold text-secondary">Rating by company :           <span className="text-dark">{bike?.maintenanceRating}</span></p>
              <p className="fs-5 fw-bold text-secondary">verified :                    <span className="text-dark">{bike.verified}</span></p>
            </div>

        </div>
    )
}

export default ItemDetails;