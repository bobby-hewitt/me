import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GoogleMaps from '../GoogleMaps'
import $ from 'jquery'
import './style.css'
import { moves } from '../../Helpers'
import SpotifyPlayer from '../SpotifyPlayer'
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
      // let data = JSON.parse(response)
      console.log(response)
      if (response.moves){
        const movesData = response.moves
        moves(movesData).then((d) => {
          console.log(d)
          self.setState({
            places: d[0].places,
            lines: d[0].lines,
            activity: d[1]
          })
        })
      }
      if (response.lastfm){
        const lastfmData = response.lastfm
      }
      if (response.spotify){
        self.setState({spotify: response.spotify})
      }
      
      // console.log(movesData)
      // console.log(JSON.parse(lastfmData))
      // console.log(movesData)
      
    })
  }
  mapIsLoaded(){
    this.setState({mapIsLoaded: true})
  }
  render(){
    return(
      <div>
      {this.state.isRendered &&
        <div className={this.state.mapIsLoaded ? "googleMapsContainer isLoaded" : "googleMapsContainer"}>
          {this.state.places && this.state.lines && 
            <GoogleMaps mapIsLoaded={this.mapIsLoaded.bind(this)} places={this.state.places} lines={this.state.lines}/>
          }
          {this.state.spotify &&
            <SpotifyPlayer track={this.state.spotify}/>
          }
        </div>
      }
      
      </div>
    )
  }
}

const mapStateToProps = state => ({
  count: state.counter.count,
  api: state.setup.api
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)