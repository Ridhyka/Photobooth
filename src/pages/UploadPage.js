// import React, { useState } from "react";

// function UploadPage() {
//   const [uploadedImages, setUploadedImages] = useState([]);

//   const handleImageUpload = (event) => {
//     const files = event.target.files;
//     const imagesArray = Array.from(files).map((file) => URL.createObjectURL(file));
//     setUploadedImages([...uploadedImages, ...imagesArray]);
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.heading}>Upload Photos</h1>
//       <input type="file" multiple onChange={handleImageUpload} />
//       <div style={styles.imagePreview}>
//         {uploadedImages.map((img, index) => (
//           <img key={index} src={img} alt="Uploaded" style={styles.image} />
//         ))}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     textAlign: "center",
//     padding: "20px",
//   },
//   heading: {
//     fontSize: "32px",
//     fontFamily: "serif",
//     marginBottom: "20px",
//   },
//   imagePreview: {
//     marginTop: "20px",
//     display: "flex",
//     gap: "10px",
//     flexWrap: "wrap",
//   },
//   image: {
//     width: "100px",
//     height: "100px",
//     objectFit: "cover",
//     borderRadius: "5px",
//   },
// };

// export default UploadPage;


// import { color } from "html2canvas/dist/types/css/types/color";


import checksBg from "../assets/checks.jpg";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UploadPage() {
  const [uploadedImages, setUploadedImages] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const imagesArray = Array.from(files).map((file) =>({
      src:  URL.createObjectURL(file),
    filter: "none",
  }));
    setUploadedImages([...uploadedImages, ...imagesArray]);
  };

  const goToPhotoStrip = () => {
    if (uploadedImages.length < 3) {
      alert("Please upload at least 3 images to create a strip!");
      return;
    }
    navigate("/strip", { state: { images: uploadedImages } }); // Navigate with images
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Upload Photos</h1>
      <input type="file" multiple onChange={handleImageUpload} />

      <div style={styles.imagePreview}>
        {uploadedImages.map((img, index) => (
          <img key={index} src={img.src } alt="Uploaded" style={styles.image} />
        ))}
      </div>

      {/* Button to navigate to PhotoStrip */}
      {uploadedImages.length > 0 && (
        <button style={styles.stripButton} onClick={goToPhotoStrip}>
          Create Photo Strip
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f3c7e9",
    fontFamily: "'Brush Script MT', cursive",
    height: "100vh",
    backgroundImage: `url(${checksBg})`,
    backgroundsize: "cover",
    backgroundrepeat: "repeat",
      
    
  },
  heading: {
    fontSize: "32px",
    fontFamily: "serif",
    marginBottom: "20px",
    
  },
  imagePreview: {
    marginTop: "20px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "5px",
  },
  stripButton: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "18px",
    backgroundColor: "white",
    fontFamily: "Homemade Apple, cursive",
    color: "black",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default UploadPage;
