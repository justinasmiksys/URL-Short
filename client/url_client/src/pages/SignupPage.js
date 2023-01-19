import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

const SignupPage = () => {
  const { signupRequest } = useAuth()
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (e.target.password.value !== e.target.repeatPassword.value) {
      setError('Passwords do not match.')
      return
    }

    const response = await signupRequest(
      e.target.username.value,
      e.target.email.value, 
      e.target.password.value
    )

    const data = await response.json()

    if (response.status === 200) {
      setError('Account was created, you can login.')
      e.target.username.value = ''
      e.target.email.value = ''
      e.target.password.value = ''
      e.target.repeatPassword.value = ''
    } else {
      setError(data.error)
    }
  }

  return (
    <div className='box'>
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="username" 
                placeholder='Enter Username'
                required
                className='username'
            />

            <input 
                type="email" 
                name="email"
                placeholder='Enter Email'
                required
                className='username'
            />

            <input 
                type="password" 
                name="password" 
                placeholder='Enter Password'
                required
                className='username'
            />

            <input 
                type="password" 
                name="repeatPassword" 
                placeholder='Confirm Password'
                required
                className='username'
            />

            <p>{error}</p>

            <input type="submit" className='btn' />
        </form>
    </div>
  )
}

export default SignupPage