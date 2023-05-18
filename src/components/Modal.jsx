import * as React from "react";
import "./Modal.css";
import CancelIcon from "@mui/icons-material/Cancel";
import DownloadIcon from "@mui/icons-material/Download";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

export default function Modal({ filename, url, open, onClose, children }) {
  const iconStyle = {
    fontSize: 50,
  };

  const handleDownload = async () => {
    try {
      const fileName='test.txt';
      const downloadUrl = `http://43.207.224.148:8000/download/file?file_name=${encodeURIComponent(fileName)}`; // Construct the download URL
  
      // Send GET request to the download URL
      const response = await fetch(downloadUrl, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error('Download request failed.');
      }
  
      const blob = await response.blob(); // Convert response to Blob format
  
      // Create download link for the file
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = fileName; // Set the downloaded file name
  
      // Click the link to start the download
      downloadLink.click();
    } catch (error) {
      console.error("다운로드 에러:", error);
    }
  };
  

  return (
    <div className="backdrop">
      <dialog className="modal" open={open}>
        <div className="button-container">
          <div className="icon-wrapper">
            {console.log(url)}
            {url && filename.endsWith(".jpg") ? (
              <ImageNotSupportedIcon
                alt="Delete duplicate image"
                style={iconStyle}
              />
            ) : (
                <GTranslateIcon alt="Translate" style={iconStyle} />
            )}
          </div>
          <div className="icon-gap" />
          <div className="icon-wrapper">
            <DownloadIcon
              alt="Download"
              style={iconStyle}
              onClick={handleDownload}
            />
          </div>
          <div className="icon-gap" />
          <div className="icon-wrapper">
            <CancelIcon alt="Close" style={iconStyle} onClick={onClose} />
          </div>
        </div>
        {children}
      </dialog>
    </div>
  );
}
