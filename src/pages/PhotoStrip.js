// import React, { useRef } from "react";
// import html2canvas from "html2canvas";
// import { useLocation } from "react-router-dom";

// const PhotoStrip = () => {
//   const location = useLocation();
//   const { images = [] } = location.state || { images: [] };
//   const stripRef = useRef(null);

//   const downloadStrip = () => {
//     if (!stripRef.current) return;

//     html2canvas(stripRef.current, { backgroundColor: null }).then((canvas) => {
//       const link = document.createElement("a");
//       link.href = canvas.toDataURL("image/png");
//       link.download = "photo_strip.png";
//       link.click();
//     });
//   };

//   return (
//     <div style={styles.body}>
//       <div style={styles.container}>
//         {/* Left - Tilted Strip */}
//         <div style={styles.stripWrapper}>
//           <div style={styles.photoStrip} ref={stripRef}>
//             {[...Array(3)].map((_, index) => (
//               <div key={index} style={styles.stripImage}>
//                 {images[index] ? (
//                   <img
//                     src={images[index]}
//                     alt={`Captured ${index}`}
//                     style={styles.img}
//                   />
//                 ) : null}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right - Text & Button */}
//         <div style={styles.textSection}>
//           <h2 style={styles.stripText}>Your photo strip is ready</h2>
//           <button style={styles.downloadBtn} onClick={downloadStrip}>
//             Download
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   body: {
//     backgroundColor: "#f3c7e9",
//     fontFamily: '"Brush Script MT", cursive',
//     textAlign: "center",
//     height: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   container: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: "50px",
//   },
//   stripWrapper: {
//     transform: "rotate(-10deg)",
//   },
//   photoStrip: {
//     background: "white",
//     padding: "15px",
//     borderRadius: "10px",
//     boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     width: "250px",
//     gap: "10px",
//     paddingBottom: "30px",
//   },
//   stripImage: {
//     width: "200px",
//     height: "130px",
//     background: "lightgray",
//     borderRadius: "5px",
//   },
//   img: {
//     width: "100%",
//     height: "100%",
//     borderRadius: "5px",
//   },
//   textSection: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   stripText: {
//     fontSize: "2rem",
//     fontStyle: "italic",
//   },
//   downloadBtn: {
//     background: "white",
//     border: "none",
//     padding: "10px 20px",
//     fontSize: "1.5rem",
//     cursor: "pointer",
//     borderRadius: "10px",
//     boxShadow: "2px 2px 5px gray",
//     marginTop: "20px",
//     fontStyle: "italic",
//   },
// };

// export default PhotoStrip;


import { FaGithub } from "react-icons/fa";
import checksBg from "../assets/checks.jpg";
import { FaPalette } from "react-icons/fa";
import React, { useRef , useState } from "react";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";

const PhotoStrip = () => {
  const location = useLocation();
  const { images } = location.state || { images: [] };
  const stripRef = useRef(null);

  // State to manage the background color of the photo strip
  const [stripColor, setStripColor] = useState("white");

   // ✅ List of colors for the user to choose
   const colors = ["#f3c7e9", "#FFD700", "#90EE90", "#FF6347", "#ADD8E6", "#FFFFFF"];


const downloadStrip = () => {
    if (!stripRef.current) return;
  
    // Clone the strip for proper capture
    const clonedStrip = stripRef.current.cloneNode(true);
    clonedStrip.style.transform = "none"; // Remove tilt for clean capture
    clonedStrip.style.position = "absolute";
    clonedStrip.style.left = "-9999px"; // Move off-screen
    document.body.appendChild(clonedStrip);
  
    html2canvas(clonedStrip, { backgroundColor: null, scale: 2 }).then(
      (canvas) => {
        document.body.removeChild(clonedStrip); // Cleanup
  
        // Increase canvas size to fit rotation
        const angle = -10 * (Math.PI / 180); // Convert degrees to radians
        const sin = Math.abs(Math.sin(angle));
        const cos = Math.abs(Math.cos(angle));
  
        const newWidth = canvas.width * cos + canvas.height * sin;
        const newHeight = canvas.width * sin + canvas.height * cos;
  
        // Create a new canvas with extra space
        const tiltedCanvas = document.createElement("canvas");
        tiltedCanvas.width = newWidth;
        tiltedCanvas.height = newHeight;
  
        const ctx = tiltedCanvas.getContext("2d");
  
        // Move origin to center and rotate
        ctx.translate(newWidth / 2, newHeight / 2);
        ctx.rotate(angle);
        ctx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);
  
        // Convert to image and download
        const link = document.createElement("a");
        link.href = tiltedCanvas.toDataURL("image/png");
        link.download = "photo_strip.png";
        link.click();
      }
    );
  };
  
  return (
    <div style={styles.container}>
      {/* Tilted Photo Strip */}
      {/* <div style={styles.stripWrapper}>
        <div style={styles.photoStrip} ref={stripRef}>
          {images.slice(0, 3).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Captured ${index}`}
              style={styles.stripImage}
            />
          ))}
        </div></div> */}
    
    <div style={styles.stripWrapper}>
        <div style={{ ...styles.photoStrip, backgroundColor: stripColor }} ref={stripRef}>
          {images.slice(0, 3).map((img, index) => (
            <img key={index} src={img} alt={`Captured ${index}`} style={styles.stripImage} />
          ))}
        </div>
      </div>
     
      {/* <div style={{ position: "absolute", top: 20, left: 20 }}>
        <label style={{ fontSize: "18px", fontWeight: "bold", marginRight: "10px" }}>
          Select Strip Color:
        </label>
        <input
          type="color"
          value={stripColor}
          onChange={(e) => setStripColor(e.target.value)}
          style={{ width: "40px", height: "40px", border: "none", cursor: "pointer" }}
        />
      </div> */}

     <div>
      {/* ✅ Color Picker Section */}
      <div style={styles.colorPicker}>
        <p style={styles.choose}>Choose Strip Color:</p>
        {colors.map((color) => (
          <button
            key={color}
            style={{ ...styles.colorButton, backgroundColor: color }}
            onClick={() => setStripColor(color)}
          />
        ))}
      </div>
      {/* Right Side - Text & Download Button */}
      <div style={styles.downloadSection}>
        <h2 style={styles.stripText}>Your photo strip <br></br>is ready</h2>
        <button style={styles.downloadBtn} onClick={downloadStrip}>
          Download
        </button>
      </div></div>
<footer style={styles.footer}>
      <a href="https://github.com/Ridhyka" target="_blank" rel="noopener noreferrer" style={{ color:"black", fontSize: "35px",fontFamily: "WindSong, cursive", }}>
        <FaGithub />Ray
      </a></footer>

    
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f3c7e9",
    fontFamily: "'Brush Script MT', cursive",
    backgroundImage: `url(${checksBg})`,
    backgroundsize: "cover",
    backgroundrepeat: "repeat",
  },
  colorPicker: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },

  colorButton: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    border: "1px solid black",
    cursor: "pointer",
  },

  /* White Tilted Strip */
  stripWrapper: {
    transform: "rotate(-10deg)",
    marginRight: "50px",
  },

  // photoStrip: {
  //   background: "white",
  //   padding: "20px",
  //   // borderRadius: "10px",
  //   boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)",
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   width: "200px",
  //   height: "450px",
  //   justifyContent: "space-between",
  //   position: "relative",
  // },

  /* ✅ Applied Dynamic Background Color */
  photoStrip: {
    padding: "20px",
    boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "200px",
    height: "450px",
    justifyContent: "space-between",
    position: "relative",
  },

  stripImage: {
    width: "200px",
    height: "130px",
    background: "lightgray",
    borderRadius: "5px",
    position: "relative",
  },

  /* Right Side - Text & Button */
  downloadSection: {
    textAlign: "center",
    fontStyle: "italic",
  },

  stripText: {
    fontSize: "2rem",
    fontFamily: "Homemade Apple, cursive",
    fontSize:"50px",
  },

  downloadBtn: {
    background: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "1.5rem",
    cursor: "pointer",
    borderRadius: "10px",
    boxShadow: "2px 2px 5px gray",
    marginTop: "20px",
    fontFamily: "Homemade Apple, cursive",
  },
  choose:{
    fontFamily: "Homemade Apple, cursive",
    fontSize:"20px",

  }
};



export default PhotoStrip;

