import React from "react";
import {Link} from 'react-router-dom';
import { AuthContext } from "../App";

export const Header = () => {
  const { state, dispatch } = React.useContext(AuthContext);
  const style={ color:'white'};
  return (
    <nav id="navigation">
      <h1>logo</h1>
      <ul className="nav-links">
      <Link to="/login">{!state.isAuthenticated && <li style={style}>Login</li>}</Link>
        <Link to="/register">{!state.isAuthenticated && <li style={style}>Register</li>}</Link>
  <Link to="logout" onClick={()=> dispatch({ type:"LOGOUT"})}>{state.isAuthenticated&&<li style={style}>logout</li>}</Link>
      </ul>
    </nav>
    
  );
};

export default Header;
