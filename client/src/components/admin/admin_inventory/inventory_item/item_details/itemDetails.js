import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


import AdminNavbar from "../../../adminBars/adminNavbar/AdminNavbar";
import AdminSidebar from "../../../adminBars/adminSidebar/AdminSidebar";

import './itemDetails.css';

const ItemDetails = () => {
     const location = useLocation();
     const navigate = useNavigate();
     const bike = location.state;

     const [ formValues, setFormValues ] = useState({ totalKMWithCompany: bike.totalKMWithCompany, avgWithCompany: bike.avgWithCompany, maintenanceRating: bike.maintenanceRating, verified: bike.verified });
     const [ enableChanges, setEnableChanges ] = useState(false);
     const [ modalValues, setModalValues ] = useState({ modalId: '', src: ()=>{}, headerText: '' })

     useEffect(() => {

     },[enableChanges])
     
     const updateBike = () => {
          axios.patch(`http://localhost:5000/admin/updateBike/${bike._id}`, formValues)
          .then(res => {
               console.log(res);
               toast.success(`${res.data.message}`)
          })
          .catch((err) => {
                   console.log(err);
               })
          setEnableChanges(false);
     }

     const deleteBike = () => {
          if (window.confirm(`Do you want to delete bike with number "${bike.bikeNumber}" ?`) === true) {

               axios.delete(`http://localhost:5000/admin/deleteBike/${bike._id}`)
               .then(res => {
                    toast.success(`${res.data.message}`) 
                    })
               .catch((err) => {
                        console.log(err);
                    });

               navigate('/admin/inventory');          
                  
             } else {
                  alert("Request Canceled...");
             }
     }

    return (
          <>
            <AdminNavbar />
            <AdminSidebar />
              <div id="detail_page">
                  <h3 className="mx-2 mt-2 mb-3 fw-bold">Bike Info :</h3>
                  <div className="row" id="block1">
                      <div className="col-3">
                           <img type='button' alt="this is bike img" src={bike?.bikeImage} id="detailed_image1" data-bs-toggle="modal" onClick={() => setModalValues({ ... modalValues, modalId : 'BikeImgModal', src: ()=> bike?.bikeImage, headerText: 'Bike Image :'})} data-bs-target="#BikeImgModal" />
                      </div> 
                      <div className="col-9 ps-3">
                           <div className="d-flex flex-column mt-3">
                               <span className="fs-5 fw-bold">{`Model Name  - ${bike.modelName} `}</span>                        
                               <span className="text-secondary fs-5 fw-bold">{`Bike Number  - ${bike.bikeNumber} `}</span>                        
                               <span className="text-secondary fs-5 fw-bold">{`Average km/lit by owner - ${bike.bikeAverage} `}</span>                        
                           </div>
                           <div>
                               <span> &nbsp; &nbsp; &nbsp; {bike?.aboutBike}</span>
                           </div>
                      </div>
                   </div>
      
                  <h3 className="mx-2 mt-5 mb-3 fw-bold">Owner Info :</h3>
                  <div className="row" id="block1">
                      <div className="col-3">
                           <img type='button' alt="this is adhar card image" src={bike?.adharCardImage} id="detailed_image2" data-bs-toggle="modal" onClick={() => setModalValues({ ... modalValues, modalId : 'adharImgModal', src: ()=> bike?.adharCardImage, headerText: 'Adhar Card Image :'})} data-bs-target="#adharImgModal" />
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
                           <img type='button' alt="this is bike img" src={bike?.bikeRc} id="detailed_image3" data-bs-toggle="modal" onClick={() => setModalValues({ ... modalValues, modalId : 'BikeRcImgModal', src: ()=> bike?.bikeRc, headerText: 'Bike RC Image :'})} data-bs-target="#BikeRcImgModal" />
                      </div> 
                      <div className="col-4">
                           <img type='button' alt="this is bike img" src={bike?.insurancePaper} id="detailed_image4" data-bs-toggle="modal" onClick={() => setModalValues({ ... modalValues, modalId : 'BikeInsuranceImgModal', src: ()=> bike?.insurancePaper, headerText: 'Bike Insurance Paper Image :'})} data-bs-target="#BikeInsuranceImgModal" />
                      </div>
                      <div className="col-4">
                           <img type='button' alt="this is bike img" src={bike?.pucPaper} id="detailed_image5" data-bs-toggle="modal" onClick={() => setModalValues({ ... modalValues, modalId : 'BikePucImgModal', src: ()=> bike?.pucPaper, headerText: 'Bike PUC paper Image :'})} data-bs-target="#BikePucImgModal" />
                      </div>
                  </div>

                  {
                    enableChanges ? (
                        <div className="my-5 ms-4">
                          <p className="fs-5 fw-bold text-secondary">Total km with company :       <input type="text" id="staticvalue" value={formValues?.totalKMWithCompany} onChange={(e) => setFormValues({...formValues, totalKMWithCompany: e.target.value})} /></p>
                          <p className="fs-5 fw-bold text-secondary">average km/lit with company : <input type="text" id="staticvalue" value={formValues?.avgWithCompany} onChange={(e) => setFormValues({...formValues, avgWithCompany: e.target.value})} /></p>
                          <p className="fs-5 fw-bold text-secondary">Rating by company :           <input type="text" id="staticvalue" value={formValues?.maintenanceRating} onChange={(e) => setFormValues({...formValues, maintenanceRating: e.target.value})} /></p>
                          <p className="fs-5 fw-bold text-secondary">verified :                    <input type="text" id="staticvalue" value={formValues?.verified} onChange={(e) => setFormValues({...formValues, verified: e.target.value})} /></p>
                        </div>

                    ) : (
                       <div className="my-5 ms-4">
                         <p className="fs-5 fw-bold text-secondary">Total km with company :       <span className="text-dark">{formValues?.totalKMWithCompany} km</span></p>
                         <p className="fs-5 fw-bold text-secondary">average km/lit with company : <span className="text-dark">{formValues?.avgWithCompany} km/lit</span></p>
                         <p className="fs-5 fw-bold text-secondary">Rating by company :           <span className="text-dark">{formValues?.maintenanceRating} / 10</span></p>
                         <p className="fs-5 fw-bold text-secondary">verified :                    <span className="text-dark">{(formValues.verified).toString()}</span></p>
                       </div>
                    )
                  }
      
                  



                  <div className="d-flex justify-content-end mb-2">
                    {
                         enableChanges ? ( <button className="btn btn-outline-primary ms-4" onClick={updateBike}>Update</button> ) 
                         : ( <button className="btn btn-outline-info" onClick={() => setEnableChanges(true)}>Enable changes</button> )
                    }
                    
                    <button className="btn btn-outline-danger me-5 ms-4" id="deletebtn" onClick={deleteBike}>Delete</button>
                  </div>
      
              </div>
              

              //modal

              <div className="modal" tabIndex="-1" id={modalValues.modalId}>
                 <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                         <div className="modal-header">
                            <h5 className="modal-title text-info fw-bold">{modalValues.headerText}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                         </div>
                         <div className="modal-body">
                           <img type='button' alt="this is img" src={modalValues.src()} />
                         </div>
                    </div>
                 </div>
              </div>
         </>
        )
}

export default ItemDetails;