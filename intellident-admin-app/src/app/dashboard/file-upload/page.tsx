"use client";

import React, { useRef, useState, DragEvent, ChangeEvent } from 'react';
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa';
import '/src/app/styles/dashboard.css';

export default function FileUploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [successMsg, setSuccessMsg] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(prevFiles => [...prevFiles, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(prevFiles => [...prevFiles, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (idx: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== idx));
  };

  const handleUpload = () => {
    if (files.length === 0) return;
    setTimeout(() => {
      setSuccessMsg('File(s) uploaded successfully!');
      console.log('Simulated upload:', files.map(f => ({ name: f.name, size: f.size })));
      setFiles([]);
    }, 800);
  };

  return (
    <>
      <h2>File Upload</h2>
      <div
        className={`file-drop-zone${dragActive ? ' active' : ''}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <FaCloudUploadAlt className="upload-icon" />
        <p>Drag & drop files here or <span className="browse-link" onClick={e => { e.stopPropagation(); inputRef.current?.click(); }}>Browse Files</span></p>
        <input
          type="file"
          multiple
          ref={inputRef}
          style={{ display: 'none' }}
          onChange={handleChange}
        />
      </div>
      {files.length > 0 && (
        <div className="file-list-table-wrapper">
          <table className="file-list-table">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Size</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, idx) => (
                <tr key={idx}>
                  <td>{file.name}</td>
                  <td>{(file.size / 1024).toFixed(1)} KB</td>
                  <td>
                    <button className="remove-file-btn" onClick={() => removeFile(idx)} title="Remove">
                      <FaTimes />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
        <button className="upload-btn" onClick={handleUpload} disabled={files.length === 0}>Upload</button>
      </div>
      {successMsg && (
        <div className="upload-success-msg">
          <span>{successMsg}</span>
          <button className="dismiss-msg-btn" onClick={() => setSuccessMsg('')}><FaTimes /></button>
        </div>
      )}
    </>
  );
} 