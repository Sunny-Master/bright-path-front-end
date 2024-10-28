// npm modules
import { NavLink } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
  return (
    <nav>
      <h1><NavLink to="/">Bright Path</NavLink></h1>
      {user ?
        <ul>
          <li>Tasks</li>
          <li><NavLink to="/dashboard">Dashboard</NavLink></li>
          <li><NavLink to="" onClick={handleLogout}>Log Out</NavLink></li>
          <li><NavLink to="/auth/change-password">Change Password</NavLink></li>
        </ul>
      :
        <ul>
          <li><NavLink to="/auth/login">Log In</NavLink></li>
          <li><NavLink to="/auth/signup">Sign Up</NavLink></li>
        </ul>
      }
    </nav>
  )
}

export default NavBar
