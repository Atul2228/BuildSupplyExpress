
// import React from "react";
// import { Link } from "react-router-dom";

// const Hero = () => {
//   return (
//     <div
//       className="position-relative min-vh-100 d-flex align-items-center justify-content-center"
//       style={{
//         backgroundImage:"url(http://yesofcorsa.com/wp-content/uploads/2018/02/Construction-Wallpaper-1080p.jpg)", 
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="container text-center text-lg-start">
//         <h1 className="display-4 fw-bold text-dark">
//           Best Collection for <br /> building material
//         </h1>
//         <p className="mt-3 mb-4"></p>
//         <Link to="/products" className="btn btn-info  btn-lg">
//           Shop Now
//         </Link>
//       </div>
//     </div>

//   );
// };

// export default Hero;

// import React, { useState } from 'react';

// function ImageSlider({ images }) {
//   // State to keep track of the current image index
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Function to go to the next image
//   const goToNext = () => {
//     const nextIndex = (currentIndex + 1) % images.length; // wrap around to the first image
//     setCurrentIndex(nextIndex);
//   };

//   // Function to go to the previous image
//   const goToPrev = () => {
//     const prevIndex = (currentIndex - 1 + images.length) % images.length; // wrap around to the last image
//     setCurrentIndex(prevIndex);
//   };

//   // Render the component
//   return (
//     <div>
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px',marginTop: '20px' ,width:"100%"}}>
//         <button onClick={goToPrev} style={{ marginRight: '20px' }}>Previous</button>
//         <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} style={{ width: '500px', height: '300px' }} />
//         <button onClick={goToNext} style={{ marginLeft: '20px' }}>Next</button>
//       </div>
//     </div>
//   );
// }

// export default ImageSlider;
import React, { useState, useEffect } from 'react';

function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next image
  const goToNext = () => {
    setCurrentIndex(current => (current + 1) % images.length);
  };

  // Function to go to the previous image
  const goToPrev = () => {
    setCurrentIndex(current => (current - 1 + images.length) % images.length);
  };

  // Automatic sliding every 9 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  // Render the component
  return (
    <div className="container mt-8 mb-4">
      <div className="row justify-content-center align-items-center position-relative">
        <div className="col-12 p-0">
          <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} className="img-fluid w-100" style={{ maxHeight: '500px' }} />
          <button className="position-absolute top-50 start-0 translate-middle-y btn btn-outline-secondary" style={{ zIndex: 1, marginLeft: '-50px' }} onClick={goToPrev}>
            &lt;
          </button>
          <button className="position-absolute top-50 end-0 translate-middle-y btn btn-outline-secondary" style={{ zIndex: 1, marginRight: '-50px' }} onClick={goToNext}>
            &gt; 
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageSlider;
