import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GoogleMaps from '../GoogleMaps'
import $ from 'jquery'
import './style.css'
import { moves } from '../../Helpers'
import { LastFM, TitleSection, Hero, AnimatedSVG, Video, Music, FitSquare, WorldMap } from '../../components'
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
    let url = '/get-my-data'
    $.get(this.props.api + url, function(response){
      console.log(response)
      if (response[1]){
        const movesData = response[1]
        moves(movesData).then((d) => {
          self.props.setMovesData(d)
        })
      }
      if (response[0] && response[0].items && response[0].items.length > 1){
        let item = self.findFirstPreview(response[0].items)
        self.props.setSpotifyData({
          lastTrack: item,
          tracks: response[0].items
        })

      }

    })
  }

  findFirstPreview(items){
    for (var i =0; i < items.length; i++){
      // console.log(items[0])
      if (items[i].track.preview_url && items[i].track.preview_url.length){
        return items[i]
      }
    }
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
          <AnimatedSVG color="#ddd" vbw="180" width="300" autoAnimate/>
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
          <AnimatedSVG  color="#ddd" vbw="240" width="400"/>
        </TitleSection>
        <FitSquare />
        <FitSquare />
        <FitSquare />
        <TitleSection color="#ddd" >
          <AnimatedSVG  color="#ddd" vbw="240" width="400"/>
        </TitleSection>
        <WorldMap/>
        <TitleSection color="#ddd" >
          <AnimatedSVG  color="#ddd" vbw="240" width="400"/>
        </TitleSection>
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