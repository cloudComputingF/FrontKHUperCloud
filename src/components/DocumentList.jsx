import * as React from "react";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import DocumentCard from "./DocumentCard";
import Modal from "./Modal";

export default function DocumentList({
  documentUrls,
  parentcheck,
  childChecked,
  onChildCheckboxChange,
}) {
  const [checkedImages, setCheckedImages] = useState({});
  const handleChildCheckboxChange = (dockey, isChecked) => {
    setCheckedImages((prevState) => ({
      ...prevState,
      [dockey]: isChecked,
    }));
    //console.log(isChecked);
    onChildCheckboxChange(dockey, isChecked);
  };
  return (
    <Box sx={{ mt: 20, display: "flex", flexWrap: "wrap" }}>
      {documentUrls.length > 0 ? (
        documentUrls.map((document, index) => (
          <DocumentCard
            key={index}
            docKey={document.docKey}
            docUrl={document.url}
            fileName={document.fileName}
            fileSize={document.fileSize}
            checked={checkedImages[document.dockey]?.checked || false}
            onChildCheckboxChange={handleChildCheckboxChange}
            parentcheck={parentcheck}
          />
        ))
      ) : null}
    </Box>
  );
}
