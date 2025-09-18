'use client'
import { Box, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Ifilter } from "../configurations/types";
import { dimension_color_mapper } from "../configurations/colors";
import { useDataContext } from "../contexts/DataContextProvider";

interface IFilterChip {
    filter: Ifilter;
    // Define any props if needed in the future
}

export default function FilterChip(props: IFilterChip) {
    const { filter } = props;
  
    const { addOrRemoveCodeToFilter } = useDataContext();
    return (
        <>
            {filter && filter.dim && filter.cat && filter.code && (<>

                <Box sx={{ display: 'flex', flexDirection: 'row', color: 'black', p: 0.5, border: '2px solid ' + (filter && filter.dim ? dimension_color_mapper(filter.dim) : "back"), 
                    
                    backgroundColor: "rgb(from "+(filter && filter.dim ? dimension_color_mapper(filter.dim) : "back")+" r g b / .2)",
                    
                    borderRadius: 2, mr: 1, mb:1 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                        <Box sx={{ flex: 1 }}></Box>
                        <Box>{filter.cat + ": " + filter.code}</Box>

                        <Box sx={{ flex: 1 }}></Box>
                    </Box>
                    <IconButton aria-label="delete" size="small" sx={{ padding: '2px' }} onClick={(e) => {
                        e.stopPropagation();
                        addOrRemoveCodeToFilter(filter.code, filter.cat, filter.dim);
                    }}>
                        <CloseIcon fontSize="inherit" sx={{ fontSize: 16 }} />
                    </IconButton>
                </Box>
            </>)
            }
        </>
    );
}

