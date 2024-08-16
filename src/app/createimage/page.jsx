"use client";

import React, { useState } from "react";

export default function CreateImage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setUploadStatus("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("images", selectedFile);

    try {
      // using microservice from teammate
      const response = await fetch("http://localhost:3000/api/images", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setUploadStatus("Image uploaded successfully!");
        setSelectedFile(null); // Clear the file input
      } else {
        const errorData = await response.json();
        setUploadStatus(`Upload failed: ${errorData.error}`);
      }
    } catch (error) {
      setUploadStatus(`Upload failed: ${error.message}`);
    }
  };
  return(
  <main className="main-container">
    <h1 className="heading">Upload Image</h1>
    <p className="paragraph">
      *Be careful what you submit! Functionality for editing is not available
      yet!*
    </p>
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="file" onChange={handleFileChange} accept="image/*" className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"/>
      <button type="submit" className="btn flex justify-center items-center mx-auto">
        Upload
      </button>
    </form>

    {uploadStatus && <p className="status-message">{uploadStatus}</p>}
  </main>
  )
}
