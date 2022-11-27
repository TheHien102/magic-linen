import { Box, Typography } from '@mui/material';
import React from 'react';
import StarIcon from '@mui/icons-material/Star';

type Props = {};

const StarsReview = (props: Props) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <StarIcon sx={{ color: '#fec600', fontSize: '20px' }} />
      <StarIcon sx={{ color: '#fec600', fontSize: '20px' }} />
      <StarIcon sx={{ color: '#fec600', fontSize: '20px' }} />
      <StarIcon sx={{ color: '#fec600', fontSize: '20px' }} />
      <StarIcon sx={{ color: '#fec600', fontSize: '20px' }} />
      <Typography
        sx={{
          textDecoration: 'underline',
          fontFamily: 'Josefin Sans',
          ml: 1,
          fontWeight: 'bold',
        }}
      >
        54 reviews
      </Typography>
    </Box>
  );
};

export default StarsReview;
