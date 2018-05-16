import React, { Component } from 'react'

import './style.css'
export default class SpotifyPlayer extends Component {

	componentWillMount(){
		console.log('hello')
	}




	render(){
		return(

			<audio autoPlay controls>
			
			  <source src={this.props.track.preview_url} type="audio/mpeg" />
			  Your browser does not support the audio tag.
			</audio>	
		)
	}
}