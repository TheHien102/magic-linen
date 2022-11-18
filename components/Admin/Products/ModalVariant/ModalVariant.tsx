import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Dispatch, SetStateAction } from 'react';
import { TextField } from '@mui/material';

interface IModalVariant {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ModalVariant({ open, setOpen }: IModalVariant) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
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
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <TextField
            label='Variant Name'
            fullWidth
            id='name'
            name='name'
            size='small'
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              mt: 3,
            }}
          >
            <Button variant='contained'>OK</Button>
            <Button variant='contained' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
