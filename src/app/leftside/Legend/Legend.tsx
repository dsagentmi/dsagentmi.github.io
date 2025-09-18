"use client";
import Image from "next/image";
import styles from "./page.module.css";

import { Box } from "@mui/material";
import { ICategory, Ifilter } from "../../configurations/types";
import Code from "./../codeElement";
import { useDataContext } from "../../contexts/DataContextProvider";
import FilterChip from "./../FilterChip";

export default function LegendElement() {

  const { currentFilters, selectedAgents } = useDataContext();


  return (
    <Box sx={{ minWidth: 200, p: 0.5, height: 120, backgroundColor: '#f5f5f5', borderRadius: 1, mb: 2, fontSize: 13, ml: 2, display: "flex", flexDirection: 'column' }}>

      Legend:

      <svg width="189" height="110" viewBox="0 0 131 69" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Legend for Interactive Tool" clipPath="url(#clip0_210_1996)">
          <text id="Software" fill="black"
            //xml:space="preserve" 
            style={{ whiteSpace: "pre" }} fontFamily="Inter" fontSize="14" letterSpacing="0em"><tspan x="4.09961" y="34.5909">Software</tspan></text>
          <path id="Arrow 54" d="M71 37L75.7163 33.6699L70.4742 31.2505L71 37ZM77 24L76.546 23.7905L72.4318 32.7047L72.8858 32.9142L73.3397 33.1237L77.454 24.2095L77 24Z" fill="#9D9D9D" />
          <path id="Arrow 53" d="M17 24L19.0929 18.6192L13.3865 19.4971L17 24ZM15 11L14.5058 11.076L15.8216 19.6284L16.3157 19.5523L16.8099 19.4763L15.4942 10.924L15 11Z" fill="#9D9D9D" />
          <text id="Code" fill="#9D9D9D"
            //xml:space="preserve" 
            style={{ whiteSpace: "pre" }} fontFamily="Inter" fontSize="10" letterSpacing="0em"><tspan x="2.36328" y="8.63636">Code</tspan></text>
          {
            selectedAgents.length > 0 && <>
              <path id="Arrow 56" d="M9.99991 44.0004L9.90017 49.7731L14.9493 46.9731L9.99991 44.0004ZM16.1343 55.0625L16.5715 54.82L12.6195 47.6933L12.1822 47.9358L11.745 48.1783L15.697 55.305L16.1343 55.0625Z" fill="#9D9D9D" />
            </>}
          {
            selectedAgents.length > 0 && <>
              <text id="selected Agents covering the code" fill="#9D9D9D" //xml:space="preserve"
                style={{ whiteSpace: "pre" }} fontFamily="Inter" fontSize="10" letterSpacing="0em"><tspan x="18.7383" y="58.1364">selected Agents </tspan><tspan x="14.3633" y="67.1364">covering the code</tspan></text>
            </>
          }
          <text id="Applies to 20.1% of all filtered agents" fill="#9D9D9D"
            //xml:space="preserve"
            style={{ whiteSpace: "pre" }} fontFamily="Inter" fontSize="10" letterSpacing="0em"><tspan x="40.5029" y="10.1364">Applies to 20.1% of </tspan><tspan x="44.2529" y="19.1364">all filtered agents  </tspan></text>
          <rect id="Rectangle 73" x="21" y="38" width="40" height="8" fill="#808080" />
          <rect id="Rectangle 72" x="21" y="38" width="22" height="8" fill="#C6DCFF" />
          <text id="(20.1%)" fill="black"
            //xml:space="preserve"
            style={{ whiteSpace: "pre" }} fontFamily="Inter" fontSize="10" letterSpacing="0em"><tspan x="62.0225" y="45.6364">(20.1%)</tspan></text>
          {
            selectedAgents.length > 0 && <>
              <rect id="Rectangle 80" x="4" y="38" width="4" height="4" rx="1" fill="#E15759" />
              <rect id="Rectangle 81" x="9" y="38" width="4" height="4" rx="1" fill="#F28E2B" fillOpacity="0.94902" />
              <rect id="Rectangle 82" x="14" y="38" width="4" height="4" rx="1" fill="#76B7B2" />
            </>
          }
        </g>
        <defs>
          <clipPath id="clip0_210_1996">
            <rect width="131" height="69" fill="white" />
          </clipPath>
        </defs>
      </svg>


      {/* <Category></Category> */}

    </Box>
  );
}
