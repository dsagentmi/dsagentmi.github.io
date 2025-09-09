"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { decrypt, encrypt } from "./utils/encryptionDecription";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'



import { Box } from "@mui/material";
import { crypto_r } from "../cipherdata/r";
import { crypto_a } from "../cipherdata/a";
import { crypto_d } from "../cipherdata/d";


// Define the shape of your context data
interface ProtectionContextType {
    a: any,
    r: any,
    d:any

}


// Create the context
const ProtectionContext = createContext<ProtectionContextType | undefined>(undefined);

// Provider component
export const ProtectionContextProvider = ({ children }: { children: ReactNode }) => {

    const [pw, setPW] = useState<string>('')
    const [pwCorrect, setPWCorrect] = useState<boolean>(false)
    const [a, setA] = useState<any>()
    const [r, setR] = useState<any>()
    const [d, setD] = useState<any>()




    const handlePWSubmit = useCallback(async (pass?: string) => {
        let ref = crypto_r
        let ag = crypto_a
        let ds = crypto_d
        let passphrase = pw;
        if (pass) {
            passphrase = pass
        }
        try {

            let decrypted_r = await decrypt(JSON.stringify(ref), passphrase);
            let decrypted_a = await decrypt(JSON.stringify(ag), passphrase);
            let decrypted_d = await decrypt(JSON.stringify(ds), passphrase);
            const test = JSON.parse(decrypted_r);
            if (test.length == 90) {
                localStorage.setItem("passphrase", passphrase);
                setPWCorrect(true)

            }
            setA(JSON.parse(decrypted_a))
            setR(JSON.parse(decrypted_r))
            setD(JSON.parse(decrypted_d))

        }
        catch (ex) {

            localStorage.removeItem("passphrase")
            setPW('')
        }
    }, [pw])

    useEffect(() => {
        let passphrase = localStorage.getItem("passphrase");

        console.log("passphraseBeginning", passphrase)
        if (passphrase !== null) {

            setPW(passphrase)
            handlePWSubmit(passphrase)
        }
    }, [])

    useEffect(() => {
        
    }, [])


    return (
        <ProtectionContext.Provider value={{
            a, r,d
        }}>
            {!pwCorrect &&
                <>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', heigth: '100vh', width: '100vw' }}>
                        <Box sx={{ flex: 1 }}></Box>
                        <Box sx={{color:'black', mb:1}}>
                            Please enter the passphrase provided in the paper:
                        </Box>
                        <TextField
                            value={pw}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setPW(event.target.value);
                            }}
                        ></TextField>
                        <Button variant="outlined" sx={{mt:1}}
                            onClick={() => {
                                handlePWSubmit()
                            }}
                        >Open</Button>
                        <Box sx={{ flex: 1 }}></Box>
                    </Box>
                </>
            }
            {/* textbox for pw */}
            {pwCorrect &&
                <>
                    {children}
                </>
            }

        </ProtectionContext.Provider>
    );
};

// Custom hook for consuming the context
export const useProtectionContext = () => {
    const context = useContext(ProtectionContext);
    if (!context) {
        throw new Error("useProtectionContext must be used within a ProtectionContextProvider");
    }
    return context;
};