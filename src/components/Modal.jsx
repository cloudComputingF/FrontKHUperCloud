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
      const response = await fetch(url); // 파일 URL로 요청 보내기
      const blob = await response.blob(); // Blob 형식으로 변환

      // 파일 다운로드 링크 생성
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = filename; // 다운로드될 파일의 이름

      // 링크를 클릭하여 다운로드 시작
      downloadLink.click();
    } catch (error) {
      console.error("다운로드 에러:", error);
    }
  };

  const isImageFile = /\.(jpg|jpeg|png|gif)$/i.test(filename);
  return (
    <div className="backdrop" onClick={onClose}>
      <dialog className="modal" open={open}>
          <div className="button-container">
            <div className="icon-wrapper">
              {isImageFile ? (
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
