import React, { useState } from 'react'
import Logo from '../../assets/imgs/Logo.png'
import './login.scss'
import User from '../../types/UserType'
import api from '../../api/api';
import { NavigateFunction, useNavigate } from 'react-router-dom';



const Login: React.FC = () => {
  
  const navigate:NavigateFunction = useNavigate()

  const [formData,setFormData] = useState<User>({
    email:'',
    password:''
  })
  const[emailFormatError,setEmailFormatError] = useState<boolean>(false)
  const [errorMessage,setErrorMessage] = useState<string>('')
    const handleInput = (event:React.ChangeEvent<HTMLInputElement>)=>{
      setErrorMessage('')
      const { name, value } = event.target;
      if(name === 'email'){
        setEmailFormatError(false)
      }
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    const handleSubmit = async ()=>{
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if(!emailRegex.test(formData.email)){
        setEmailFormatError(true)
        return
      }
      
      try {
        const response = await api.post('/authenticate',formData)
        const{accessToken,refreshToken} = response.data
        sessionStorage.setItem('JudoAT',accessToken)
        sessionStorage.setItem('JudoRT',refreshToken)
        navigate('/product')
      } catch (error:any) {
        const{status,data} = error.response
        if(status === 404){
          setErrorMessage(data.message)
        }else if(status === 401){
          setErrorMessage(data.message)
        }
      }
     
    }

    

    
    return (
        <div>
            <div className="loginCard">
                <div className="logoStyle">
                    <img src={Logo} alt="Judo Logo" />
                </div>

                <div className="signInContainer">
                    <span className="signInText">Sign in</span>
                </div>

                <div className="emailContainer">
                    <div>
                        <span className="emailAndPasswordText">Email</span>
                    </div>
                    <div className="emailInputContainer">
                        <input type="text" className={emailFormatError ? "emailInputError" : 'emailAndPasswordInput'}onChange={handleInput} value={formData.email} name="email"/>
                    </div>
                </div>

                <div className="passwordContainer">
                    <div>
                        <span className="emailAndPasswordText">Password</span>
                    </div>
                    <div className="passwordInputContainer">
                        <input type="password" className="emailAndPasswordInput" onChange={handleInput} value={formData.password} name="password"/>
                    </div>
                </div>

                <div className="signInButton" onClick={handleSubmit}>
                    <span className="signInButtonText">Sign in</span>
                </div>

                <div style={{width:354,display:errorMessage === '' ? 'none' : 'flex',justifyContent:'center'}}>
                  <span style={{color:'red'}}>{errorMessage}</span>
                </div>
                

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: 56,
                        width: 354,
                    }}
                >
                    <span className="emailAndPasswordText" style={{ cursor: 'pointer' }}>
                        Forgot password?
                    </span>
                </div>
            </div>

            <div style={{marginTop:32}}>
              <div className='informContainer'>
                <span className='informText'>©2001-2019 All Rights Reserved. Clip® is a registered trademark of Rover Labs.</span>
              </div>
              <div className='informContainer'>
                <span className='informText'>Cookie Preferences, Privacy, and Terms.</span>
              </div>
            </div>
        </div>
    )
}

export default Login
