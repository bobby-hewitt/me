import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './style.css'

class Hero extends Component {

	render(){
		return(
			<div className={this.props.col ? "fitSquareContainer" + this.props.col : "fitSquareContainer" }>
				{this.props.children}
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
