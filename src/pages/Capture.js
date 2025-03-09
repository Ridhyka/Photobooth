// import React, { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Webcam from "react-webcam";

// const Capture = () => {
//   const webcamRef = useRef(null);
//   const navigate = useNavigate();
//   const [images, setImages] = useState([]);

//   const capturePhoto = () => {
//     if (images.length >= 3) return;
//     const imageSrc = webcamRef.current.getScreenshot();
//     setImages([...images, imageSrc]);
//   };

//   const goToPhotoStrip = () => {
//     navigate("/strip", { state: { images } });
//   };

//   return (
//     <div className="container">
//       <h1 className="title">Capture Photo</h1>
//       <Webcam ref={webcamRef} screenshotFormat="image/png" className="video-container" />
//       <button onClick={capturePhoto} className="btn">Capture</button>
//       {images.length === 3 && <button onClick={goToPhotoStrip} className="btn">Generate Strip</button>}
//     </div>
//   );
// };

// export default Capture;

import checksBg from "../assets/checks.jpg";
import React, { useRef, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";



const Capture = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState("none");
  
  // const capturePhoto = () => {
  //   if (images.length >= 3) return;
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   // setImages([...images, imageSrc]);
   
  //   setImages([...images, { src: imageSrc, filter }]);
  // };
  const capturePhoto = () => {
    if (images.length >= 3) return;
    const imageSrc = webcamRef.current.getScreenshot();

    const img = new Image();
  img.src = imageSrc;
  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas size to match the image
    canvas.width = img.width;
    canvas.height = img.height;

    // Apply the selected filter
    ctx.filter = filter;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Convert the canvas to a data URL (filtered image)
    const filteredImage = canvas.toDataURL("image/png");
  
    if (imageSrc) {
      setImages((prevImages) => [...prevImages, { src: filteredImage, filter }]);
      console.log("Captured Images:", filteredImage); // Debugging
    } else {
      console.error("Failed to capture image.");
    }
  };
}
  

  // const goToPhotoStrip = () => {
  //   navigate("/strip", { state: { images} });
  // };
  const [isReadyToNavigate, setIsReadyToNavigate] = useState(false);

  const goToPhotoStrip = () => {
    setIsReadyToNavigate(true);  // Set flag to navigate after state update
  };
  
  useEffect(() => {
    if (isReadyToNavigate && images.length === 3) {
      console.log("Navigating with images:", images); // Debugging
      navigate("/strip", { state: { images } });
    }
  }, [isReadyToNavigate, images, navigate]); 
  
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Capture Photo</h1>
      {/* <Webcam ref={webcamRef} screenshotFormat="image/png" style={styles.video} /> */}
     
  {/* ✅ Live Webcam Feed with Filter */}
  <Webcam 
        ref={webcamRef} 
        screenshotFormat="image/png" 
        mirrored={false}
        style={{ ...styles.video, filter: filter }} 
      />

      {/* ✅ Filter Selection */}
      <div style={styles.filterButtons}>
        <button style={styles.filterButton} onClick={() => setFilter("none")}>No Filter</button>
        <button style={styles.filterButton} onClick={() => setFilter("grayscale(100%)")}>Grayscale</button>
        <button style={styles.filterButton} onClick={() => setFilter("sepia(100%)")}>Sepia</button>
        <button style={styles.filterButton} onClick={() => setFilter("contrast(200%)")}>High Contrast</button>
        <button style={styles.filterButton} onClick={() => setFilter("saturate(200%)")}>Saturated</button>
      </div>


      <button onClick={capturePhoto} style={styles.btn}>Capture</button>
      {images.length === 3 && <button onClick={goToPhotoStrip} style={styles.btn}>Generate Strip</button>}

      
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f3c7e9",
    fontFamily: "Homemade Apple, cursive",
    backgroundImage: `url(${checksBg})`,
    backgroundsize: "cover",
    backgroundrepeat: "repeat",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#333",
  },
  video: {
    width: "400px",
    height: "300px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    background: "black",
  },
  btn: {
    background: "white",
    border: "none",
    padding: "10px 20px",
    fontFamily: "Homemade Apple, cursive",
    fontSize: "1.5rem",
    cursor: "pointer",
    borderRadius: "10px",
    boxShadow: "2px 2px 5px gray",
    marginTop: "20px",
  },


  // new
  filterButtons: {
    display: "flex",
    gap: "10px",

    marginTop: "10px",
    
  },
  filterButton:{
    background:"white",
    borderRadius:"5px",
    fontFamily: "Homemade Apple, cursive",
    fontSize:"15px",

  },
 
  capturedImage: {
    width: "100px",
    height: "75px",
    borderRadius: "5px",
    boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
  },
};

export default Capture;

