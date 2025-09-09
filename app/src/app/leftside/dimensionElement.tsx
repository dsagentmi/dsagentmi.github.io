'use client'
import Image from "next/image";
import styles from "./page.module.css";

import {Box} from "@mui/material";
import { IDimension } from "../configurations/types";
import { ds_colors } from "../configurations/colors";
import Category from "./categoryElement";
import DimensionTriangle from "./DimensionTriangle";

export default function Dimension(props:IDimension) {
    const { name, color_name, categories } = props;
    console.log(name);
    return (
    <Box key={"dim_"+name} sx={{ flex:1, p: 0.5 }}>

        <Box sx={{ display:'flex', flexDirection: 'row'}}>
        <DimensionTriangle color_name={color_name}></DimensionTriangle>
        <Box sx={{ml:1, fontSize:20}}>

        {name}
        </Box>
        </Box>
        <Box sx={{ flexDirection: 'row', display: 'flex', flexWrap: 'wrap' }}>
        {categories.map((cat,idx) => (
            <Category {...{...cat, dimension:name, color_name: color_name, key:name+"_cat_" + idx}} ></Category>
        ))}
        {/* <Category></Category> */}
        </Box>
    </Box>
  );
}
