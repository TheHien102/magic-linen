import React, { useRef } from 'react';
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
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

interface IColorItem {
  formikData: any;
  handleDelete: any;

  data: any;
}

const ColorItem = ({ data, formikData, handleDelete }: IColorItem) => {
  const valueRef = useRef<any>(0);

  const handleOnBlur = () => {
    let dataFormik = {
      name: 'color',
      property: data.label,
      addPrice: valueRef.current.value,
    };
    if (valueRef.current.value != '') {
      formikData.push(dataFormik);
    }
  };

  return (
    <Grid container sx={{ marginTop: '5px' }} spacing={1}>
      <Grid item xs={12} md={6}>
        <ListItem>
          <Chip
            label={'blue'}
            sx={{
              backgroundColor: data.label,
              color: data.label,
              border: '1px solid gray',
            }}
          />
        </ListItem>
      </Grid>
      <Grid item xs={12} md={4.5}>
        <TextField
          label={'Price'}
          inputRef={valueRef}
          onBlur={() => handleOnBlur()}
          fullWidth
          size='small'
        />
      </Grid>
      <Grid item xs={12} md={1.5}>
        <Button
          sx={{ mt: 0.3 }}
          variant='outlined'
          color='error'
          onClick={handleDelete}
        >
          <IndeterminateCheckBoxIcon color='error' />
        </Button>
      </Grid>
    </Grid>
  );
};

export default ColorItem;
