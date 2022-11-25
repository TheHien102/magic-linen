import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Grid } from '@mui/material';

export default function Filter() {
  return (
    <>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography>COLOR</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              backgroundColor: 'blue',
              borderRadius: '100%',
              width: 40,
              height: 40,
              border: '1px solid #ebeae7',
            }}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2a-content'
          id='panel2a-header'
        >
          <Typography>SIZE</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box
                  sx={{
                    border: '2px solid black',
                    textAlign: 'center',
                    py: 1.5,
                    cursor: 'pointer',
                  }}
                >
                  XS
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    border: '1px solid #ebeae7',
                    textAlign: 'center',
                    py: 1.5,
                  }}
                >
                  S
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    border: '1px solid #ebeae7',
                    textAlign: 'center',
                    py: 1.5,
                  }}
                >
                  M
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    border: '1px solid #ebeae7',
                    textAlign: 'center',
                    py: 1.5,
                  }}
                >
                  L
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    border: '1px solid #ebeae7',
                    textAlign: 'center',
                    py: 1.5,
                  }}
                >
                  XL
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    border: '1px solid #ebeae7',
                    textAlign: 'center',
                    py: 1.5,
                  }}
                >
                  XXL
                </Box>
              </Grid>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel3a-content'
          id='panel3a-header'
        >
          <Typography>PRICE</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontFamily: 'Josefin Sans', cursor: 'pointer' }}>
            $50 - $100
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Josefin Sans',
              cursor: 'pointer',
              color: '#94a2b2',
              fontWeight: 600,
            }}
          >
            $100 - $150
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
