import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FileBase from 'react-file-base64';
import axios from "axios";

import "./addBike.css";
import AdminNavbar from "../../adminBars/adminNavbar/AdminNavbar";
import AdminSidebar from "../../adminBars/adminSidebar/AdminSidebar";


const AddBike = () => {

    const admin = JSON.parse(localStorage.getItem("adminProfile"));
    
    const [ bikeData, setBikeData ] = useState({ fullName: '', email: admin.result.email, bikeImage: '', bikeRc: '', insurancePaper: '', pucPaper: '', modelName: '', bikeAverage: '', bikeNumber: '', aboutBike: '', });
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); 
        console.log(bikeData)  
        axios.post('http://localhost:5000/admin/addBike', bikeData) 
        navigate('/admin/inventory')     
    }    
     

    const handleClear = () => {
        setBikeData({ fullName: '', email: '', bikeImage: '', bikeRc: '', insurancePaper: '', pucPaper: '', modelName: '', bikeAverage: '', bikeNumber: '', aboutBike: '' });

    }

    return (
        <>
            <AdminNavbar />
            <AdminSidebar />
            <div className="border border-dark" id="investorform">
            <form className="d-flex flex-column">            
                <h2 className="fw-bold" id="investformtitle">Add Bike form</h2>

                <div className="col-12 mt-4" id="fullwidthinput">
                    <label for="full name" className="col-form-label fw-bold">Owner name : </label>
                    <input type="text" id="full name" className="form-control form-control-lg" placeholder="full Name" aria-label="full name" value={bikeData.fullName} onChange={(e) => setBikeData({ ...bikeData, fullName: e.target.value })} />
                </div> 

                <div className="col-12 mt-3">
                    <label for="file_input1" className="col-form-label fw-bold">Bike image :</label> <br/>
                    <FileBase type="file" multiple={false} onDone={ ({ base64 }) => setBikeData({ ...bikeData, bikeImage: base64 }) } id='file_input1' /> <br />
                </div>

                <div className="col-12 mt-3">
                    <label for="file_input2" className="col-form-label fw-bold">Bike RC image :</label> <br/>
                    <FileBase type="file" multiple={false} onDone={ ({ base64 }) => setBikeData({ ...bikeData, bikeRc: base64 }) } id='file_input2' /> <br />
                </div>

                <div className="col-12 mt-3">
                    <label for="file_input3" className="col-form-label fw-bold">Bike insurance paper image :</label> <br/>
                    <FileBase type="file" multiple={false} onDone={ ({ base64 }) => setBikeData({ ...bikeData, insurancePaper: base64 }) } id='file_input3' /> <br />
                </div>
              
                <div className="col-12 mt-3">
                    <label for="file_input4" className="col-form-label fw-bold">bike PUC paper image :</label> <br/>
                    <FileBase type="file" multiple={false} onDone={ ({ base64 }) => setBikeData({ ...bikeData, pucPaper: base64 }) } id='file_input4' /> <br />
                </div>


                <div className="col-12 mt-4" id="fullwidthinput">
                    <label for="modelName" className="col-form-label fw-bold">Full Model name of the bike :</label>
                    <input type="text" id="modelName" className="form-control form-control-lg" placeholder="eg. Bajaj Platina 110 " aria-label="model name" value={bikeData.modelName} onChange={(e) => setBikeData({ ...bikeData, modelName: e.target.value })} />               
                </div>

                <div className="col-12 mt-4" id="fullwidthinput">
                    <label for="average" className="col-form-label fw-bold">Average/litre of the bike :</label>
                    <input type="text" id="average" className="form-control form-control-lg" placeholder="eg. 75" aria-label="bike average" value={bikeData.bikeAverage} onChange={(e) => setBikeData({ ...bikeData, bikeAverage: e.target.value })} />               
                </div>

                <div className="col-12 mt-4" id="fullwidthinput">
                    <label for="bikeNumber" className="col-form-label fw-bold">Number of the bike :</label>
                    <input type="text" id="bikeNumber" className="form-control form-control-lg" placeholder="MH 42 vj 9234" aria-label="bike number" value={bikeData.bikeNumber} onChange={(e) => setBikeData({ ...bikeData, bikeNumber: e.target.value })} />               
                </div>

                <div className="col-12 mt-3" id="fullwidthinput">
                    <label for="about" className="col-form-label fw-bold">About bike :</label>
                    <textarea type="text" rows="2" id="about" className="form-control form-control-lg" placeholder="eg. the bike has 110cc of engine" aria-label="about bike" value={bikeData.aboutBike} onChange={(e) => setBikeData({ ...bikeData, aboutBike: e.target.value })} />               
                </div>


                <div className="row mt-4 mb-3">

                    <div className="col">
                    <button className="btn btn-primary" id="regbtn" type="submit" onClick={handleSubmit}>Submit</button>
                    </div>

                    <div className="col-7">
                    <button className="btn btn-danger" id="regbtn" onClick={handleClear}>Clear</button>
                    </div>
                    
                </div>  
            </form>
            </div>
        </>
    )
}


export default AddBike;