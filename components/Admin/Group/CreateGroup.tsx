import { TextFields } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useStorageContext } from '../../../contexts/StorageContext';
import { AccountApi } from '../../../services/api/account';
import { GroupApi } from '../../../services/api/group';
import { getCookie } from '../../../services/cookies';
import {
  FilterPermissions,
  GroupParams,
  PermissionPrams,
} from '../../../services/types';
import { filterPermissions, getAllPermission } from '../../../utils/common';
import { groupSuffix } from '../../../utils/dataConfig';

type CreateGroupAdminProps = {
  update: boolean;
};

const CreateGroupAdmin = ({ update }: CreateGroupAdminProps) => {
  // const { permissions } = useStorageContext();
  // const filterList: FilterPermissions[] = filterPermissions(permissions);
  // console.log('filter create admin: ', filterList);
  const [allowEnable, setAllowEnable] = useState(true);
  const [menuItem, setMenuItem] = useState('');
  const [groupList, setGroupList] = useState<GroupParams[]>([]);
  const [nameGroup, setNameGroup] = useState(-1);
  const [groupName, setGroupName] = useState('');
  const [listChecked, setListChecked] = useState<FilterPermissions[]>([]);
  const [filterList, setFilterList] = useState<FilterPermissions[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const router = useRouter();
  const getListById = async (id: number) => {
    const token = await getCookie('token');
    if (token) {
      const result = await GroupApi.listGroupById(token, id);
      if (result) {
        if (result.data) {
          let filterListTemp: FilterPermissions[] = filterPermissions(
            result.data.permissions
          );
          setListChecked(filterListTemp);
        } else {
          setListChecked([]);
        }
      }
    }
  };
  // let newList = getAllPermission();
  // setFilterList(newList);

  const getAllPermission = async () => {
    const token = await getCookie('token');
    if (token) {
      const result = await AccountApi.permissionsList(token);

      if (result) {
        let filterListTemp: FilterPermissions[] = filterPermissions(
          result.data.data
        );
        setFilterList(filterListTemp);
        console.log('all permissions: ', result.data.data);
      }
    }
  };

  const handleSave = async () => {
    let newList: PermissionPrams[] = [];
    for (let i = 0; i < listChecked.length; i++) {
      newList = newList.concat(listChecked[i].list);
    }
    let data = {
      id: nameGroup,
      name: menuItem,
      description: menuItem,
      permissions: newList,
    };

    let dataCreate = {
      kind: Number(groupKind),
      name: groupName,
      description: groupName,
      permissions: newList,
    };

    const token = await getCookie('token');
    if (token) {
      if (update) {
        const result = await GroupApi.updateGroupById(token, data);
        if (result) {
          alert('Update success!');
          router.reload();
        }
      } else {
        console.log('dataCreate: ', dataCreate);
        const result = await GroupApi.createGroup(token, dataCreate);
        if (result) {
          console.log('result create: ', result);
          setOpenSnackbar(true);
          setTimeout(() => {
            router.reload();
          }, 1000);
        }
      }
    }
    console.log('newList: ', newList);
    console.log('save: ', data);
  };

  const getAllGroup = async () => {
    const token = await getCookie('token');
    if (token) {
      const result = await GroupApi.listAllGroup(token);

      if (result) {
        // console.log('result all group: ', result.data.data);
        result.data.data.shift();
        setGroupList(result.data.data);
        // console.log('list all group shift: ', result.data.data.shift());
      }
    }
  };

  useEffect(() => {
    getAllPermission();
    getAllGroup();
  }, []);

  const handleChangeNameGroup = (e: any) => {
    setNameGroup(e.target.value);
    getListById(e.target.value);
  };

  const handleChangeGroupName = (e: any) => {
    setGroupName(e.target.value);
  };

  const handleGetMenuItemValue = (e: any) => {
    setMenuItem(e.target.innerText);
  };

  const isChecked = (data: PermissionPrams) => {
    if (listChecked?.length > 0) {
      let index = -1;
      listChecked.map((it) => {
        if (data.name.includes(it.name)) {
          index = it.list.findIndex((_it) => data.id === _it.id);
        }
      });
      if (index !== -1) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  const handleModifyChecked = (data: PermissionPrams) => {
    if (!allowEnable) {
      // Check if any permission is checked
      if (listChecked?.length > 0) {
        // if current option is checked
        if (isChecked(data)) {
          //Remove from listChecked
          setListChecked(
            listChecked.map((it) => {
              if (data.name.includes(it.name)) {
                it.list = it.list.filter((_it) => _it.id !== data.id);
                return it;
              } else {
                return it;
              }
            })
          );
        } else {
          // listChecked has list include data name
          if (
            listChecked.findIndex((it) => data.name.includes(it.name)) !== -1
          ) {
            //checked
            setListChecked(
              listChecked?.map((it) => {
                if (data.name.includes(it.name)) {
                  it.list.push(data);
                  return it;
                } else {
                  return it;
                }
              })
            );
          } else {
            //if listChecked dont have element contain data then create new to add
            let newList: FilterPermissions = {
              name: data.name.split(' ')[1],
              list: [data],
            };
            setListChecked((listChecked) => [...listChecked, newList]);
          }
        }
      } else {
        // if listChecked is empty then create newList and add
        let newList: FilterPermissions = {
          name: data.name.split(' ')[1],
          list: [data],
        };
        setListChecked([newList]);
      }
    }
  };
  const [groupKind, setGroundKind] = useState('');

  const handleChangeGroupKind = (event: SelectChangeEvent) => {
    setGroundKind(event.target.value as string);
    setAllowEnable(false);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openSnackbar}
        autoHideDuration={3000}
      >
        <Alert severity='success' sx={{ width: '100%' }}>
          Create Group Complete !
        </Alert>
      </Snackbar>
      <Grid
        container
        sx={{ marginTop: '5px', maxWidth: '1300px' }}
        spacing={2.5}
      >
        <Grid item xs={12} md={4}>
          <FormControl fullWidth size='small'>
            {update ? (
              <>
                <InputLabel id='nameGroup'>Group Name</InputLabel>
                <Select
                  // labelId='nameGroup'
                  id='nameGroup'
                  label='Group Name'
                  value={nameGroup}
                  sx={{ color: 'black' }}
                  onChange={handleChangeNameGroup}
                >
                  {groupList &&
                    groupList.map((data) => (
                      <MenuItem
                        key={data.id}
                        value={data.id}
                        onClick={handleGetMenuItemValue}
                        sx={{ textTransform: 'capitalize' }}
                      >
                        {data.name}
                      </MenuItem>
                    ))}
                </Select>
              </>
            ) : (
              <>
                <TextField
                  id='nameGroup'
                  label='Group Name'
                  value={groupName}
                  onChange={handleChangeGroupName}
                  size='small'
                  variant='outlined'
                />
                <FormControl fullWidth sx={{ mt: 3 }} size='small'>
                  <InputLabel id='demo-simple-select-label'>
                    Group Kind
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={groupKind}
                    label='Group Kind'
                    onChange={handleChangeGroupKind}
                  >
                    <MenuItem value={1}>Super Admin</MenuItem>
                    <MenuItem value={2}>Customer</MenuItem>
                    <MenuItem value={3}>Employee</MenuItem>
                    <MenuItem value={4}>Colaborator</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}

            {update && (
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Box>
                  <Button
                    variant='contained'
                    onClick={() => setAllowEnable(false)}
                  >
                    Modify
                  </Button>
                </Box>
              </Box>
            )}
            <Box sx={{ width: 'fit-content', marginLeft: 'auto', mt: 3 }}>
              <Button
                variant='contained'
                color='success'
                onClick={() => handleSave()}
              >
                Save
              </Button>
            </Box>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {filterList &&
              filterList.map((data) => (
                <Box
                  key={data.name}
                  sx={{
                    border: '2px solid hsla(48,8%,88%,.6)',
                    p: 3,
                    borderRadius: 2,
                    position: 'relative',
                    '&:first-of-type': { mt: 0 },
                    width: '48%',
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '22px',
                    }}
                  >
                    {data.name + groupSuffix.title}
                  </Typography>
                  {data.list.map((_data) => (
                    <Box
                      key={_data.name}
                      onClick={() => handleModifyChecked(_data)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: 'fit-content',
                        cursor: 'pointer',
                      }}
                    >
                      <Checkbox
                        disabled={allowEnable}
                        checked={isChecked(_data)}
                      />
                      <Typography>{_data.name}</Typography>
                    </Box>
                  ))}
                </Box>
              ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateGroupAdmin;
