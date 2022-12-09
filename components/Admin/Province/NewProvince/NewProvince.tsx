import { Box, Button, Grid, TextField } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { IUpdateProvince } from '../../../../services/interface';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

interface INewProvince {
  data: any;
  nameList: IUpdateProvince[];
  setNameList: Dispatch<SetStateAction<IUpdateProvince[]>>;
}

const NewProvince = ({ data, nameList, setNameList }: INewProvince) => {
  const handleOnChangeItemName = (_id: number, property: string) => {
    let dataUpdate = {
      id: _id,
      name: property,
    };
    setNameList(nameList.map((data) => (data.id === _id ? dataUpdate : data)));
  };

  const handleDelete = (_id: number) => {
    setNameList(nameList.filter((it) => it.id !== _id));
  };

  return (
    <Grid container sx={{ marginTop: '5px' }} spacing={1}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label={'Property'}
            onChange={(e) => handleOnChangeItemName(data.id, e.target.value)}
            fullWidth
            size='small'
            defaultValue={data.name}
          />
          <Button
            sx={{ mt: 0.3 }}
            variant='outlined'
            color='error'
            onClick={() => handleDelete(data.id)}
          >
            <IndeterminateCheckBoxIcon color='error' />
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default NewProvince;
