import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { FitSquare } from '../'
import { connect } from 'react-redux'
import './style.css'

class Activity extends Component {

	componentWillReceiveProps(np){
		console.log(np)
	}

	render(){
		return(
			<div className="activityContainer">
			
				{this.props.activity &&
					<FitSquare col="3">
					 	<div className="activityTypeContainer" >
					 	<div>
					 		<img className="activityIcon" src={require('../../assets/walking.png')} />
					 		<p >{this.props.activity.walking ? this.props.activity.walking.steps.toLocaleString() : '0'}<span className="light"> steps</span></p>		
					 	</div>
					 			
					 	</div> 
					</FitSquare> 
				}
				{this.props.activity &&
					<FitSquare col="3">
					 	<div className="activityTypeContainer" >
					 		{this.props.activity.walking &&
					 			<div>
					 				<img className="activityIcon" src={require('../../assets/transport.png')} />
					 				<p >{this.props.activity.transport ? Math.floor(this.props.activity.transport.distance / 1000).toLocaleString() : '0'}<span className="light"> km</span></p>		
					 			</div>
					 		}
					 	</div> 
					</FitSquare> 
				}
				{this.props.activity &&
					<FitSquare col="3">
					 	<div className="activityTypeContainer" >
					 		{this.props.activity.walking &&
					 			<div>
					 				<img className="activityIcon" src={require('../../assets/cycling.png')} />
					 				<p >{this.props.activity.cycling ? Math.floor(this.props.activity.cycling.distance / 1000).toLocaleString() : '0'}<span className="light"> km</span></p>		
					 			</div>
					 		}
					 	</div> 
					</FitSquare> 
				}
		
			<div className="clearfix" />
        	</div>
		)
	}
}

const mapStateToProps = state => ({
  activity: state.homepage.activity
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activity)
