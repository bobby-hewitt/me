import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GoogleMaps from '../GoogleMaps'
import $ from 'jquery'
import './style.css'
import { moves } from '../../Helpers'
import { RecentSongs, Activity, TitleSection, Hero, AnimatedSVG, Video, Music, FitSquare, WorldMap } from '../../components'
import { setMovesData, setLastFMData, setSpotifyData, setHomepage } from '../../actions/homepage'
import { endLoad } from '../../actions/ui'
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
    if (!this.props.hpdata.lines || !this.props.hpdata.places || !this.props.hpdata.lastTrack){
    let url = '/homedata'
      $.get(this.props.api + url, function(response){
        self.props.setHomepage(response)
        self.loadTimeout = setTimeout(() => {
          self.props.endLoad()
        },1000)  
      })
    }
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
      this.props.endLoad()
      this.setState({mapIsLoaded: true})
    },1000)
  }

  componentWillUnmount(){
    clearTimeout(this.timeout)
    clearTimeout(this.loadTimeout)
  }



  render(){
    return(
      <div id="homeContainer">
        <Hero >
          <Video />
        </Hero>

        <TitleSection color="#111" >
          <AnimatedSVG color="#111" vbw="180" width="300" path={mapMyWeek} autoAnimate/>
        </TitleSection>
        <div className={this.state.mapIsLoaded ? "googleMapsContainer isLoaded" : "googleMapsContainer"}>
          {this.props.hpdata.places && this.props.hpdata.lines && 
            <div>
              <GoogleMaps mapIsLoaded={this.mapIsLoaded.bind(this)} places={this.props.hpdata.places} lines={this.props.hpdata.lines}/>
            </div>
          }
          <div className="mapGrad" />
          <div className={this.state.mapIsLoaded ? "mapLoader isLoaded" : "mapLoader"}>
          </div>
        </div>
        <TitleSection color="#111" >
          <AnimatedSVG  color="#111" vbw="240" path={myWeek} width="400"/>
        </TitleSection>
         <RecentSongs />
         <TitleSection color="#111" >
          <AnimatedSVG  color="#111" vbw="240" path={myWeek} width="400"/>
        </TitleSection>
        <Activity/>
        <TitleSection color="#111" >
          <AnimatedSVG  color="#111" vbw="240" path={myWeek} width="400"/>
        </TitleSection>
        <WorldMap/>
        
        <TitleSection color="#111" >
          <AnimatedSVG  color="#111" vbw="180" width="300" path={mapMyWeek}/>
        </TitleSection>
       
        
        <TitleSection color="#111" >
          <AnimatedSVG  color="#111" vbw="240"path={myWeek} width="400"/>
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
  endLoad,
  setLastFMData,
  setSpotifyData,
  setHomepage
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)