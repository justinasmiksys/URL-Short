import React from 'react'
import vars from '../utils/vars'
import { removeURL } from '../utils/helpers'
import { useAuth } from "../contexts/AuthContext"

const URL = ({link, getLinks}) => {
  const { user } = useAuth()

  const handleRemove = async (e) => {
      e.preventDefault()
      const alias = e.target.previousSibling.textContent
      const arr = alias.split("/")
      await removeURL(user.id, arr[arr.length-1])
      await getLinks()
  }

  return (
    <div className='link-cont'>
        <p>Total visits: {link.count_total}</p>
        <p>Unique visits: {link.count_unique}</p>
        <p>{link.target_url}</p>
        <a href={`${vars.host}${link.alias}`}>
        {`${vars.host}${link.alias}`}
        </a>
        <button onClick={handleRemove} className='btn'>Remove</button>
    </div>
  )

}

export default URL