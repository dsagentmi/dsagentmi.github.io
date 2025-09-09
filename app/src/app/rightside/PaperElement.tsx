'use client'
import React from 'react';
import { Card, CardContent, Typography, Link, Box, Stack, IconButton } from '@mui/material';
import { AgentElement } from './AgentElement';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface IPaperElementProps {
    // Define any props if needed in the future
    title: string;
    author: string;
    year: string;
    journal?: string;
    abstract?: string;
    doi?: string;
    url?: string;
    googleScholar?: string;
    google?: string;
    crossRef?: string;
    filteredAgentsOfPaper: any,
    booktitle?: string,
}

const PaperCard = (props: IPaperElementProps) => {
    const { title, author, journal, year, filteredAgentsOfPaper, booktitle,url } = props;
    const [expanded, setExpanded] = React.useState(false);

    const latexBibtextAuthorToTextConverter=(authors:string)=>{
        let splitter = " and\n"
        if (author.includes(splitter)){

        }
        else if(author.includes(" and ")){
            splitter = " and "
        }
        let authorList = author.split(splitter)
        return authorList.map(a=>{
           if( a.includes(",")){
            const name = a.split(", ")
            return name[1]+" "+name[0]
           }
           return a
        }
        ).join(", ")

    }

    return (

        <Card variant="outlined" sx={{ maxWidth: 900, borderRadius: 1, boxShadow: 0 }}>
            <CardContent sx={{ p: 2 }}>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                    {journal?journal:booktitle} ({year})
                </Typography>
                <Typography variant="h7" component="a" href={url} sx={{ color: '#23408e', fontWeight: 700, textDecoration: 'none', fontSize: 13, '&:hover': { textDecoration: 'underline' } }}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {latexBibtextAuthorToTextConverter(author)}
                </Typography>
                {/* <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 1, display: 'inline' }}>
                    Abstract:
                </Typography>
                <Typography variant="body2" component="span" sx={{ fontStyle: 'italic', ml: 0.5 }}>
                    Detecting similarity between texts is a frequently encountered text mining task. Because the measurement of similarity is typically composed of a number of metrics, and some measures are sensitive to subjective interpretation, a generic detector obtained using machine learning often has difficult...
                </Typography> */}
                <Box sx={{ width: '100%', borderBottom: '1px solid lightgray', }}>

                    <Box sx={{ height: 1, width: '100%',  mt: 1, mb: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <IconButton size="small" sx={{ p: 0, }} onClick={(e) => {
                            e.stopPropagation();
                            setExpanded(!expanded);
                        }}>
                            {expanded && <KeyboardArrowUpIcon fontSize="inherit" sx={{ fontSize: 16 }} ></KeyboardArrowUpIcon>}
                            {!expanded && <KeyboardArrowDownIcon fontSize="inherit" sx={{ fontSize: 16 }} ></KeyboardArrowDownIcon>}
                        </IconButton>
                        <Box sx={{fontSize:12}}>Details</Box>
                    </Box>
                    {expanded &&
                        
                            <Box sx={{display:'flex', flexDirection:'row', 
                                flexWrap: 'wrap', gap:2
                            }}>

                            <Link href="#" underline="hover" variant="caption">DOI</Link>
                            <Link href="#" underline="hover" variant="caption">URL</Link>
                            <Link href="#" underline="hover" variant="caption">Google Scholar</Link>
                            <Link href="#" underline="hover" variant="caption">Google</Link>
                            <Link href="#" underline="hover" variant="caption">CrossRef</Link>
                            </Box>
                        
                    }
                </Box>
                <Box>
                    {filteredAgentsOfPaper && filteredAgentsOfPaper.length && (<>
                        {filteredAgentsOfPaper.map((a, i) => <AgentElement {...{ name: "agent" + i, attributes: a }}></AgentElement>)}
                    </>)}
                </Box>
            </CardContent>
        </Card>
    )
}
    ;

export default PaperCard;