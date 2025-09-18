'use client'
import Image from "next/image";
import styles from "./page.module.css";

import { Box } from "@mui/material";
import PanelRight from "./rightside/panelright";
import { DataContextProvider } from "./contexts/DataContextProvider";
import { ProtectionContextProvider } from "./contexts/ProtectionProvider";
import { PanelDesignSpace } from "./leftside/paneldesignspace";

export default function Home() {
  return (
    <>
      <Box sx={{ display: 'flex', height: '100vh', width: '100%', flexDirection: 'row', fontFamily:"sans-serif" }}>
        <ProtectionContextProvider>

          <DataContextProvider key="dataContext">
            
            <PanelDesignSpace></PanelDesignSpace>
            <PanelRight></PanelRight>
          </DataContextProvider>
        </ProtectionContextProvider>
      </Box>

    </>
  );
}
