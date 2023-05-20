import React, { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PDFViewer({ docUrl }) {
  
  const [numPages, setNumPages] = useState(null);
  const [firstPageUrl, setFirstPageUrl] = useState(null);
  const firstPageRef = useRef(null);

  useEffect(() => {
    setFirstPageUrl(null);
  }, [docUrl]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }


  return (
    <div>
      <Document file={docUrl} onLoadSuccess={onDocumentLoadSuccess}  renderMode="svg">
        <Page pageNumber={1} ref={firstPageRef} renderMode="svg"/>
      </Document>
      {firstPageUrl&&
        <img src={firstPageUrl} alt="First Page" />
       }
    </div>
  );
}
