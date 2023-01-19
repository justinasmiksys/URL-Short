import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Header = () => {

  const { user, logoutUser } = useAuth()

  return (
    <div className='nav'>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        {user ? <li onClick={logoutUser}><a>Logout</a></li> : (
          <>
            <li>
              <Link to='/login'>Login</Link>
            </li>

            <li>
              <Link to='/signup'>Signup</Link>
            </li>
          </>
          )
        }
      </ul>
        {user && <p>Hello {user.username}</p>}
    </div>
  )
}

export default Header