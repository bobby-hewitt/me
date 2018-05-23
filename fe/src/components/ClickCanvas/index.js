import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import {CircleClass } from './circles'
var requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();




export default class ClickCanvas extends Component {
	

	componentDidMount(){
		const nav = document.getElementById('nav')
		var c = document.getElementById('heroCanvas');
		var ctx = c.getContext('2d');
		var cw = c.width = window.innerWidth;
		var ch = c.height = window.innerHeight;
		
		let Circles = new CircleClass(ctx)		
		// console.log(CircleClass)
		nav.onmousedown=function(e){

			console.log(Circles)
			// Circles.loop()
			Circles.playCircles(e)

			// console.log(Circles)
			
	  	}

	  	
	}

	render(){
		return(
 			<div className="canvassContainer">
  				<canvas id="heroCanvas"></canvas>
  			</div>
		)
	}
}
 