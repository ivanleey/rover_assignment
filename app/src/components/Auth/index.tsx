import React from 'react'
import {Navigate } from 'react-router-dom'

interface AuthProp{
    children:React.ReactNode
}

const Auth:React.FC<AuthProp> = ({children})=>{

    if(!sessionStorage.getItem('JudoAT') || !sessionStorage.getItem('JudoRT')){
        
        return <Navigate to="/login"/>
    }
    
    return (
        <div>
            {children}
        </div>
    )
}

export default Auth