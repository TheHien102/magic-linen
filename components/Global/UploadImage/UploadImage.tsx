import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface UploadFileProps {
  onFileChange: (file: File) => void;
  setImagePath?: any;
  uploadComplete?: boolean;
  hideText?: boolean;
  setUploadComplete?: any;
  handleOpen: any;
  title: string;
}

const UploadImage: React.FC<UploadFileProps> = ({
  title,
  hideText,
  uploadComplete,
  setUploadComplete,
  onFileChange,
  handleOpen,
  setImagePath,
}) => {
  const [file, setFile] = useState<any>();
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      onFileChange(acceptedFiles[0]);
      setFile(acceptedFiles[0]);

      const reader = new FileReader();
      reader.readAsDataURL(acceptedFiles[0]);
      reader.onloadend = () => {
        setImagePath(reader.result);
        setUploadComplete(true);
        handleOpen();
      };
    },
  });

  return (
    <Box {...getRootProps()}>
      <Box color={'black'} sx={{ display: 'flex', alignItems: 'center' }}>
        <input {...getInputProps()} />
        <Button
          sx={{
            backgroundColor: '#efc109',
            fontWeight: 'bold',
            color: '#000',
            ':hover': {
              backgroundColor: '#b59205',
            },
          }}
          variant='contained'
          size='small'
        >
          {title}
        </Button>
        {!hideText && (
          <Typography sx={{ marginLeft: '10px' }} color={'black'}>
            {file ? ` ${file.path}` : 'No file chosen'}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default UploadImage;
