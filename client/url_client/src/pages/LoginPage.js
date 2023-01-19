import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const LoginPage = () => {

  const { loginUser } = useAuth()

  return (
    <div className='box'>
        <form onSubmit={loginUser}>
            <input 
                type="text" 
                name="username" 
                placeholder='Enter Username'
                className='username'
            />

            <input 
                type="password" 
                name="password" 
                placeholder='Enter Password'
                className='password'
            />

            <input type="submit" className='btn' />
        </form>
    </div>
  )
}

export default LoginPage