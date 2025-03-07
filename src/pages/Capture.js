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
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";

const Capture = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  const capturePhoto = () => {
    if (images.length >= 3) return;
    const imageSrc = webcamRef.current.getScreenshot();
    setImages([...images, imageSrc]);
  };

  const goToPhotoStrip = () => {
    navigate("/strip", { state: { images } });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Capture Photo</h1>
      <Webcam ref={webcamRef} screenshotFormat="image/png" style={styles.video} />
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
};

export default Capture;

