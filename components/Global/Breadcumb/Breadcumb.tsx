import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function Breadcrumb() {
  return (
    <div role='presentation' onClick={handleClick}>
      <Breadcrumbs
        aria-label='breadcrumb'
        sx={{ fontSize: '14px', color: '#b3b3b3', fontFamily: 'Josefin Sans' }}
      >
        <Link underline='hover' color='inherit' href='/'>
          Home
        </Link>
        <Link
          underline='hover'
          color='inherit'
          href='/material-ui/getting-started/installation/'
        >
          Account
        </Link>
        <Typography sx={{ fontSize: '14px', fontFamily: 'Josefin Sans' }}>
          Sign In
        </Typography>
      </Breadcrumbs>
    </div>
  );
}
