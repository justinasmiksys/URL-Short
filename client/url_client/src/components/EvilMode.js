import React, { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { toggleEvilMode, updateEvilURL } from '../utils/helpers'
import vars from '../utils/vars'

const EvilMode = () => {
  const { user, setUser, authTokens, logoutUser } = useAuth()

  useEffect(() => {
    getEvilData()
  }, [])

  const getEvilData = async () => {
    let response = await fetch(`${vars.host}api/evil/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      }
    })
    let data = await response.json()

    if (response.status === 200) {
      setUser({
        ...user,
        evil_mode: data.evil_mode,
        force_url: data.force_url
      })
    } else if (response.statusText === 'Unauthorized') {
      logoutUser()
    }
  }

  const changeEvilURL = async (e) => {
    e.preventDefault()
    const response = await updateEvilURL(user.id, e.target.evil_url.value)
    const data = await response.json()

    setUser({...user, force_url:data.evil_url})
  }

  const toggleEvil = async (e) => {
    e.preventDefault()
    const response = await toggleEvilMode(user.id)
    const data = await response.json()

    setUser({...user, evil_mode:data.evil_mode})
  }

  return (
    <div className='evil-cont'>
      <form className='' onSubmit={changeEvilURL}>
        <p>Evil URL: {
            user.force_url ?? <span>not set</span>
            } </p>
        <input
          placeholder='Enter evil URL here' 
          className='url-input url-long'
          name="evil_url"
        />
        <input
          type='submit'
          className='btn'
        />
      </form>
      <div className="evil-mode-cont">
        <h3>Evil Mode: {user.evil_mode ? "ON" : "OFF"}</h3>
        <button onClick={toggleEvil} className='btn btn-evil'>Switch {user.evil_mode ? "OFF" : "ON"}</button>
      </div>
    </div>
  )
}

export default EvilMode