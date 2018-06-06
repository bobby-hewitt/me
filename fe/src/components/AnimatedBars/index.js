import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const AnimatedBars = props => (
	<div className={props.isAnimated ? "animatedBarsContainer isAnimated" : "animatedBarsContainer"}>
	    <div className="bar" />
	    <div className="bar" />
	    <div className="bar" />
	    <div className="bar" />
	    <div className="bar" />
	    <div className="bar" />
	    <div className="bar" />  
	</div>
)


export default AnimatedBars