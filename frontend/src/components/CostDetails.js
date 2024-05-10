import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const CostDetails = ({cost}) => {

    return (
        <Accordion sx={{my: 2}}>
            <AccordionSummary
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <Box sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: "100%"
                }}>
                    <Typography sx={{fontWeight: 500, fontSize: '16px'}}>{cost.title}</Typography>
                    <Typography sx={{fontWeight: 700, fontSize: '20px'}}>{cost.amount}</Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Typography sx={{fontWeight: 400, fontSize: '14px'}}>{cost.description}</Typography>
            </AccordionDetails>
        </Accordion>
    )
}

export default CostDetails;