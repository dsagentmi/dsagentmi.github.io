"use client";
import Image from "next/image";
import styles from "./page.module.css";

import {Box} from "@mui/material";
import { ICategory, Ifilter } from "../configurations/types";
import Code from "./codeElement";
import { useDataContext } from "../contexts/DataContextProvider";
import FilterChip from "./FilterChip";

export default function FilterElement() {
   
    const {currentFilters} = useDataContext();


    const getAllFilters=(filters:any)=>{
    
        if(filters){
          let filterList:Ifilter[] = []
          Object.keys(filters).forEach(dim=>{
      
            Object.keys(filters[dim]).forEach((cat:any)=>{
       
              filters[dim][cat].forEach((code:any)=>{
       
                filterList.push({
                  dim:dim,
                  cat:cat,
                  code:code
                });
              })
            })
          });
            return filterList;
          }
          return []
        }
    return (
    <Box sx={{ flex:1,   p: 1, height:120, backgroundColor: '#f5f5f5', borderRadius: 1, mb:2, fontSize: 13 }}>
        Active Agent Filters:
        <Box sx={{ flexDirection: 'row', display: 'flex', flexWrap: 'wrap' }}>
        
        {getAllFilters(currentFilters).map((f, idx) => (
          <FilterChip {...{ filter: f, key: "filterchip_" + idx }} ></FilterChip>
        ))}
        {/* <Category></Category> */}
        </Box>
    </Box>
  );
}
