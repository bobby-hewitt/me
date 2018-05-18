import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './style.css'

class LastFM extends Component {
	componentWillMount(){
		console.log(this.props.lastFM)
	}
	componentWillReceiveProps(np){
		console.log(np.lastFM)
	}
	render(){
		return(
			<div/>
		)
	}
}

const mapStateToProps = state => ({
  lastFM: state.homepage.lastFM,
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LastFM)
