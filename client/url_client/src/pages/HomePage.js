import React, { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import vars from '../utils/vars'

import URLShortener from '../components/URLShortener'
import EvilMode from '../components/EvilMode'
import URL from '../components/URL'

const HomePage = () => {
  const [links, setLinks] = useState([])
  const { authTokens, logoutUser } = useAuth()

  useEffect(() => {
    getLinks()
  }, [])

  const getLinks = async () => {
    let response = await fetch(`${vars.host}api/links/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      }
    })
    let data = await response.json()

    if (response.status === 200) {
      setLinks(data)
    } else if (response.statusText === 'Unauthorized') {
      logoutUser()
    }
  }

  return (
    <div>
        <div className="url-cont">
          <URLShortener getLinks={getLinks} />
          <EvilMode />
        </div>

        <h3>Your generated URLs</h3>

        <div>
          {links.map(link => <URL getLinks={getLinks} key={link.id} link={link} />)}
        </div>

    </div>
  )
}

export default HomePage