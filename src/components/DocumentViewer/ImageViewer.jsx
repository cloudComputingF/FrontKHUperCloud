import React from "react";

export default function ImageViewer({ imgUrl }) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <img style={{ maxWidth: '100%', maxHeight: '100%' }} src={imgUrl} alt="Image" />
      </div>
      );
  }
  
