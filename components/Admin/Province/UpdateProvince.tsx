import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { getCookie } from '../../../services/cookies';
import { IUpdateProvince } from '../../../services/interface';
import { useFormik } from 'formik';
import * as yup from 'yup';
import NewProvince from './NewProvince/NewProvince';
import { ProvinceApi } from '../../../services/api/province';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { ProvinceParam } from '../../../services/types';

let nameId = -1;
const DISTRICT_VALUE = '2';
const WARD_VALUE = '3';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const validationSchema = yup.object({
  names: yup.array(yup.string().required()),
  level: yup.number(),
  parentId: yup.number(),
});

const UpdateProvince = () => {
  const dataSelect = [
    { name: 'City', id: 1 },
    { name: 'District', id: 2 },
    { name: 'Ward', id: 3 },
  ];

  const [nameList, setNameList] = useState<IUpdateProvince[]>([]);
  const [dataParent, setDataParent] = useState<ProvinceParam[]>([]);
  const [itemGroup, setItemGroup] = useState('');

  const formik = useFormik({
    initialValues: {
      names: [] as string[],
      level: 0,
      parentId: -1,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const token = await getCookie('token');

      try {
        if (token) {
          formik.values.names = nameList
            .filter((it) => it.name.length > 0)
            .map((it) => it.name);
          console.log('values: ', values);
          // ProvinceApi.createProvince(token, values).then((res) => {
          //   console.log('res: ', res);
          // });
        }
      } catch (error) {
        console.log('error: ', error);
      }
    },
  });

  const SEARCH_PARAMS = '';

  const getParent = (level: number) => {
    ProvinceApi.listProvince(SEARCH_PARAMS, level).then((res) => {
      console.log('res: ', res.data.data);
      setDataParent(res.data.data);
    });
  };

  useEffect(() => {
    // ProvinceApi.listProvince().then((res) => {
    //   console.log('res: ', res);
    //   //   setDataParent(res)
    // });
  }, []);

  const handleChangeItemGroup = (event: SelectChangeEvent) => {
    setItemGroup(event.target.value);
    formik.values.level = Number(event.target.value);
    let idSelect = Number(event.target.value);
    if (idSelect === 2) {
      getParent(Number(event.target.value) - 1);
    } else {
      getParent(Number(event.target.value) - 2);
    }
  };

  const handleAddNewProvince = () => {
    let data = { id: nameId--, name: '' };
    setNameList([...nameList, data]);
  };

  const handleSelectProvince = (id: number) => {
    ProvinceApi.getChildProvince(id)
      .then((res) => {
        console.log('res province: ', res);
      })
      .catch((e) => console.log('error: ', e));
  };

  return (
    <Grid>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <Grid
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            sx={{ position: 'relative' }}
          >
            <h2>Create Province</h2>
            <Button
              sx={{
                position: 'absolute',
                right: 0,
                top: '20px',
                fontWeight: 'bold',
              }}
              type='submit'
              color='primary'
              variant='contained'
            >
              Create
            </Button>
          </Grid>
          <Grid
            container
            sx={{ marginTop: '5px', maxWidth: '1200px', marginX: 'auto' }}
            spacing={2.5}
          >
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  border: '2px solid hsla(48,8%,88%,.6)',
                  '&:first-of-type': { mt: 0 },
                  p: 3,
                  borderRadius: 2,
                  position: 'relative',
                }}
              >
                {nameList.map((data) => (
                  <NewProvince
                    key={data.id}
                    data={data}
                    nameList={nameList}
                    setNameList={setNameList}
                  />
                ))}
                <Button
                  variant='outlined'
                  sx={{ mt: 1, width: '100% ' }}
                  onClick={() => handleAddNewProvince()}
                >
                  <AddBoxIcon />
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size='small'>
                <InputLabel id='level'>Level</InputLabel>
                <Select
                  labelId='level'
                  id='level'
                  input={<OutlinedInput label='Level' />}
                  MenuProps={MenuProps}
                  value={itemGroup}
                  onChange={handleChangeItemGroup}
                >
                  {dataSelect.map((it) => (
                    <MenuItem key={it.id} value={it.id}>
                      <ListItemText primary={it.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {itemGroup == DISTRICT_VALUE && (
                <FormControl fullWidth size='small' sx={{ mt: 3 }}>
                  <Select
                    labelId='parent'
                    id='parent'
                    input={<OutlinedInput />}
                    MenuProps={MenuProps}
                    onChange={(e: SelectChangeEvent) =>
                      (formik.values.parentId = Number(e.target.value))
                    }
                  >
                    {dataParent &&
                      dataParent.map((it) => (
                        <MenuItem key={it.id} value={it.id}>
                          <ListItemText primary={it.name} />
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}

              {itemGroup == WARD_VALUE && (
                <>
                  <FormControl fullWidth size='small' sx={{ mt: 3 }}>
                    <Select
                      labelId='parent'
                      id='parent'
                      input={<OutlinedInput />}
                      MenuProps={MenuProps}
                      onChange={(e) =>
                        handleSelectProvince(Number(e.target.value))
                      }
                    >
                      {dataParent &&
                        dataParent.map((it) => (
                          <MenuItem key={it.id} value={it.id}>
                            <ListItemText primary={it.name} />
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth size='small' sx={{ mt: 3 }}>
                    <Select
                      labelId='parent'
                      id='parent'
                      input={<OutlinedInput />}
                      MenuProps={MenuProps}
                      onChange={(e: SelectChangeEvent) =>
                        (formik.values.parentId = Number(e.target.value))
                      }
                    >
                      {dataParent &&
                        dataParent.map((it) => (
                          <MenuItem key={it.id} value={it.id}>
                            <ListItemText primary={it.name} />
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </>
              )}
            </Grid>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
};

export default UpdateProvince;
