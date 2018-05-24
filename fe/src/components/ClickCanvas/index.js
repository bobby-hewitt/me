import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import Banner from './banner'
var requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();




export default class ClickCanvas extends Component {
	



	componentDidMount(){
		// var banner = new Banner();
		// banner.initialize("heroCanvas");
		//canvas vars
		var c = document.getElementById('heroCanvas');
		var ctx = c.getContext('2d');
		var cw = c.width = window.innerWidth;
		var ch = c.height = window.innerHeight;
		//helper functions
		var requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();
		var rand = function(a,b){return ~~((Math.random()*(b-a+1))+a);}
		//components
		const nav = document.getElementById('nav')
		//circle vars
		var circles = [];
		var circlesCount = 30;
		//square vars
		var squares = []
		var squaresCount = 1
		//animation initiations
		nav.onmousedown=function(e){
			playCircles(e)		
	  	}
	  	
	  	//circle functions
	  	function playCircles(e){var obj = {x: e.clientX, y: e.clientY, circles:[] }; for(var i = 0; i < circlesCount; i++){var c = new Circle(); c.init(e.clientX,e.clientY); obj.circles.push(c); }; circles.push(obj); setTimeout(() => {circles.shift(); },1500); };
		var Circle = function(){this.init(); };
		Circle.prototype.init = function(x,y){let r = Math.random(); if (r < .333){this.random = 0; } else if ( r < .66){this.random = 1; } else {this.random = 2; }; this.x = x; this.y = y; this.vx = (rand(-20, 20))/9; this.vy = (rand(-20, 20))/9; this.lightness = rand(0, 50); this.alpha = .99; this.fade = -.035; this.scale = 1; this.growth = .06; this.rotation = rand(0, Math.PI*2); this.spin = (rand(0, 100)-50)/300; };
		Circle.prototype.update = function(i){this.x += this.vx; this.y += this.vy; this.vy += .15 * this.scale; if(this.alpha < 1){this.alpha += this.fade; }; this.scale += this.growth; this.rotation += this.spin; }
		Circle.prototype.render = function(){ctx.save(); ctx.translate(this.x, this.y); ctx.scale(this.scale, this.scale); ctx.rotate(this.rotation); ctx.fillStyle = 'rgba(255,255,255,'+this.alpha+')'; ctx.beginPath(); ctx.arc(0, 0, 1,0, 2 * Math.PI, false); ctx.fill(); ctx.restore(); };
		var createCircles = function(){if(circles.length > 0){for (var i = 0; i < circles.length; i++){var newCircles = []; for (var j = 0; j < circles[i].circles.length; j++){newCircles.push(new Circle(circles[i].x, circles[i].y)); }; circles[i].circles = newCircles; }; }; };
		var updateCircles = function(){if (circles.length > 0){for (var i =0; i < circles.length; i++){for (var j = 0; j < circles[i].circles.length; j++){circles[i].circles[j].update(i); }; }; }; };
		var renderCircles = function(){if (circles.length > 0){for (var i =0; i < circles.length; i++){for (var j = 0; j < circles[i].circles.length; j++){circles[i].circles[j].render(); }; }; }; };
		//loop

		var Square = function(){
			this.init();
		}

		Square.prototype.init = function(){
			this.height = ch;
			this.width = cw;
			this.fill = 'rgb(255,0,0)';
			this.size = 0;
			this.y = 0;
			this.vSize = 20;
			this.vy = 0;
		}

		Square.prototype.update = function(){
			// console.log('updating')
			this.size += this.vSize
		}

		Square.prototype.render = function(){
			// ctx.save()
			
			ctx.beginPath();
    		ctx.rect(cw/2, cw/2, this.size, Math.PI*-2, Math.PI * 2, true); // Outer circle
    		ctx.fill();
			
			// ctx.restore()
		}
		var createSquares = () => {
			for (var i =0; i < squaresCount; i++){
				squares.push(new Square())
			}

		}
		var updateSquares = () => {
			// console.log('updating')
			if (squares.length > 0){
				for (var i = 0; i < squares.length; i++){
					squares[i].update(i)
				}
			}
		}
		var renderSquares = () => {
			if (squares.length > 0){
				for (var i = 0; i < squares.length; i++){
					squares[i].render(i)
				}
			}
		}

		// createSquares()

		function animateLoadIn(){
			
		}

		function animateLoadOut(){

		}

		var loop = function(){
			requestAnimFrame(loop);
			ctx.clearRect(0, 0, cw, ch);
			if (circles.length > 0){
				updateCircles();
				renderCircles();
			}
			if (squares.length > 0){
				updateSquares();
				renderSquares();
			}
		}
		loop()
	}

	render(){
		return(
 			<div className="canvassContainer">
  				<canvas id="heroCanvas"></canvas>
  			</div>
		)
	}
}
 