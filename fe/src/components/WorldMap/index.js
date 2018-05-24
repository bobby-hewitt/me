import React, { Component } from 'react'
import worlddata from './geoJson'
import { geoMercator, geoPath } from 'd3-geo'
import './style.css'

let visited = ['Belgium', 'Croatia','United Kingdom','Denmark', 'Sweden', 'Morocco', 'Hungary', "United States of America"]
let booked = ['Thailand', 'Laos', 'Cambodia']
class WorldMap extends Component {

   createMap(){
      const projection = geoMercator()
      const pathGenerator = geoPath().projection(projection)
      const countries = worlddata.features.map((d,i) => {
         let isVisited = visited.indexOf(d.properties.name) > -1
         let isBooked = booked.indexOf(d.properties.name) > -1
         return(
            <path
            key={'path' + i}
            d={pathGenerator(d)}
            className={isVisited ? 'country isVisited' : isBooked ? 'country isBooked': 'country'}
            />
         )
         }
      )
      return countries
   }
   render() {
     
   return(
      <div className="world section">
      <svg width="100%" viewBox="0 0 1000 450">
         {this.createMap()}
      </svg>
      </div>
   )
   }
}
export default WorldMap