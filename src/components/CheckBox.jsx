import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function Checkboxes() {
  return (
    <div>
      <Checkbox {...label} defaultChecked />
    </div>
  );
}
