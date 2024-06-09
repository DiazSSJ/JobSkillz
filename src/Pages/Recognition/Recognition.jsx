import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import ImageIcon from "@mui/icons-material/Image";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import LinearProgress from "@mui/material/LinearProgress";
import Camera from "@mui/icons-material/Camera";
import "./Recognition.css";
import { analyzeCandidateImage } from "../../api/api";
import cerrar from "../../Resources/cerrar.png"

function RecognitionPage() {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [response, setResponse] = useState(null);
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const streamRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    if (showCamera) {
      getVideo();
    }
  }, [showCamera]);

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
      setError("El archivo excede las 2 MB permitidas");
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

  const handleAnalyzeImage = async () => {
    if (file) {
      setAnalyzing(true);
      try {
        const result = await analyzeCandidateImage(file);
        console.log('Analysis Result:', result);
        setResponse(result.message);
        setIsModalOpen(true); // Abrir el modal
      } catch (error) {
        console.error('Error analyzing image:', error);
        setError('Error al analizar la imagen');
      } finally {
        setFile(null); // Limpiar el archivo después de analizar
        setAnalyzing(false);
      }
    } else {
      setError('Por favor, sube una imagen primero');
    }
  };

  const getVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
        streamRef.current = stream;
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  const closeModal = () => {
    stopVideo();
    setShowCamera(false);
  };

  const takePhoto = () => {
    const width = 400;
    const height = 400;

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    setFile(dataURLtoFile(photo.toDataURL("image/png"), "photo.png"));
    stopVideo();
    setShowCamera(false);
  };

  const stopVideo = () => {
    let stream = streamRef.current;
    stream.getTracks().forEach(track => track.stop());
  };

  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
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
              aria-label="take photo"
              size="large"
              color="secondary"
              onClick={() => setShowCamera(true)}
            >
              <PhotoCameraIcon fontSize="inherit" />
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
              <LinearProgress
                color="secondary"
                variant="determinate"
                value={file ? calculateProgress(file.size) : 0}
              />
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
              {file ? file.name : "Arrastra y suelta tu foto aquí"}
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
          <button className="btn boton" onClick={handleAnalyzeImage} disabled={analyzing}>
            {analyzing ? "Analizando..." : "Analizar imagen"}
          </button>
        </div>
        {showCamera && (
          <div className="modal-camera">
            <div className="modal-camera-content">
              <div className="camera-container">
                <div className="close-modal-button">
                  <button className="button-close" onClick={closeModal}>
                    <img src={cerrar} alt="Cerrar" className="close-modal-icon" />
                  </button>
                </div>
                <video className="video-container" ref={videoRef}></video>
                <button className="btn take-photo" onClick={takePhoto}>
                  <Camera fontSize="large" />
                </button>
              </div>
            </div>
          </div>
        )}
        <canvas ref={photoRef} style={{ display: "none" }}></canvas>
        {isModalOpen && (
          <div className="modal-response">
            <div className="modal-content-response">
            <h1 className="title-image-response">Analisis de la imagen</h1>
              <div className="modal-info-image">
                {response}
              </div>
              <button className="button-close-response" onClick={() => setIsModalOpen(false)}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecognitionPage;
