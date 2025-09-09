"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { useProtectionContext } from "./ProtectionProvider";


// Define the shape of your context data
interface DataContextType {
    data: any;
    setData: React.Dispatch<React.SetStateAction<any>>;
    filteredAgents: any;
    setFilteredAgents: React.Dispatch<React.SetStateAction<any>>;
    currentFilters: any;
    setCurrentFilters: React.Dispatch<React.SetStateAction<any>>;
    addOrRemoveCodeToFilter: (code: string, category: string, dimensions: string) => void;
    filteredPapers: any;
    setFilteredPapers: React.Dispatch<React.SetStateAction<any>>;
    selectedAgents: any;
    setSelectedAgents: React.Dispatch<React.SetStateAction<any>>;
    addOrRemoveSelectedAgents: (agentID: number, attributes: any) => void;
    designspace:any;
    

}

interface ISelectedAgent {
    agentID: number;
    attributes: any
    color: string;
}

// Create the context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Provider component
export const DataContextProvider = ({ children }: { children: ReactNode }) => {
    const encryptedUsage = true
    const { a, r, d } = useProtectionContext()
    const [data, setData] = useState<any>(null);
    const [filteredAgents, setFilteredAgents] = useState<any>(null);
    const [filteredPapers, setFilteredPapers] = useState<any>(null);
    const [currentFilters, setCurrentFilters] = useState<any>({});
    const [selectedAgents, setSelectedAgents] = useState<any>([]);
    const [pw, setPw] = useState<string>("TEST1234");
    const [designspace, setDesignSpace] = useState<any>(null);

    const selectedAgentsColors = [
        '#4E79A7',
        '#F28E2B',
        '#E15759',
        '#76B7B2',
        '#59A14F',
        '#EDC948'
    ]

    useEffect(() => {
        console.log("Data updated:", data);
        if (data && data.agent_data) {

            setFilteredAgents(data.agent_data)
        }
    }, [data]);

    const addOrRemoveSelectedAgents = useCallback((agentID: number, attributes: any) => {

        let updatedSelectedAgents = [...selectedAgents];
        const agentKey = updatedSelectedAgents.findIndex(key => key?.agentID == agentID);
        console.log("Agent key:", agentKey);
        if (agentKey !== -1) {
            // If agent is already selected, remove it

            updatedSelectedAgents.splice(agentKey, 1)
        }
        else {
            // Find the first empty slot and add the agent
            let unusedColors = selectedAgentsColors.filter((c) => !updatedSelectedAgents.map((a) => a?.color).includes(c));

            if (updatedSelectedAgents.length < 6) {
                updatedSelectedAgents = [...updatedSelectedAgents, { agentID: agentID, attributes: attributes, color: unusedColors[0] }];
                console.log("Updated selected agents:", updatedSelectedAgents);
            }
            else {
                console.log("Cannot select more than 6 agents");
            }
        }
        setSelectedAgents([...updatedSelectedAgents]);
    }, [selectedAgents, setSelectedAgents]);
    const addOrRemoveCodeToFilter = useCallback((code: string, category: string, dimensions: string) => {

        const updatedFilters = { ...currentFilters };
        if (!updatedFilters[dimensions]) {
            updatedFilters[dimensions] = {};
        }
        if (!updatedFilters[dimensions][category]) {
            updatedFilters[dimensions][category] = []
        }

        if (!updatedFilters[dimensions][category].includes(code)) {
            console.log("add code to filters", code);
            updatedFilters[dimensions][category].push(code);
        }
        else {
            // remove code from array
            console.log("remove code from filters", code);
            updatedFilters[dimensions][category] = updatedFilters[dimensions][category].filter((c: string) => c !== code);
        }
        setCurrentFilters(updatedFilters);
    }, [setCurrentFilters, currentFilters]);



    useEffect(() => {
        if (filteredAgents && data) {
            console.log(filteredAgents.map((a:any) => a["ID"]))
            setFilteredPapers(data.references.filter((el:any) => filteredAgents.map((a:any) => String(a["ID"])).includes(el["paperID"])));
        }
    }, [filteredAgents, data]);

    useEffect(() => {
        if (data && currentFilters) {
            // Apply filtering logic based on currentFilters
            setFilteredAgents(data.agent_data.filter((agent: any) => {
                // Check if agent matches all filters
                let test = true;
                for (const dimension in currentFilters) {
                    let test_categories = true;
                    for (const category in currentFilters[dimension]) {

                        const codes = currentFilters[dimension][category];
                        if (codes.length > 0 && agent["" + dimension + "_" + category]) {
                            test_categories = test_categories && codes.reduce((acc: any, curr: any) => acc && agent["" + dimension + "_" + category].includes(curr), true)
                        }
                        else {
                            console.log("Dimension does not exist:", dimension + "_" + category, agent)
                        }
                        // if (agent["" + dimension + "_" + category].includes))

                        //     {
                        //   return false; // Agent does not match this filter
                        // }
                        test = test && test_categories;
                    }
                }
                return test; // Agent matches all filters
            }));
        }
    }, [currentFilters]);

    useEffect(() => {
        if (encryptedUsage) {
            let fetchedData = {
                agent_data: a,
                references: r
            }
            fetchedData.agent_data = fetchedData.agent_data.map((a:any, idx:number) => ({ ...a, agentID: idx }));
            console.log('Fetched data:', fetchedData.agent_data)
            setData(fetchedData)
        }
        console.log("designspace",d)
        setDesignSpace([...d])
        
    }, [d,a,r]);

    useEffect(()=>{
        console.log("d3", designspace)
    },[designspace])

    return (
        <DataContext.Provider value={{
            data, setData, filteredAgents, setFilteredAgents, currentFilters, setCurrentFilters, addOrRemoveCodeToFilter, filteredPapers, setFilteredPapers, selectedAgents, setSelectedAgents, addOrRemoveSelectedAgents, designspace

        }}>
            {/* textbox for pw */}
            {children}

        </DataContext.Provider>
    );
};

// Custom hook for consuming the context
export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useDataContext must be used within a DataContextProvider");
    }
    return context;
};