import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  dividerClasses,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Select,
  styled,
  TextField,
  Typography,
  Modal,
} from '@mui/material';
import React, { useState } from 'react';
import { ColorPicker, useColor } from 'react-color-palette';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

interface ChipData {
  key: number;
  label: string;
}

let nextId = 0;

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const Color = () => {
  const [color, setColor] = useColor('hex', '#121212');
  const [openModalColor, setOpenModalColor] = useState(false);
  const handleOpenModalColor = () => setOpenModalColor(true);
  const handleCloseModalColor = () => setOpenModalColor(false);
  const handleGetColor = () => {};

  const [chipData, setChipData] = useState<readonly ChipData[]>([]);

  const handleDelete = (i: number) => () => {
    setChipData(chipData.filter((item) => item.key !== i));
    // console.log('chipDa');
  };

  return (
    <>
      <Modal
        open={openModalColor}
        onClose={handleCloseModalColor}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
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
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Choose color
          </Typography>
          <ColorPicker
            width={340}
            height={228}
            color={color}
            onChange={setColor}
            hideHSV
            dark
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              mt: 3,
            }}
          >
            <Button
              variant='contained'
              onClick={
                () =>
                  setChipData(
                    // Replace the state
                    [
                      // with a new array
                      ...chipData, // that contains all the old items
                      { key: nextId++, label: color.hex }, // and one new item at the end
                    ]
                  )
                // console.log('object: ', color)
              }
            >
              OK
            </Button>
            <Button variant='contained' onClick={handleCloseModalColor}>
              Cancel
            </Button>
          </Box>
          {/* <ColorPicker /> */}
        </Box>
      </Modal>
      <Paper
        sx={{
          listStyle: 'none',
          m: 0,
          border: '1px solid gray',
          p: 3,
          borderRadius: 2,
          position: 'relative',
        }}
        component='ul'
      >
        <Button
          onClick={handleOpenModalColor}
          sx={{ fontWeight: 'bold' }}
          variant='contained'
        >
          New Color
          <ColorLensIcon />
        </Button>

        {/* {chipData.map((data, index) => {
          return (
            <ListItem key={data.key}>
              <Chip
                label={'blue'}
                sx={{
                  backgroundColor: data.label,
                  color: data.label,
                  border: '1px solid gray',
                }}
                onDelete={handleDelete(data)}
              />
            </ListItem>
          );
        })} */}
        {chipData.map((data, index) => (
          <Grid container sx={{ marginTop: '5px' }} key={data.key} spacing={1}>
            <Grid item xs={12} md={6}>
              <ListItem>
                <Chip
                  label={'blue'}
                  sx={{
                    backgroundColor: data.label,
                    color: data.label,
                    border: '1px solid gray',
                  }}
                  //   onDelete={handleDelete(data)}
                />
              </ListItem>
            </Grid>
            <Grid item xs={12} md={4.5}>
              <TextField label={'Price'} fullWidth size='small' />
            </Grid>
            <Grid item xs={12} md={1.5}>
              <Button
                sx={{ mt: 0.3 }}
                variant='outlined'
                color='error'
                onClick={handleDelete(data.key)}
              >
                <IndeterminateCheckBoxIcon color='error' />
              </Button>
            </Grid>
          </Grid>
        ))}
      </Paper>
    </>
  );
};

export default Color;
