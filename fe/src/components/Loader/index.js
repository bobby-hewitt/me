import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './style.css'

class Loader extends Component {

	constructor(props){
		super(props)
		this.state = {
			isMounted: this.props.loading
		}
	}

	componentWillReceiveProps(np){
		console.log(np)
		this.setState({isMounted: np.loading})
	}



	

	componentDidMount(){
		// setTimeout(() => {
		// 	this.setState({isMounted: true})
		// },1)
		// setTimeout(() => {
		// 	this.setState({isMounted: false})
		// },1000)
	}

	render(){
		let cn = "loaderContainer"
		if (this.state.isMounted) cn += ' isMounted'
		
		return(
			<div className={cn}>
				
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
)(Loader)
