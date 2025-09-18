'use client'
import Image from "next/image";
import styles from "./page.module.css";

import { Box } from "@mui/material";
import { ICategory } from "../configurations/types";
import Code from "./codeElement";
import { ds_colors } from "../configurations/colors";

export default function Category(props: ICategory) {
  const { name, codes, dimension, color_name } = props;
  
  return (
    <Box sx={{  color: dimension=="Infrastructure"?'white':'black', p:0.5, pl:0,  width:200 }}>
      <Box sx={{ fontWeight: 'bold', backgroundColor: ds_colors[color_name], p:1, borderRadius:2, }}>
        {name}
      </Box>
      <Box sx={{ flexDirection: 'column', mt:1, flexWrap: 'wrap', }}>
        {codes.map((code, idx) => (
          <Code key={ "cat_" + name + idx} {...{ ...code, dimension: dimension, color_name: color_name, category: name,  }} ></Code>
        ))}
      </Box>
    </Box>
  );
}
