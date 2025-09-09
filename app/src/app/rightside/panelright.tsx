"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Paper from '@mui/material/Paper';

import { Box } from "@mui/material";

import Dimension from "../leftside/dimensionElement";
import { useDataContext } from "../contexts/DataContextProvider";
import PaperCard from "./PaperElement";
import { EmptyAgentElement } from "./EmptyAgentElement";
import { AgentElement } from "./AgentElement";

export default function PanelRight() {
  const { currentFilters, filteredAgents, filteredPapers, selectedAgents } = useDataContext();
  return (
    <Box sx={{ flex: 1, color: 'black', p: 2, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Paper elevation={3} sx={{ width: "100%", p: 2, mb: 2, backgroundColor: '#f5f5f5' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Box>

            Agent Comparison
          </Box>
          <Box sx={{ flex: 1 }}></Box>
          <Box>
            ({selectedAgents.length}/6 Agents selected)
          </Box>
        </Box>
        {selectedAgents.map((a, idx) => {

          return <AgentElement {...{
            name: `Agent ${a.agentID}`, attributes: a.attributes, key: "selected_agent_" + idx, notEditable: true
            , borderColor: a.color
          }} ></AgentElement>
        }
        )}
        {selectedAgents.length < 6 &&
          <EmptyAgentElement></EmptyAgentElement>
        }

      </Paper>

      <Paper elevation={3} sx={{ width: "100%", p: 2, backgroundColor: '#f5f5f5', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {filteredPapers && (<>
          <Box>{filteredPapers.length} Papers</Box>
          <Box sx={{ flex: 1, overflowY: 'auto', width: '100%', mt: 2,  }}>
            
            {filteredPapers.map(p => (<PaperCard {...{ ...p, filteredAgentsOfPaper: filteredAgents.filter(a => String(a["ID"]) == p["paperID"]) }} key={p.paperID}></PaperCard>))}
          </Box>
        </>
        )}
      </Paper>

    </Box>
  );
}

