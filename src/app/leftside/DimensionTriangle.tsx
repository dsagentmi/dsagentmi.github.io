'use client'
import React from 'react';
import './DimensionTriangle.css';
import {Box} from "@mui/material";
import { ds_colors } from '../configurations/colors';
interface IDimensionTriangle{
    color_name:string
}

const DimensionTriangle = (props: IDimensionTriangle) => {
    const {color_name}=props;
    return (
  <Box sx={{ width: 30,
  height: 20,  background: ds_colors[color_name],
  color:'black',
  position: "relative",
  display: "inline-block",
  mr:"15px",
  ":after": {
    content: '""',
  position: 'absolute',
  right: '-15px',
  top: 0,
  width: 0,
  height: 0,
  borderTop: "10px solid transparent",
  borderBottom: "10px solid transparent",
  borderLeft: "15px solid "+ds_colors[color_name],
  }}}
  ></Box>
)};

export default DimensionTriangle;