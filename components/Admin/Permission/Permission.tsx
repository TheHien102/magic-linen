import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { AccountApi } from '../../../services/api/account';
import { getCookie } from '../../../services/cookies';
import { FilterPermissions, PermissionPrams } from '../../../services/types';
const validationSchema = yup.object({
  name: yup.string().required('Username is required'),
  action: yup.string().required('Password is required'),
  description: yup.string().required('Email is required'),
  nameGroup: yup.string().required('Group name is required'),
  showMenu: yup.boolean(),
});

interface IPermission {
  permissionsList: FilterPermissions[];
}

interface IItemGroup {
  name: string;
  list: PermissionPrams[];
}

let listItemGroup = [
  { name: 'Update' },
  { name: 'Create' },
  { name: 'View' },
  { name: 'View All' },
];

const tableArray = [
  'Account',
  'Address',
  'Cart',
  'Category',
  'Group',
  'News',
  'Order',
  'Permission',
  'Product',
  'Province',
];
let newPermissionList: FilterPermissions[];

const Permission = ({ permissionsList }: IPermission) => {
  const [nPermissionList, setNPermissionList] = useState<FilterPermissions[]>(
    []
  );

  useEffect(() => {
    newPermissionList = permissionsList;
    tableArray.map((table) => {
      if (
        permissionsList.findIndex((permission) =>
          permission.name.includes(table)
        ) === -1
      ) {
        let newData = { name: table, list: [] };
        newPermissionList.push(newData);
      }
    });
    setNPermissionList(newPermissionList);
  }, []);

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: '',
      action: '',
      showMenu: true,
      description: '',
      nameGroup: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      //   router.push('/dashboard');
      const token = await getCookie('token');
      formik.values.showMenu = showMenu;
      console.log('values: ', values);
      try {
        if (token) {
          const result = await AccountApi.createPermission(token, values);
          if (result) {
            // router.push('/permission/view-permission');
            console.log('create permission complete ');
          }
        }
      } catch (error) {
        console.log(' error: ', error);
      }
    },
  });

  const [showMenu, setShowMenu] = useState(true);
  const [kind, setKind] = useState('');
  const [itemGroup, setItemGroup] = useState<IItemGroup>();
  const [itemGroupSelect, setItemGroupSelect] = useState('');

  const handleChangeKind = (event: SelectChangeEvent) => {
    setKind(event.target.value);
    const item = newPermissionList.find((it) => it.name === event.target.value);
    console.log('itemGroup: ', item);
    setItemGroup(item);
    formik.values.nameGroup = event.target.value;
  };

  const checkPermission = (name: string) => {
    //If finded then not show to list
    const index = itemGroup?.list.findIndex((it) => {
      it.name.toLocaleLowerCase().includes(name.toLocaleLowerCase());
    });
    if (index === -1) {
      return true;
    } else return false;
  };

  const handleChangeItemGroup = (event: SelectChangeEvent) => {
    formik.values.name = event.target.value + ' ' + formik.values.nameGroup;
    formik.values.description =
      event.target.value + ' ' + formik.values.nameGroup;

    let last = event.target.value.split(' ').includes('All')
      ? 'List'
      : event.target.value.split(' ')[0] === 'View'
      ? 'Get'
      : event.target.value.split(' ')[0];
    let formatString = '/v1/' + formik.values.nameGroup + '/' + last;
    formik.values.action = formatString.toLowerCase();
    console.log('last: ', last);

    setItemGroupSelect(event.target.value);
  };

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          sx={{ position: 'relative' }}
        >
          <h2>Create Permission</h2>
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
          sx={{ marginTop: '5px', maxWidth: '800px', marginX: 'auto' }}
          spacing={2.5}
        >
          <Grid item xs={12} md={6}>
            <FormControl fullWidth size='small'>
              <InputLabel id='nameGroup'>Group Name</InputLabel>
              <Select
                labelId='nameGroup'
                id='nameGroup'
                value={kind}
                label='Group Name'
                sx={{ color: 'black' }}
                onChange={handleChangeKind}
                error={
                  formik.touched.nameGroup && Boolean(formik.errors.nameGroup)
                }
              >
                {nPermissionList &&
                  nPermissionList.map(
                    (data: any, index: number) =>
                      // small than 4 because has 4 permission 'Create, Update, View, View All'
                      data.list.length < 4 && (
                        <MenuItem key={index} value={data.name}>
                          {data.name}
                        </MenuItem>
                      )
                  )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth size='small'>
              <InputLabel id='itemGroup'>Item Group</InputLabel>
              <Select
                labelId='itemGroup'
                id='itemGroup'
                label='Item Group'
                sx={{ color: 'black' }}
                value={itemGroupSelect}
                onChange={handleChangeItemGroup}
                // error={formik.touched.kind && Boolean(formik.errors.kind)}
              >
                {listItemGroup.length > 0 &&
                  listItemGroup.map(
                    (data) =>
                      checkPermission(data.name) && (
                        <MenuItem key={data.name} value={data.name}>
                          {data.name + ' ' + itemGroup?.name}
                        </MenuItem>
                      )
                  )}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormGroup>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label='Show Menu'
                value={showMenu}
                onChange={() => setShowMenu(!showMenu)}
              />
            </FormGroup>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Permission;
