'use client'
import React from 'react';
import { Card, CardContent, Typography, Link, Box, Stack, IconButton } from '@mui/material';
import { useDataContext } from '../contexts/DataContextProvider';
import { SvgIcon } from '@mui/material';
import { AgentIcon } from './Icons/AgentIcon';
import { HumanIcon } from './Icons/HumanIcon';
import { WizardIcon } from './Icons/WizardIcon';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';

import { styled } from '@mui/material/styles';
import { removeLatexCommands } from '../utils/latexPolisher';

interface IPaperDescriptionProps {
    // Define any props if needed in the future
    title: string,
    authors: string,
    year:string,
    url?: string
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 300,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));

export const PaperDescription = (props: IPaperDescriptionProps) => {
    const { title, authors, url,year } = props

    return (

        // <HtmlTooltip
        //     title={
        //         <React.Fragment>
        //             <Typography color="inherit">Tooltip with HTML</Typography>
        //             <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
        //             {"It's very engaging. Right?"}
        //         </React.Fragment>
        //     }
        // >
        //     <IconButton>
        //         <InfoIcon></InfoIcon>
        //     </IconButton>
        // </HtmlTooltip>

        <HtmlTooltip placement="left-start" arrow
            title={
                <React.Fragment >
                    

                        <Typography component="a" href={url} color="inherit" sx={{cursor:'pointer',color: '#23408e', fontWeight: 700, textDecoration: 'none', fontSize: 13, '&:hover': { textDecoration: 'underline' } }}>{removeLatexCommands(title)}</Typography>
                        <br></br>
                        {removeLatexCommands(authors)} {" "}({year})
                        
                        
                  

                </React.Fragment>
            }
        >
            <IconButton>
                <InfoIcon></InfoIcon>
            </IconButton>
        </HtmlTooltip>


    )
}
    ;

