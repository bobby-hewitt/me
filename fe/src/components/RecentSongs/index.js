import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { FitSquare } from '../'
import { connect } from 'react-redux'
import { setCurrentlyPlaying } from '../../actions/homepage'
import Song from './Song'
import './style.css'

class RecentSongs extends Component {

	setCurrentlyPlaying(i){
		let toPass = i
		if (i === this.props.isPlaying) toPass = false
		this.props.setCurrentlyPlaying(toPass)

	}

	render(){
		return(
			<div className="songsContainer">

			{this.props.songs && this.props.songs.map((s, i) => {
				console.log(this.props.isPlaying)
				return(
					<div className="song" key={i} onClick={this.setCurrentlyPlaying.bind(this, i)}>
						
						<Song s={s} isPlaying={i === this.props.isPlaying}/>
					
					</div>
				)
			})}
			<div className="clearfix" />

        	</div>
		)
	}
}

const mapStateToProps = state => ({
	isPlaying: state.homepage.currentlyPlaying,
	songs: state.homepage.tracks ? state.homepage.tracks.slice(0,12) : null 
})

const mapDispatchToProps = dispatch => bindActionCreators({
	setCurrentlyPlaying
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentSongs)
