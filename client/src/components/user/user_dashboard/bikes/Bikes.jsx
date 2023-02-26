import React from 'react';
import './bikes.css';

import { IoAddCircleOutline } from "react-icons/io5";

const PizzaVarieties = () => {

    const user = JSON.parse(localStorage.getItem("userProfile"));

    if(!user) {
        return (
            <>
             <h1 style={{ padding: '100px 0 0 150px', fontWeight: 'bold', color: 'red' }}>Please Log in as user to see the dashboard.. </h1>
            </>
        )
    }

    return (
        <>
            <div className="row row-cols-2 row-cols-xl-4">               
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

export default PizzaVarieties;
