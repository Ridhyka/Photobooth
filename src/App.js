import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Capture from "./pages/Capture";
import UploadPage from "./pages/UploadPage";
import PhotoStrip from "./pages/PhotoStrip"; // Importing the PhotoStrip page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/capture" element={<Capture />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/strip" element={<PhotoStrip />} /> {/* Added PhotoStrip route */}
      </Routes>
    </Router>
  );
}

export default App;

