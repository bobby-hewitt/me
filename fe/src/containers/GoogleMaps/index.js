import React, { Component } from 'react'
import { Map, Polyline, Marker, GoogleApiWrapper } from 'google-maps-react'
import mapStyle from './mapStyle'
 class MapContainer extends Component {

 	constructor(props){
 		super(props)
 		this.state = {
 		}
 	}



 	componentWillMount(){
 		let bounds = new this.props.google.maps.LatLngBounds();
 		for (var i = 0; i < this.props.lines.length; i++){
			bounds.extend(this.props.lines[i]);
		}
		console.log(bounds)
		this.setState({bounds, lines: this.props.lines, places: this.props.places}, () => {
			this.refs.map.map.fitBounds(bounds)
			this.animate()
		})
 	}

 	animate(){
 		var self = this;
   		var count = 0;
   		this.props.mapIsLoaded()
   		function animateIcon(){
   			count = (count + 1) % 10000;
	   		let line = self.refs.line
	   		var icons = line.polyline.get('icons');
	   		let offset = count / 100
	   		icons[0].offset = offset + '%';
            line.polyline.set('icons', icons);  
            window.requestAnimationFrame(animateIcon)
   		}
		animateIcon()
 	}

 	
	render() {
		 var lineSymbol = {
          path: this.props.google.maps.SymbolPath.CIRCLE,
          scale: 2,
          fillOpacity: 1,
          zIndex:100,
          strokeColor: '#101010',
          opacity:1
        };
		return (
			<Map 
				ref="map"
				bounds={this.state.bounds ? this.state.bounds : null}
				google={this.props.google} 
				zoom={12} 
				styles={mapStyle}
				zoomControl={true}
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
						      anchor: new this.props.google.maps.Point(5,5),
						      scaledSize: new this.props.google.maps.Size(10,10)
						    }}
						    position={p} />
					)
				})}

				<Polyline
					ref={'line'}
					icons={[{
			            icon: lineSymbol,
			            offset: '100%'
		          	}]}
					path={this.state.lines}
					strokeColor={"rgba(200,200,200,0)"}
					strokeOpacity={1}
					strokeWeight={1} />
			</Map>

		);
	}
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyB2mzRi4UHxbgUUXOyOjwFVserTD-gDzQc'
})(MapContainer)