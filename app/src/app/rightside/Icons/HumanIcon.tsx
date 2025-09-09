'use client'
import React from 'react';
import { Card, CardContent, Typography, Link, Box, Stack } from '@mui/material';
import { useDataContext } from '../contexts/DataContextProvider';
import { SvgIcon } from '@mui/material';



export const HumanIcon = () => {
    
    return (

        
            <SvgIcon>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="30 30 287 287"
                    strokeWidth={1.5}
                    stroke="black"
                    fill="black"
                >
                    <g transform="translate(-914 -241)"><path d="M1152 352.562C1152 385.423 1125.36 412.062 1092.5 412.062 1059.64 412.062 1033 385.423 1033 352.562 1033 319.702 1059.64 293.062 1092.5 293.062 1125.36 293.062 1152 319.702 1152 352.562Z"/><path d="M1211.5 545.938 1211.5 486.438C1211.5 477.513 1207.04 468.588 1199.6 462.638 1183.24 449.25 1162.41 440.325 1141.59 434.375 1126.71 429.912 1110.35 426.938 1092.5 426.938 1076.14 426.938 1059.78 429.912 1043.41 434.375 1022.59 440.325 1001.76 450.737 985.4 462.638 977.963 468.588 973.5 477.513 973.5 486.438L973.5 545.938 1211.5 545.938Z"/></g>
                </svg>
            </SvgIcon>
           
    )
}
    ;

