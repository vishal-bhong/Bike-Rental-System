import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FileBase from 'react-file-base64';

import { bikeInvestor } from "../../../actions/userAuth";
import "./investor_form.css";


const InvestorForm = () => {

    const user = JSON.parse(localStorage.getItem("userProfile"));
    
    const [ bikeInvestData, setBikeInvestData ] = useState({ fullName: '', mobileNo: '', email: user.result.email, bikeImage: '', bikeRc: '', insurancePaper: '', pucPaper: '', modelName: '', bikeAverage: '', bikeNumber: '', aboutBike: '', });
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();          
        dispatch(bikeInvestor(bikeInvestData, navigate));
    }    
     

    const handleClear = () => {
        setBikeInvestData({ fullName: '', email: '', mobileNo: '', bikeImage: '', bikeRc: '', insurancePaper: '', pucPaper: '', modelName: '', bikeAverage: '', bikeNumber: '', aboutBike: '' });

    }

    return (
        <>
            <div className="border border-dark" id="investorform">
            <form className="d-flex flex-column">            
                <h2 className="fw-bold" id="investformtitle">Bike rent form</h2>

                <div className="col-12 mt-4" id="fullwidthinput">
                    <label for="full name" className="col-form-label fw-bold">Owner name as on RC : </label>
                    <input type="text" id="full name" className="form-control form-control-lg" placeholder="full Name" aria-label="full name" value={bikeInvestData.fullName} onChange={(e) => setBikeInvestData({ ...bikeInvestData, fullName: e.target.value })} />
                </div> 


                <div className="col-12 mt-3" id="fullwidthinput">
                    <label for="mobileNo" className="col-form-label fw-bold">Mobile no. of Owner:</label>
                    <input type="text" id="mobileNo" className="form-control form-control-lg" placeholder="Mobile No." aria-label="mobile No" value={bikeInvestData.mobileNo} onChange={(e) => setBikeInvestData({ ...bikeInvestData, mobileNo: e.target.value })} />               
                </div> 


                <div className="col-12 mt-3">
                    <label for="file_input1" className="col-form-label fw-bold">Bike image :</label> <br/>
                    <FileBase type="file" multiple={false} onDone={ ({ base64 }) => setBikeInvestData({ ...bikeInvestData, bikeImage: base64 }) } id='file_input1' /> <br />
                </div>

                <div className="col-12 mt-3">
                    <label for="file_input2" className="col-form-label fw-bold">Bike RC image :</label> <br/>
                    <FileBase type="file" multiple={false} onDone={ ({ base64 }) => setBikeInvestData({ ...bikeInvestData, bikeRc: base64 }) } id='file_input2' /> <br />
                </div>

                <div className="col-12 mt-3">
                    <label for="file_input3" className="col-form-label fw-bold">Bike insurance paper image :</label> <br/>
                    <FileBase type="file" multiple={false} onDone={ ({ base64 }) => setBikeInvestData({ ...bikeInvestData, insurancePaper: base64 }) } id='file_input3' /> <br />
                </div>
              
                <div className="col-12 mt-3">
                    <label for="file_input4" className="col-form-label fw-bold">bike PUC paper image :</label> <br/>
                    <FileBase type="file" multiple={false} onDone={ ({ base64 }) => setBikeInvestData({ ...bikeInvestData, pucPaper: base64 }) } id='file_input4' /> <br />
                </div>


                <div className="col-12 mt-4" id="fullwidthinput">
                    <label for="modelName" className="col-form-label fw-bold">Full Model name of the bike :</label>
                    <input type="text" id="modelName" className="form-control form-control-lg" placeholder="eg. Bajaj Platina 110 " aria-label="model name" value={bikeInvestData.modelName} onChange={(e) => setBikeInvestData({ ...bikeInvestData, modelName: e.target.value })} />               
                </div>

                <div className="col-12 mt-4" id="fullwidthinput">
                    <label for="average" className="col-form-label fw-bold">Average/litre of the bike :</label>
                    <input type="text" id="average" className="form-control form-control-lg" placeholder="eg. 75" aria-label="bike average" value={bikeInvestData.bikeAverage} onChange={(e) => setBikeInvestData({ ...bikeInvestData, bikeAverage: e.target.value })} />               
                </div>

                <div className="col-12 mt-4" id="fullwidthinput">
                    <label for="bikeNumber" className="col-form-label fw-bold">Number of the bike :</label>
                    <input type="text" id="bikeNumber" className="form-control form-control-lg" placeholder="MH 42 vj 9234" aria-label="bike number" value={bikeInvestData.bikeNumber} onChange={(e) => setBikeInvestData({ ...bikeInvestData, bikeNumber: e.target.value })} />               
                </div>

                <div className="col-12 mt-3" id="fullwidthinput">
                    <label for="about" className="col-form-label fw-bold">About bike :</label>
                    <textarea type="text" rows="2" id="about" className="form-control form-control-lg" placeholder="eg. the bike has 110cc of engine" aria-label="about bike" value={bikeInvestData.aboutBike} onChange={(e) => setBikeInvestData({ ...bikeInvestData, aboutBike: e.target.value })} />               
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


export default InvestorForm;