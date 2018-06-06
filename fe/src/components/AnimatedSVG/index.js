import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addElemToScrollCheck } from '../../actions/ui'
import './style.css'

class SVG extends Component {

	constructor(props){
		super(props)
		this.state = {
			isFull: false
		}
	}


	componentDidMount(){
		
		if(!this.props.autoAnimate){
			let elem = {
				ref: this.refs.container,
				func: this.animateIn.bind(this)
			}
			this.props.addElemToScrollCheck(elem)
		}
		let path = this.refs.svg
		let length = path.getTotalLength();
		path.style.transition = path.style.transition ='none';
		// Set up the starting positions
		path.style.strokeDasharray = length + ' ' + length;
		path.style.strokeDashoffset = length;
		// Trigger a layout so styles are calculated & the browser
		// picks up the starting position before animating
		// Define our transition
		if(this.props.autoAnimate){
			path.getBoundingClientRect();
			this.animateIn()
		}
	}

	animateIn(){
		
		let path = this.refs.svg
		if (path){
			path.style.transition = path.style.transition ='fill-opacity 0.3s ease,stroke-dashoffset 10s ease';
			path.style.strokeDashoffset = '0';
			setTimeout(() => {
				this.setState({isFull: true})	
			},2000)	
		}
		
	}

	render(){
		//font poppins 25 bold
		return(
			<div ref="container" className="SVGContainer" style={{background: this.props.color}}>
				<svg  xmlns="http://www.w3.org/2000/svg" width={this.props.width} height="130px" viewBox={"0 0 " + this.props.vbw + " 20"}>
			 		<path ref="svg" d={this.props.path} className={this.state.isFull ? 'path isFull' : 'path'}></path>
			 	</svg>
			</div>
		)
	}
}

const mapStateToProps = state => ({
  
})

const mapDispatchToProps = dispatch => bindActionCreators({
	addElemToScrollCheck
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SVG)
