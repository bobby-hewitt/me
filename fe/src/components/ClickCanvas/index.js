import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
var requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();




export default class ClickCanvas extends Component {
	

	componentDidMount(){
		const nav = document.getElementById('nav')
		var c = document.getElementById('heroCanvas');
		var ctx = c.getContext('2d');
		var cw = c.width = window.innerWidth;
		var ch = c.height = window.innerHeight;


		var requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();
		var rand = function(a,b){return ~~((Math.random()*(b-a+1))+a);}
		var circles = [];
		var circlesCount = 30;

		nav.onmousedown=function(e){
		  	playCircles(e)
	  	}

	  	function playCircles(e){
	  		var obj = {
	  			x: e.clientX,
	  			y: e.clientY,
	  			circles:[]
	  		}
	  		for(var i = 0; i < circlesCount; i++){
	  			var c = new Circle()
	  			c.init(e.clientX,e.clientY)
	  			obj.circles.push(c)
		  	}
		  	circles.push(obj)
	  		setTimeout(() => {
	  			circles.shift()
	  		},1500)
	  	}
		  
		var Circle = function(){
		  this.init();
		}
		    
		Circle.prototype.init = function(x,y){
			let r = Math.random()
			if (r < .333){
				this.random = 0
			} else if ( r < .66){
				this.random = 1
			} else {
				this.random = 2
			}
		  this.x = x;
		  this.y = y;
		  this.vx = (rand(-20, 20))/9;
		  this.vy = (rand(-20, 20))/9;
		  this.lightness = rand(0, 50);
		  this.alpha = .99;
		  this.fade = -.035;
		  this.scale = 1;
		  this.growth = .06;
		  this.rotation = rand(0, Math.PI*2);
		  this.spin = (rand(0, 100)-50)/300;
		}
		    
		Circle.prototype.update = function(i){
		  this.x += this.vx;
		  this.y += this.vy;
		  this.vy += .15 * this.scale;
		  if(this.alpha < 1){
		    this.alpha += this.fade;
		  }
		  this.scale += this.growth;
		  this.rotation += this.spin;
		}
		  
		Circle.prototype.render = function(){
		  ctx.save();
		  ctx.translate(this.x, this.y);
		  ctx.scale(this.scale, this.scale);
		  ctx.rotate(this.rotation);  
		  // ctx.fillStyle = 'rgba(16,16,16,' + this.alpha + ')'
		  ctx.fillStyle = this.random === 0 ? 'rgba(242,49,47,'+this.alpha+')' : this.random ===1 ? 'rgba(34,209,45,'+this.alpha+')':'rgba(42,221,252,'+this.alpha+')' ;
		  ctx.beginPath();
		  ctx.arc(0, 0, 1,0, 2 * Math.PI, false);
		  ctx.fill();
		  ctx.restore();
		}
		  
		var createCircles = function(){
		  if(circles.length > 0){ 	
		   	for (var i = 0; i < circles.length; i++){
		   		console.log(circles[i])
		   		var newCircles = []
		   		for (var j = 0; j < circles[i].circles.length; j++){
		   			newCircles.push(new Circle(circles[i].x, circles[i].y))
		   		}
		    	circles[i].circles = newCircles  
		   	}
		  }
		}
		    
		var updateCircles = function(){
			if (circles.length > 0){
				for (var i =0; i < circles.length; i++){
					for (var j = 0; j < circles[i].circles.length; j++){
						circles[i].circles[j].update(i);
					}
				}
			}
		}
		  
		var renderCircles = function(){
		  if (circles.length > 0){
				for (var i =0; i < circles.length; i++){
					for (var j = 0; j < circles[i].circles.length; j++){
						circles[i].circles[j].render();
					}
				}
			}
		}
		    
		var loop = function(){
			requestAnimFrame(loop);
			ctx.clearRect(0, 0, cw, ch);
			if (circles.length > 0){
				updateCircles();
				renderCircles();
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
 