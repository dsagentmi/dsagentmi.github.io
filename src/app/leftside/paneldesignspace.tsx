'use client'
import Image from "next/image";
import styles from "./page.module.css";
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { Box, Paper } from "@mui/material";
import Dimension from "./dimensionElement";
import FilterElement from "./filterElement";
import { useDataContext } from "../contexts/DataContextProvider";
import LegendElement from "./Legend/Legend";

export const PanelDesignSpace = () => {
  
  const { addOrRemoveSelectedAgents, selectedAgents, designspace } = useDataContext();
  useEffect(()=>{

  },[designspace])
  return (
    <Box sx={{ flex: 2, color: 'black', height: '100vh', display: 'flex', flexDirection: 'column' }}>

      <Paper elevation={3} sx={{ flex: 1, color: 'black', p: 2, display: 'flex', mt: 2, mb: 2, flexDirection: 'column', height:100 }}>
        <Box sx={{width:'100%', display:'flex', flexDirection:'row'}}>

        <FilterElement></FilterElement>
        <LegendElement></LegendElement>
        </Box>
        <Box sx={{ overflowY: 'auto', minHeight: 0, flex: 1 }}>


          {designspace && designspace.map((dim:any,) => (
            <Dimension key={dim.name} {...dim} ></Dimension>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}

