'use client'
import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Link, Box, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDataContext } from '../contexts/DataContextProvider';
import { SvgIcon } from '@mui/material';
import { AgentIcon } from './Icons/AgentIcon';
import { HumanIcon } from './Icons/HumanIcon';
import { WizardIcon } from './Icons/WizardIcon';
import Checkbox from '@mui/material/Checkbox';

interface IAgentElementProps {
    // Define any props if needed in the future
    name: string;
    attributes: any,
    notEditable?: boolean;
    borderColor?: string;
}

export const AgentElement = (props: IAgentElementProps) => {
    const { name, attributes, notEditable, borderColor } = props;
    const { addOrRemoveSelectedAgents, selectedAgents } = useDataContext();
    const [checked, setChecked] = React.useState(false);

    useEffect(() => {
        if (selectedAgents && selectedAgents.length && attributes) {
            let isSelected = selectedAgents.find((a: any) => a.agentID == attributes.agentID);
            setChecked(isSelected);
        }
        else {
            setChecked(false);
        }
    }, [selectedAgents])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setChecked(event.target.checked);
        console.log("Toggling agent: ", attributes.agentID, event.target.checked);
        addOrRemoveSelectedAgents(attributes.agentID, attributes);
    };
    const handleClick = () => {
        // setChecked(event.target.checked);
        console.log("Toggling agent: ", attributes.agentID);
        addOrRemoveSelectedAgents(attributes.agentID, attributes);
    };

    return (

        <Box sx={{ width: "100%", p: 1, border: "2px solid " + (borderColor ? borderColor : 'black'), backgroundColor: "#D9D9D9", borderRadius: 3, mt: 1, display: 'flex', height: 50, flexDirection: 'row' }}
        // onMouseOver={(e) => {
        //     e.stopPropagation();
        //     setHoveredAgent({ hovered: true, attributes: attributes })
        // }}
        // onMouseOut={(e) => {
        //     e.stopPropagation();
        //     setHoveredAgent({ hovered: false, attributes: undefined })
        // }}

        >
            {
                (notEditable !== true) &&
                <Checkbox
                    checked={checked}
                    disabled={selectedAgents.length >= 6 && !checked}
                    // onChange={handleChange}
                    onClick={handleClick}

                />
            }
            {
                (notEditable === true) &&
                <IconButton aria-label="delete" size="small" sx={{ padding: '2px' }} onClick={(e) => {
                    e.stopPropagation();
                    handleClick();
                }}>
                    <CloseIcon fontSize="inherit" sx={{ fontSize: 16 }} />
                </IconButton>
            }
            {attributes && attributes["Configuration + Logic_Type"] == "Software" && (
                <AgentIcon></AgentIcon>
            )}
            {attributes && attributes["Configuration + Logic_Type"] == "Human" && (
                <HumanIcon></HumanIcon>
            )}
            {attributes && attributes["Configuration + Logic_Type"] == "Wizard" && (
                <WizardIcon></WizardIcon>
            )}
            <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', }}>
                <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                    <Box sx={{ flex: 1 }}></Box>

                    {attributes && attributes["Configuration + Logic_Role"] && (<Typography variant="h7" component="div" sx={{ fontWeight: 700, whiteSpace: 'nowrap',textOverflow:'ellipsis', maxWidth: 300,
  overflow: 'hidden',ml:1 }}>
                        {attributes["Configuration + Logic_Role"]}
                    </Typography>)}


                    <Box sx={{ flex: 1 }}></Box>

                </Box>
            </Box>
        </Box>
    )
}
    ;

