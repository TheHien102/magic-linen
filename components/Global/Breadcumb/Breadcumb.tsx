import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

interface IBreadcrumb {
  data?: string[];
}

export default function Breadcrumb({ data }: IBreadcrumb) {
  console.log('data bredcrumb: ', data);
  const finals = data?.pop();

  return (
    <div role='presentation' onClick={handleClick}>
      <Breadcrumbs
        aria-label='breadcrumb'
        sx={{
          fontSize: '14px',
          color: '#b3b3b3',
          fontFamily: 'Josefin Sans',
          mb: 2,
        }}
      >
        {data &&
          data.map((_data) => (
            <Link key={_data} underline='hover' color='inherit' href='/'>
              {_data}
            </Link>
          ))}
        <Typography sx={{ fontSize: '14px', fontFamily: 'Josefin Sans' }}>
          {finals}
        </Typography>
      </Breadcrumbs>
    </div>
  );
}
