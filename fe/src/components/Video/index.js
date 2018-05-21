import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './style.css'

class Hero extends Component {

	render(){
		return(
			<div className="videoContainer">
				<video width="100%" height="105%" autoPlay>
				  <source src={require('../../assets/hand_signs.mov')} type="video/mp4" />
				  
				Your browser does not support the video tag.
				</video>
				<div></div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
  
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hero)
