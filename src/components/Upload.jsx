import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FileUploadIcon from '@mui/icons-material/FileUpload';

export default function Upload() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;

    input.onchange = (e) => {
      const files = e.target.files;
      setUploading(true);
      setUploading(false);
    };

    input.click();
    handleClose();
  };

  return (
    <div>
      <Button
        id="basic-button"
        startIcon={<FileUploadIcon />} variant="contained"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {uploading ? '업로드 중...' : '올리기'}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleFileUpload}>파일 올리기</MenuItem>
        <MenuItem onClick={handleFileUpload}>폴더 올리기</MenuItem>
      </Menu>
    </div>
  );
}