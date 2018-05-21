import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GoogleMaps from '../GoogleMaps'
import $ from 'jquery'
import './style.css'
import { moves } from '../../Helpers'
import { LastFM, TitleSection, Hero, AnimatedSVG, Video, Music } from '../../components'
import { setMovesData, setLastFMData, setSpotifyData } from '../../actions/homepage'
import SpotifyPlayer from '../SpotifyPlayer'
import { heyImBobby, myWeek, mapMyWeek } from '../../svg'

const api = 'http://localhost:9000'

class Home extends Component{

  constructor(props){
    super(props)
    this.state = {
      locationData: null,
      isRendered: true,
    }
  }
  componentWillMount(){
    var self = this;
    let url = '/get-moves'
    $.get(this.props.api + url, function(response){
      if (response.moves){
        const movesData = response.moves
        moves(movesData).then((d) => {
          self.props.setMovesData(d)
        })
      }
      if (response.lastfm){
        // console.log(response.lastfm.recenttracks.track.slice(0,3))
        self.props.setLastFMData(response.lastfm.recenttracks.track.slice(0,5))
      }
      if (response.spotify){
        self.props.setSpotifyData(response.spotify)
      }
    })
  }
  mapIsLoaded(){
    this.timeout = setTimeout(() => {
      this.setState({mapIsLoaded: true})
    },500)
  }

  componentWillUnmount(){
    clearTimeout(this.timeout)
  }



  render(){
    return(
      <div id="homeContainer">
        <Hero />
        <TitleSection color="#ddd" >
          <AnimatedSVG path={mapMyWeek} color="#ddd" vbw="180" width="300" autoAnimate/>
        </TitleSection>
        <div className={this.state.mapIsLoaded ? "googleMapsContainer isLoaded" : "googleMapsContainer"}>
          {this.props.hpdata.places && this.props.hpdata.lines && 
            <div>
              <GoogleMaps mapIsLoaded={this.mapIsLoaded.bind(this)} places={this.props.hpdata.places} lines={this.props.hpdata.lines}/>
            </div>
          }
          <div className={this.state.mapIsLoaded ? "mapLoader isLoaded" : "mapLoader"}>
          </div>
        </div>
        <LastFM />
        <TitleSection color="#ddd" >
          <AnimatedSVG path={myWeek} color="#ddd" vbw="240" width="400"/>
        </TitleSection>
        <Music />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  count: state.counter.count,
  hpdata: state.homepage,
  api: state.setup.api
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setMovesData,
  setLastFMData,
  setSpotifyData
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)