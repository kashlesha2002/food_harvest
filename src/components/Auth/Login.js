import React, { useState } from 'react'
import './signup.css'
import {Link , useNavigate} from 'react-router-dom'
import firebase from '../../firebase-config'

const Login = () => {
    const [email , setEmail] = useState('')
    const [password , setPass] = useState('')
    const Navigate= useNavigate();
   
    const submit= async(e)=>
    {
        e.preventDefault()
        try
        {
             const user = await firebase.auth().signInWithEmailAndPassword(email , password)
             
             if (user)
             {
                
                Navigate('/');
             }
        }
        catch(error)
        {
            alert(error)
        }
    }
  return (
    <>
    <div className='main_container_signup'>
        <div className='header'>
            <h2>Signup</h2>
        </div>
        <div className='box'>
            <input type='email' value={email} placeholder='E-mail' onChange={(e)=> setEmail(e.target.value)} ></input>
        </div>
        <div className='box'>
            <input type='password' value={password} placeholder='Password' onChange={(e)=> setPass(e.target.value)} ></input>
        </div>
        <p>Don't Have an Account?<Link to="/signup"> Create Account</Link></p>
        <button onClick={submit}>Login</button>

    </div>
    </>
  )
}

export default Login