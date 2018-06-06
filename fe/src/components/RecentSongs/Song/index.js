import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { FitSquare } from '../../'
import { connect } from 'react-redux'
import './style.css'
import { AnimatedBars } from '../../'
class Song extends Component {

	render(){
		console.log(this.props.isPlaying)
		return(
			<div className="songBackground">
			<FitSquare>
			{this.props.isPlaying &&
			 <audio ref="spotify" loop controls autoPlay>
	            <source src={this.props.s.track.preview_url} autoPlay type="audio/mpeg" />
	            Your browser does not support the audio tag.
	          </audio>
	         }
	         <div className="songController">

				 	<div className={this.props.isPlaying ? "songContainer isPlaying" : 'songContainer'}>
				 		<div style={{backgroundImage: 'url(' + this.props.s.track.album.images[0].url + ')'}}>
				 			<div className="diskCenter diskCenter1" >
				 			<div className="diskCenter diskCenter2">
				 			<div className="diskCenter diskCenter3">
				 			</div>
				 			</div>
				 			</div>
				 		</div> 

			 		</div>
				 	<div className={this.props.isPlaying ? "songNeedle isActive" : "songNeedle"}>
			        	<div/>
			        </div>
			</div>
			<div className="animatedBarsContainer">
				 	<AnimatedBars isAnimated={this.props.isPlaying}/>
				 	</div>
			</FitSquare> 
			</div>
		)
			
	
	}
}

const mapStateToProps = state => ({
  songs: state.homepage.spotify ? state.homepage.spotify.tracks.slice(0,12) : null 
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Song)
