import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './style.css'
import AnimatedBars from '../AnimatedBars'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SpotifyPlayer from '../../containers/SpotifyPlayer'

class NavBar extends Component{

  constructor(props){
    super(props);
    this.state = {
      isPlaying: false,
    }
  }

  play(){
    if (this.refs.spotify){
      this.refs.spotify.play()
    }
  }

  stop(){
    if (this.refs.spotify){
      this.refs.spotify.pause()
    }
  }

  render(){
    return(
      <div className="navBarContainer" id="nav">
        {this.props.spotify && 
          <audio ref="spotify" loop controls>
            <source src={this.props.spotify.lastTrack.track.preview_url} type="audio/mpeg" />
            Your browser does not support the audio tag.
          </audio>
        }
        <div className="nameContainer">
          <div className="nameContentContainer" onMouseEnter={this.play.bind(this)} onMouseLeave={this.stop.bind(this)}>
            {/*<p className="name">Bobby<span> Hewitt</span></p>*/}
            <div className={this.props.spotify ? "barsContainer canPlay" : "barsContainer"}> 
            <AnimatedBars />
            </div>
            
          </div>
          <div className="nameBackground" >
          <h3 className="surprises">Let <span>life</span> <span>surprise</span> <span>you</span></h3>
          </div>
        </div>
        <div className="linkContainer">
          <NavLink className="link" to="/">
            <div className="underline underline1" />
            <p className="linkText">Test1</p>
          </NavLink>
          <NavLink className="link" to="/about">
            <div className="underline underline2" />
            <p className="linkText">Test2</p> 
          </NavLink>
          <NavLink className="link" to="/about">
            <div className="underline underline3" />
            <p className="linkText">Test3</p> 
          </NavLink>
        </div>
      </div>
    )
  }
} 
const mapStateToProps = state => ({
  count: state.counter.count,
  spotify: state.homepage.spotify,
  api: state.setup.api
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)

