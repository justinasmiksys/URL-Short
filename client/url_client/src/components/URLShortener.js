import React from 'react'
import { generateURL } from '../utils/helpers'
import { useAuth } from "../contexts/AuthContext"

const URLShortener = ({getLinks}) => {
  const { user } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await generateURL(
      user.id, 
      e.target.target_url.value, 
      e.target.alias.value
    )
    await getLinks()
  }

  return (
    <div className='url-main'>
      <form className='url-form' onSubmit={handleSubmit}>
        <input
          placeholder='Enter full URL here' 
          className='url-input url-long'
          name="target_url"
        />
        <input
          placeholder='Enter short URL here'
          className='url-input url-short'
          name="alias"
        />
        <input
          type='submit'
          placeholder='Enter short URL here' 
          className='btn'
        />
      </form>
    </div>
  )
}

export default URLShortener