import checksBg from "../assets/checks.jpg";
import { FaGithub } from "react-icons/fa";
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Photobooth</h1>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => navigate("/capture")}>
          Take photo
        </button>
        <button style={styles.button} onClick={() => navigate("/upload")}>
          Upload photo
        </button>
      </div><br></br><br></br>
      <footer style={styles.footer}>
            <a href="https://github.com/Ridhyka" target="_blank" rel="noopener noreferrer" style={{ color:"black", fontSize: "25px",fontFamily: "WindSong, cursive", }}>
              <FaGithub />Ray
            </a></footer>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#ffccff",
    backgroundImage: `url(${checksBg})`,
    backgroundsize: "cover",
    backgroundrepeat: "repeat",
  },
  heading: {
    fontSize: "128px",
    // fontFamily: "serif",
    // fontFamily: 'WindSong, cursive',
    fontFamily: "Monsieur La Doulaise, cursive",
    fontweight: 200,
    fontstyle: "normal",
    marginBottom: "20px",
  },
  buttonContainer: {
    display: "flex",
    gap: "20px",
  },
  button: {
    padding: "15px 30px",
    fontSize: "25px",
    // fontFamily: "serif",
    fontFamily: "Homemade Apple, cursive",
    backgroundColor: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
  },
};

export default Home;
