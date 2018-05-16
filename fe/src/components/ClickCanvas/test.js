import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
var requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();




export default class Canvass extends Component {

	constructor(props){
		super(props)
		this.state = {
			mouseX: window.innerWidth /2,
			mouseY: window.innerWidth / 2,
			isAnimating: false
		}
	}

	componentWillMount(){

	}

	componentDidMount(){
		console.log('DID MOUNT')
		var self = this;

		var requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();
		var rand = function(a,b){return ~~((Math.random()*(b-a+1))+a);}
		var c = document.getElementById('heroCanvas');
		var ctx = c.getContext('2d');
		var cw = c.width = window.innerWidth;
		var ch = c.height = window.innerHeight;
		var circles = [];
		var count = 20;
		var tick = 3;
		var tickMax = 3;
		var isAnimating = false

		document.onmousemove=function(e) {
	       
	  	};

		  document.onmousedown=function(e){
				if(!self.state.isAnimating){
			  	self.setState({isAnimating:true}, () => {
			  		
			  		for(var i = 0; i < circles.length; i++){
				  			circles[i].init(e.clientX,e.clientY)
				  		}
			  		setTimeout(() => {
				  		self.setState({isAnimating: false})
			  		},1500)
			  	loop();
			  	});
		  	}
		  	
		  }

		var Circle = function(){
		  this.init();
		}
		    
		Circle.prototype.init = function(x,y){
		  this.x = x;
		  this.y = y;
		  this.vx = (rand(-50, 50))/12;
		  this.vy = (rand(-50, 50))/9;
		  this.lightness = rand(0, 50);
		  this.alpha = .2;
		  this.fade = -.005;
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
		  // ctx.fillStyle = 'hsla(0, 0%, '+this.lightness+'%, '+this.alpha+')';
		  ctx.fillStyle = 'rgba(0,0,0,'+this.alpha+')';
		  ctx.beginPath();
		  ctx.arc(0, 0, 1,0, 2 * Math.PI, false);
		  ctx.fill();
		  ctx.restore();
		}
		  
		var createCircles = function(){
		  if(circles.length < count){
		   
		      circles.push(new Circle());
		  
		  }
		}
		    
		var updateCircles = function(){
		  var i = circles.length;
		  while(i--){
		    circles[i].update(i);
		  }
		}
		  
		var renderCircles = function(){
		  var i = circles.length;
		  while(i--){
		    circles[i].render();
		  }
		}
		    
		var loop = function(){
			if(self.state.isAnimating){
			  requestAnimFrame(loop);
			  ctx.clearRect(0, 0, cw, ch);
			  createCircles();
			  updateCircles();
			  renderCircles();
			}
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
 