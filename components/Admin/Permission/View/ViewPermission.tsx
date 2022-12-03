import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useStorageContext } from '../../../../contexts/StorageContext';
import { FilterPermissions } from '../../../../services/types';
import { filterPermissions } from '../../../../utils/common';
import EditIcon from '@mui/icons-material/Edit';
import { getCookie } from 'typescript-cookie';
import { AccountApi } from '../../../../services/api/account';

const ViewPermissions = () => {
  // const { permissions } = useStorageContext();
  // const filterList: FilterPermissions[] = filterPermissions(permissions);
  // console.log('filterList: ', filterList);
  const [filterList, setFilterList] = useState<FilterPermissions[]>([]);

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

  useEffect(() => {
    getAllPermission();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '20px',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <Grid>
        <Box>
          <Grid
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <h2>View Permission</h2>
          </Grid>
          <TableContainer component={Paper} sx={{ mb: 20 }}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align='center'>Permissions</TableCell>
                  <TableCell align='right'></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterList &&
                  filterList.map((data) => (
                    <TableRow
                      key={data.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell
                        component='th'
                        scope='row'
                        sx={{ fontWeight: 'bold', fontSize: '20px' }}
                      >
                        {data.name}
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: 'flex',
                            gap: 2,
                            justifyContent: 'center',
                          }}
                        >
                          {data.list.map((_data, index) => (
                            <Typography
                              key={index}
                              sx={[
                                {
                                  textTransform: 'capitalize',
                                  bgcolor: '#4caf50',
                                  color: 'white',
                                  borderRadius: '15px',
                                  whiteSpace: 'nowrap',
                                  textAlign: 'center',
                                  //   fontWeight: 'bold',
                                  mb: 1,
                                  px: 2,
                                  py: 0.5,
                                },
                                _data.name.search('View')
                                  ? _data.name.search('Create') === 0
                                    ? { bgcolor: '#1976d2' }
                                    : { bgcolor: '#cddc39', color: 'black' }
                                  : { bgcolor: '#4caf50' },
                              ]}
                            >
                              {_data.name.split(' ')[0]}
                            </Typography>
                          ))}
                        </Box>
                      </TableCell>
                      <TableCell align='right'>
                        <Button variant='contained'>
                          <EditIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
    </Box>
  );
};

export default ViewPermissions;
