import React from 'react'
import { NavLink } from 'react-router-dom'
import './style.css'
import AnimatedBars from '../AnimatedBars'
const NavBar = props => (
	<div>
  <div className="navBarContainer" id="nav">
  	<div className="nameContainer">
	  	<div className="nameContentContainer">
		   	<h3 className="name">Bobby<span> Hewitt</span></h3>
		    <AnimatedBars/>
	    </div>
	    <div className="nameBackground" >
	    <h3 className="surprises">Let <span>life</span> <span>surprise</span> <span>you</span></h3>
	    </div>
    </div>
    <div className="linkContainer">
	    <NavLink className="link" to="/">
    		<div className="underline underline1" />
    		<h3 className="linkText">Test1</h3>
	    </NavLink>
	    <NavLink className="link" to="/about">
    		<div className="underline underline2" />
    		<h3 className="linkText">Test2</h3>	
	    </NavLink>
	    <NavLink className="link" to="/about">
    		<div className="underline underline3" />
    		<h3 className="linkText">Test3</h3>	
	    </NavLink>
    </div>
  </div>
  {/*<div className="subNavGrad">
  </div>*/}

  </div>
)


export default NavBar