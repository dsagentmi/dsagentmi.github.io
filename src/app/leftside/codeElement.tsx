"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./page.module.css";

import { Box } from "@mui/material";
import { ICode } from "../configurations/types";
import { useDataContext } from "../contexts/DataContextProvider";
import Category from "./categoryElement";
import { ds_colors } from "../configurations/colors";

export default function Code(props: ICode) {
  const { name, category, dimension, color_name } = props;
  const { addOrRemoveCodeToFilter, data, filteredAgents, selectedAgents } = useDataContext();
  const [codePercentage, setCodePercentage] = useState<number>(100);
  const [codePercentageFiltered, setCodePercentageFiltered] = useState<number>(-1);
  const [hovered,setHovered] = useState<boolean>(false)
  useEffect(() => {
    if (data && data.agent_data) {
      let total = data.agent_data.length;
      let count = data.agent_data.filter((a: any) => a[dimension + "_" + category] && a[dimension + "_" + category].split(', ').includes(name)).length;
      if(dimension=="Infrastructure"){
        total = data.references.length;
        count = data.agent_data.filter((a: any) => a[dimension + "_" + category] && a[dimension + "_" + category].split(', ').includes(name)).reduce((p:any,c:any)=>{
          if(p.includes(c["ID"])){
            return p

          }
          else{
            p.push(c["ID"])
            return p
          }
        },[]).length
      }
      setCodePercentage(Math.round((count / total) * 1000) / 10);

    }
  }, [data])
  useEffect(() => {
    if (filteredAgents && filteredAgents.length) {
      let total = data.agent_data.length;
      let count = filteredAgents.filter((a: any) => a[dimension + "_" + category] && a[dimension + "_" + category].split(', ').includes(name)).length;
      if(dimension=="Infrastructure"){
        total = data.references.length;
        count = data.agent_data.filter((a: any) => a[dimension + "_" + category] && a[dimension + "_" + category].split(', ').includes(name)).reduce((p:any,c:any)=>{
          if(p.includes(c["ID"])){
            return p

          }
          else{
            p.push(c["ID"])
            return p
          }
        },[]).length
      }
      setCodePercentageFiltered(Math.round((count / total) * 1000) / 10);

    }
    else {
      setCodePercentageFiltered(-1)
    }
  }, [filteredAgents, data])




  return (
    <Box key={name} sx={{
      flex: 1, color: "black", mt: 0, display: 'flex', flexDirection: 'row'
      
      // border:(hoveredAgent.hovered && hoveredAgent.attributes[dimension + "_" + category] && hoveredAgent.attributes[dimension + "_" + category].includes(name))?"1px solid "+  ds_colors[color_name]:"inherit" 
    }} 
    onMouseOver={()=>{
      setHovered(true)
    }}
    onMouseOut={()=>{
      setHovered(false)
    }}
    onClick={(e) => {
      e.stopPropagation();



 
      addOrRemoveCodeToFilter(name, category, dimension)
    }}>

      <Box sx={{ width: 40, minWidth: 40, maxWidth: 40, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ width: 40, minWidth: 40, maxWidth: 40, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', maxheight: 40 }}>
          {selectedAgents.filter((sa:any) => sa && sa.attributes[dimension + "_" + category] && sa.attributes[dimension + "_" + category].includes(name)).map((a:any) =>
            <Box key={a.agentID} sx={{ width: 10, height: 10, backgroundColor: a.color, borderRadius: 1, mr: 0.2, mt:0.2 }}></Box>
          )}
        </Box>
        <Box sx={{ flex: 1 }}>
        </Box>
      </Box>
      <Box sx={{ flex: 1, fontSize:13, cursor: 'pointer', }}>

        <Box sx={{fontWeight:hovered?'600':'inherit'}}>
          {name}
          </Box>
        <Box sx={{ width: "100%", display: 'flex', flexDirection: 'row' }}>
          <Box sx={{ width: String(codePercentage)+"px", height: 10, backgroundColor: 'gray' }}></Box>
          <Box sx={{ position: "relative", left: -Math.round(codePercentage), width: String(codePercentageFiltered)+"px", height: 10, backgroundColor: ds_colors[color_name] }}></Box>
          <Box sx={{ mt: -0.5, position: "relative", left: String(-Math.round(codePercentageFiltered)+2)+"px" }}>({codePercentageFiltered>-1?codePercentageFiltered:codePercentage}%)</Box>
        </Box>
        {/* <Box sx={{ width: "100%", display: 'flex', flexDirection: 'row' }}>
          <Box sx={{ mt: -0.5 }}>({codePercentageFiltered}%)</Box>
        </Box> */}
      </Box>
    </Box>

  );
}
