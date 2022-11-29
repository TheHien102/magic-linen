import { Box, Button, Paper, Typography, Modal } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ColorPicker, useColor } from 'react-color-palette';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ColorItem from './ColorItem';
import { VariantParams } from '../../../../services/types';

let nextId = 0;

interface IColor {
  formikData: any;
  colorArray: VariantParams[];
  setColorArray: Dispatch<SetStateAction<VariantParams[]>>;
}

const Color = ({ formikData, colorArray, setColorArray }: IColor) => {
  const [color, setColor] = useColor('hex', '#121212');
  const [openModalColor, setOpenModalColor] = useState(false);
  const handleOpenModalColor = () => setOpenModalColor(true);
  const handleCloseModalColor = () => setOpenModalColor(false);

  const handleOnChange = (data: VariantParams, price: number) => {
    let newColor = {
      id: data.id,
      name: 'size',
      property: data.property,
      addPrice: price,
    };

    setColorArray(
      colorArray.map((item) =>
        item.property === data.property ? newColor : item
      )
    );
  };

  const handleDelete = (i: string) => () => {
    setColorArray(colorArray.filter((item) => item.property !== i));
  };

  const handleOK = () => {
    setColorArray(
      // Replace the state
      [
        // with a new array
        ...colorArray, // that contains all the old items
        {
          id: nextId++,
          name: 'color',
          property: color.hex,
          addPrice: 0,
        },
      ]
    );
    handleCloseModalColor();
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
            <Button variant='contained' onClick={() => handleOK()}>
              OK
            </Button>
            <Button variant='contained' onClick={handleCloseModalColor}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
      <Paper
        sx={{
          listStyle: 'none',
          m: 0,
          border: '2px solid hsla(48,8%,88%,.6)',
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
        {colorArray.map((data) => (
          <ColorItem
            data={data}
            key={data.property}
            handleOnChange={handleOnChange}
            handleDelete={handleDelete(data.property)}
            formikData={formikData}
          />
        ))}
      </Paper>
    </>
  );
};

export default Color;
