import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './style.css'

class Music extends Component {

	componentWillReceiveProps(np){
		console.log(np)
	}

	render(){
		return(
			<div className="musicContainer">
				{this.props.music && this.props.music.map((t,i) => {

					let artist = t.artist['#text']
					let name = t.name
					let image = t.image[3] ? t.image[3]['#text'] :  t.image[2] ? t.image[2]['#text'] :  t.image[1] ? t.image[1]['#text'] :  t.image[0] ? t.image[0]['#text'] : ''
					return(
						<div key={i} className="trackContainer" style={{backgroundImage: 'url(' +t.image[3]['#text']+')'}}>
							<div>
							<h3>{artist}</h3>
							<p>{name}</p>
							</div>
						</div>
					)

				})}
			</div>
		)
	}
}

const mapStateToProps = state => ({
  music: state.homepage.lastfm
})

const mapDispatchToProps = dispatch => bindActionCreators({
	
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Music)
