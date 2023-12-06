import React from 'react'

import { NavigateFunction, useNavigate } from 'react-router-dom'
const HomePage:React.FC = ()=>{
    const navigate:NavigateFunction = useNavigate()
   
    return (
        <div >
            <div style={{textAlign:'center'}}>This is HomePage</div>
            <button style={{marginTop:30}} onClick={()=>{navigate('/login')}}>go to Login Page</button>
        </div>
    )
}

export default HomePage