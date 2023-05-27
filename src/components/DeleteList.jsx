import { Box, Typography } from "@mui/material";
import { useState } from "react";
import DeleteCard from "./DeleteCard";

export default function DeleteList({
  deleteList,
  parentcheck,
  childChecked,
  onChildCheckboxChange,
}) {
  const [checkedItems, setCheckedItems] = useState({});

  const handleChildCheckboxChange = (itemId, isChecked) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [itemId]: isChecked,
    }));
    onChildCheckboxChange(itemId, isChecked);
  };

  return (
    <Box
      sx={{
        mt: 20,
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {deleteList.length > 0 ? (
        deleteList.map((item, index) => {
          let itemId;
          if (item.imgKey) {
            itemId = item.imgKey;
          } else if (item.docKey) {
            itemId = item.docKey;
          }

          return (
            <DeleteCard
              key={index}
              itemId={itemId}
              itemUrl={item.url}
              fileName={item.fileName}
              fileSize={item.fileSize}
              checked={checkedItems[itemId]?.checked || false}
              onChildCheckboxChange={handleChildCheckboxChange}
              parentcheck={parentcheck}
            />
          );
        })
      ) : (
        null
      )}
    </Box>
  );
}
