'use client'
import React from 'react';
import { Card, CardContent, Typography, Link, Box, Stack } from '@mui/material';
import { useDataContext } from '../contexts/DataContextProvider';
import { SvgIcon } from '@mui/material';
import { AgentIcon } from './Icons/AgentIcon';
import { HumanIcon } from './Icons/HumanIcon';
import { WizardIcon } from './Icons/WizardIcon';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';

interface IEmptyAgentElementProps {
    // Define any props if needed in the future

}

export const EmptyAgentElement = (props: IEmptyAgentElementProps) => {
    const {  } = props;
    
    return (

        <Box sx={{ width: "100%", p: 1, border: "2px dotted gray", backgroundColor: "#D9D9D9", borderRadius: 3, mt: 1, display: 'flex', height: 50, flexDirection: 'row' }}>
            <Box sx={{display:'flex', flexDirection:'column'}}>
                <Box sx={{flex:1}}></Box>
            <AddIcon sx={{color:"gray"}}></AddIcon>
                <Box sx={{flex:1}}></Box>
            </Box>
            <Box sx={{display:'flex', flex:1, flexDirection:'column', alignItems:'center'}}>
                <Box sx={{ flex:1}}></Box>
                    <Box sx={{color:"gray"}}>Select Agent for comparison</Box>
                <Box sx={{ flex:1}}></Box>
            </Box>
        </Box>
    )
}
    ;

