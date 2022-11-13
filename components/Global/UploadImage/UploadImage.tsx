import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface UploadFileProps {
  onFileChange: (file: File) => void;
  setImagePath?: any;
  uploadComplete?: boolean;
  setUploadComplete?: any;
}

const UploadImage: React.FC<UploadFileProps> = ({
  uploadComplete,
  setUploadComplete,
  onFileChange,
  setImagePath,
}) => {
  const [file, setFile] = useState<any>();
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      onFileChange(acceptedFiles[0]);
      setFile(acceptedFiles[0]);
      console.log('file: ', file);

      const reader = new FileReader();
      reader.readAsDataURL(acceptedFiles[0]);
      reader.onloadend = () => {
        console.log('path: ', reader.result);
        setImagePath(reader.result);
        setUploadComplete(true);
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
            color: '#000',
            ':hover': {
              backgroundColor: '#b59205',
            },
          }}
          variant='contained'
          size='small'
        >
          Choose Files
        </Button>
        <Typography sx={{ marginLeft: '10px' }} color={'black'}>
          {file ? ` ${file.path}` : 'No file chosen'}
        </Typography>
      </Box>
    </Box>
  );
};

export default UploadImage;
