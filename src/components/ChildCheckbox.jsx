import React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState,useEffect } from "react";
function ChildCheckboxes({ docKey, checked, onChange,parentcheck }) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxChange = (event) => {
    const newChecked = event.target.checked;
    setIsChecked(newChecked);
    onChange(docKey, newChecked);
  };
  
  useEffect(() => {
    setIsChecked(parentcheck);
  }, [parentcheck]);

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={isChecked}
          onChange={handleCheckboxChange}
          color="primary"
        />
      }
      label=""
    />
  );
}


export default ChildCheckboxes;
