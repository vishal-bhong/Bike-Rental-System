import React from 'react';

import './map.css';

const Map = () => {

  return (
        <>
          <div id='map'>              
            {/* <span className='h3 text-info fw-bold ps-2' >Section_#2 map -</span> */}
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60650.76008002112!2d74.55537201062236!3d18.17899432620641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc3a03bdb59287f%3A0x36e4fb47fb8d8a9d!2sBaramati%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1679410576552!5m2!1sen!2sin" 
                width="856"
                height="350"
                style={{ border: "0" }}
                allowFullScreen="false" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade" 
                title="Bike rental Map" />
            
          </div>
        </>
    )
}

export default Map;