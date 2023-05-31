import React from 'react';

import './sectionOne.css';


const SectionOne = () => {

    return (
        <>
          <div id='sectionOn'>              
             <video width="100%" height="140" autoPlay>
               <source src="/Videos/video1.mp4" type="video/mp4" />
                   Your browser does not support the video tag.
              </video>
         </div>
        </>
    )
}

export default SectionOne;
