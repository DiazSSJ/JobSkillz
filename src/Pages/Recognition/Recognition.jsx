import * as React from "react";
import { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import ImageIcon from "@mui/icons-material/Image";
import LinearProgress from "@mui/material/LinearProgress";
import "./Recognition.css";

function RecognitionPage() {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      validateFile(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      validateFile(files[0]);
    }
  };

  const validateFile = (file) => {
    if (file.size <= 2 * 1024 * 1024) {
      setFile(file);
      setError("");
    } else {
      setError("File size exceeds 2 MB");
    }
  };

  const handleCancelUpload = () => {
    setFile(null);
    setError("");
  };

  const formatFileSize = (size) => {
    if (size < 1024) return size + " B";
    else if (size < 1048576) return (size / 1024).toFixed(3) + " KB";
    else return (size / 1048576).toFixed(3) + " MB";
  };

  const calculateProgress = (size) => {
    return (size / (2 * 1024 * 1024)) * 100;
  };

  return (
    <div className="app-container">
      <Navbar title="Reconocimiento" />
      <div className="recognition-layout">
        <div className="card-upload">
          <div className="card-header">
            <IconButton
              aria-label="upload"
              size="large"
              color="secondary"
              onClick={() => document.getElementById("file-input").click()}
            >
              <PermMediaIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="large"
              color="error"
              onClick={handleCancelUpload}
            >
              <ClearIcon fontSize="inherit" />
            </IconButton>
            <div className="file-info">
            <div className="file-size">
              {file ? formatFileSize(file.size) : "0 B"} / 2 MB
            </div>
            <LinearProgress color="secondary" variant="determinate" value={file ? calculateProgress(file.size) : 0} />
          </div>
          </div>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
          
          <div
            className={`dropzone ${dragging ? "dragging" : ""}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {!file && (
              <div className="icon">
                <ImageIcon className="icon-image" fontSize="large" />
              </div>
            )}
            <p style={{ fontSize: "150%" }}>
              {file ? file.name : "Drag and Drop Image Here"}
            </p>
            {file && (
              <div className="preview">
                <img src={URL.createObjectURL(file)} alt="Preview" />
              </div>
            )}
            {error && <p className="error">{error}</p>}
          </div>
        </div>
        <div className="button-upload-image">
          <button className="btn boton"> Analizar imagen </button>
        </div>
      </div>
    </div>
  );
}

export default RecognitionPage;
