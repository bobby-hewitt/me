import React, { Component } from 'react'
import { Map, Polyline, Marker, GoogleApiWrapper } from 'google-maps-react'
import mapStyle from './mapStyle'
import './style.css'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class MapContainer extends Component {
 	constructor(props){
 		super(props)
 		this.state = {
 			animating:true
 		}
 	}

 	componentWillMount(){
 		let bounds = new this.props.google.maps.LatLngBounds();
 		for (var i = 0; i < this.props.lines.length; i++){
			bounds.extend(this.props.lines[i]);
		}
		this.setState({bounds, lines: this.props.lines, places: this.props.places}, () => {
			this.refs.map.map.fitBounds(bounds)
			this.animate()
		})
 	}
 	componentWillUnmount(){
 		this.setState({animating: false})
 	}

 	animate(){
 		var self = this;
   		var count = 0;
   		this.props.mapIsLoaded()
   		function animateIcon(){
   			if (self.state.animating){
   				count = (count + 1) % 10000;
		   		let line = self.refs.line
		   		var icons = line ? line.polyline.get('icons') : null;
		   		if(icons){
		   		let offset = count / 100
		   		icons[0].offset = offset + '%';
	            line.polyline.set('icons', icons);  
   				window.requestAnimationFrame(animateIcon)
   				}
   			} 
   			
            
   		}
		animateIcon()
 	}
	render() {
		var lineSymbol = {
          path: this.props.google.maps.SymbolPath.CIRCLE,
          scale: 2,
          fillOpacity: 1,
          zIndex:100,
          strokeColor: '#fff',
          opacity:1
        };
		return (
			
			<Map
				style = {{
				  minWidth: '100%',
				  height: '100%',
				  zIndex:'-1'
				}}
				
				ref="map"
				bounds={this.state.bounds ? this.state.bounds : null}
				google={this.props.google} 
				zoom={12} 
				styles={mapStyle}
				zoomControl={false}
				mapTypeControl={false}
				scaleControl={false}
				streetViewControl={false}
				panControl={false}
				rotateControl={false}
				initialCenter={{
					lat:51.517780, lng:-0.052984
				}}
				fullscreenControl={false}
				>
				{this.state.places && this.state.places.map((p,i) => {
					return(
					 	<Marker
						 	key={i}
						    title={'The marker`s title will appear as a tooltip.'}
						    icon={{
						      opacity:0.1,
						      url: require('../../pin.png'),
						      anchor: new this.props.google.maps.Point(2,2),
						      scaledSize: new this.props.google.maps.Size(4,4)
						    }}
						    position={p} 
						/>
					)
				})}
				<Polyline
					ref={'line'}
					icons={[{
			            icon: lineSymbol,
			            offset: '100%'
		          	}]}
					path={this.state.lines}
					strokeColor={"#ff6ec7"}
					strokeOpacity={0.2}
					strokeWeight={2} 
				/>
			</Map>
		
		);
	}
}
 
const Comp = GoogleApiWrapper({
  apiKey: 'AIzaSyB2mzRi4UHxbgUUXOyOjwFVserTD-gDzQc'
})(MapContainer)


const mapStateToProps = state => ({
  count: state.counter.count,
  spotify: state.homepage.spotify,
  lines: state.homepage.lines,
  places: state.homepage.places,
  api: state.setup.api
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comp)
