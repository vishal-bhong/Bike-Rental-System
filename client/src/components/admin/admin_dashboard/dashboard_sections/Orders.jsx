import React from 'react';

import './orders.css';

const Orders = () => {

  return (
        <>
          <div id='orders'>              
            <span className='h3 text-info fw-bold ps-2' >Section_#2 -</span>
            <table className="table mt-3">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">mobile no.</th>
                <th scope="col">address</th>
                <th scope="col">rent order</th>
                <th scope="col">order status</th>
              </tr>
            </thead>
          </table>
          </div>
        </>
    )
}

export default Orders;