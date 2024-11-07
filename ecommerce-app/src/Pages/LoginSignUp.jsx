import React, { useState } from 'react';
import './LoginSignUp.css';

function LoginSignUp() {
  const [state, setState] = useState('Login');
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const LoginFunc = async () =>{
    console.log("Login", formData)
    let responseData;
    await fetch('http://localhost:4000/login',{
      method: 'POST',
      headers:{
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((res)=>res.json()).then((data)=>responseData = data);

    if(responseData.success){
      localStorage.setItem('auth_token', responseData.token);
      window.location.replace('/');
    }else{
      alert( responseData.errors)
    }
  }

  const SignUpFunc = async () =>{
    console.log("SignUp", formData)
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method: 'POST',
      headers:{
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((res)=>res.json()).then((data)=>responseData = data);

    if(responseData.success){
      localStorage.setItem('auth_token', responseData.token);
      window.location.replace('/');
    }else{
      alert( responseData.errors)
    }
  }
  return (
    <>
    <div className='loginsignup'>
        <div className="loginsignup-conatiner">
          <h1>{state}</h1>
          <div className="loginsignup-fields">
            {state === 'Signup'?<input type='name' name="username" value={formData.username} onChange={handleChange} placeholder='Type Your Name'/>: null }
            
            <input type='email' name="email" value={formData.email} onChange={handleChange} placeholder='Type Your EmailID'/>
            <input type='password' name="password" value={formData.password} onChange={handleChange} placeholder='Type Your Password'/>
            <button onClick={()=>{state === 'Login'? LoginFunc(): SignUpFunc()}}>Continue</button>
          </div>
          <div className="loginsignup-login">
            {state === 'Signup'? <p>Already Have an Account.<span onClick={()=>{setState("Login")}}> Login here!</span></p> : <p>Create an Account.<span onClick={()=>{setState("Signup")}}> SignUp Here!</span></p>}
            
          </div>
          {state === 'Signup'? 
          <div className="loginsignup-agree">
            <input type='checkbox' name='' id=''/>
            <p>
              By Continuing, I agree to the Terms and Conditions
            </p> 
            
          </div>: null}
        </div>
    </div>
    </>
  )
}

export default LoginSignUp;