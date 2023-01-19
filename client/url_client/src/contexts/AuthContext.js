import React, { useContext, useState, useEffect } from "react"
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import vars from '../utils/vars'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [authTokens, setAuthTokens] = useState( () => 
        localStorage.getItem('authTokens') ? 
        JSON.parse(localStorage.getItem('authTokens')) : 
        null
    )
    
    const [user, setUser] = useState( () =>
        localStorage.getItem('authTokens') ? 
        jwt_decode(localStorage.getItem('authTokens')) : 
        null
    )

    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const signupRequest = async (username, email, password) => {
        let response = await fetch(`${vars.host}api/signup/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                'username': username,
                'email': email,
                'password': password
            })
        })

        return response
    }

    const loginUser = async (e) => {
        e.preventDefault()

        let response = await fetch(`${vars.host}api/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                'username': e.target.username.value, 
                'password': e.target.password.value
            })
        })

        let data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
        } else {
            alert('Something went wrong!')
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/')
    }

    const updateToken = async (e) => {
        let response = await fetch(`${vars.host}api/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                'refresh': authTokens?.refresh
            })
        })

        let data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }

        if (loading) {
            setLoading(false)
        }
    }

    const value = {
        user,
        setUser,
        authTokens,
        updateToken,
        loginUser,
        logoutUser,
        signupRequest,
        updateToken
    }

    useEffect(() => {
        if (loading) {
            updateToken()
        }

        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, 1000*60*4)

        return () => clearInterval(interval)

    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={value}>
         {loading ? null : children}
        </AuthContext.Provider>
    )
}