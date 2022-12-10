import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import UploadImage from '../../Global/UploadImage/UploadImage';
import { useState, useCallback, Dispatch, SetStateAction } from 'react';
import Cropper from 'react-easy-crop';
import { Slider } from '@mui/material';
import getCroppedImg from './CropImage/CropImage';
import { AssetsParams } from '../../../services/types';

interface IModalImage {
  title: string;
  arrayImage?: AssetsParams[];
  setMainImage?: Dispatch<SetStateAction<string>>;
  setArrayImage?: Dispatch<SetStateAction<AssetsParams[]>>;
}

let fakeId = -1;

export default function ModalImage({
  arrayImage,
  setMainImage,
  setArrayImage,
  title,
}: IModalImage) {
  const [open, setOpen] = useState(false);
  const [openModalCrop, setOpenModalCrop] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);

  const [fileImage, setFileImage] = useState<File>();
  const [imagePath, setImagePath] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const closeResetImage = () => {
    onClose();
    handleClose();
    setOpenModalCrop(false);
  };

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imagePath, croppedAreaPixels);

      setCroppedImage(croppedImage);
      if (setArrayImage) {
        console.log('set array miage');
        let data = {
          id: fakeId--,
          type: 'image',
          link: '' as any,
        };
        fetch(croppedImage)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], 'dot.png', blob);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = async () => {
              data.link = await reader.result;
              console.log('assets: ', data);
              if (arrayImage) {
                setArrayImage(arrayImage => [...arrayImage, data]);
                console.log('set ok: ');
              } else {
                setArrayImage([data]);
                console.log('set ok else: ');
              }
            };
          });
      }
      if (setMainImage) {
        console.log('run in set main img');
        fetch(croppedImage)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], 'dot.png', blob);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = async () => {
              setMainImage((await reader.result) as string);
            };
          });
      }
      closeResetImage();
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);
  return (
    <div>
      <Box sx={{ fontWeight: 'bold' }}>
        <UploadImage
          handleOpen={handleOpen}
          hideText={true}
          title={title}
          setUploadComplete={setOpenModalCrop}
          setImagePath={setImagePath}
          onFileChange={file => {
            setFileImage(file);
          }}
        />
      </Box>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: 'absolute' as 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 600,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id='transition-modal-title' variant='h6' component='h2'>
              Choose file to upload
            </Typography>

            {openModalCrop && (
              <>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: 400,
                  }}
                >
                  <Cropper
                    image={imagePath}
                    crop={crop}
                    zoom={zoom}
                    aspect={300 / 400}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                  />
                </Box>
                <Box>
                  <Slider
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby='Zoom'
                    onChange={(e: any, zoom: any) => setZoom(Number(zoom))}
                  />
                </Box>
                <Button
                  onClick={showCroppedImage}
                  variant='contained'
                  color='primary'
                >
                  Upload Image
                </Button>
                <Button
                  onClick={() => closeResetImage()}
                  variant='contained'
                  sx={{ backgroundColor: '#f50057', marginLeft: '30px' }}
                >
                  Cancel
                </Button>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
