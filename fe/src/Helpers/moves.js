const processMovesData = (l) => {
	return new Promise((resolve, reject) => {
		let itterable = [getLines(l), getSummary(l)]
		Promise.all(itterable).then((data) => {
			resolve(data)
		})

		// getLines(l).then((data) => {
		// 	resolve(data)
		// })
		// .catch((err) => {
		// 	reject(err)
		// })
		
	})
}

function getSummary(l){
	let obj = {}

	return new Promise((resolve, reject) => {
		for (var i = 0 ; i < l.length; i++){
			let summary = l[i].summary

			if (summary && summary.length){
				for (var j =0; j < summary.length; j++){
					if (obj[summary[j].activity]){
						
						obj[summary[j].activity].duration += l[i].summary[j].duration
						obj[summary[j].activity].distance += l[i].summary[j].distance
						if (summary[j].activity === "walking" || summary[j].activity === "running"){
							obj[summary[j].activity].steps += l[i].summary[j].steps	
						}
					} else {
						obj[summary[j].activity] = {}
						obj[summary[j].activity].duration = l[i].summary[j].duration
						obj[summary[j].activity].distance = l[i].summary[j].distance
						if (summary[j].activity === "walking" || summary[j].activity === "running"){
							obj[summary[j].activity].steps = l[i].summary[j].steps
						}
					}
				}
			}
		}
		
		resolve(obj)
	})
}

function getLines(l){
	return new Promise((resolve, reject) => {
		let lines = []
 		let places = []
 		// let highLng, lowLng, highLat, lowLat
 		// let bounds = new this.props.google.maps.LatLngBounds();
		for (var i = 0 ; i < l.length; i++){
			let date = l[i]
			if (date && date.segments){
				for (var j = 0; j < date.segments.length; j++){
					let segment = date.segments[j]
					if (segment.type === 'place'){
						places.push({lat: segment.place.location.lat, lng: segment.place.location.lon})
					}
					if (segment.type === 'move'){
						for (var k = 0; k< segment.activities.length;k++){
							let d = createLineArr(segment.activities[k])
							lines = lines.concat(d)
						}
					}
				}
			}
		}
		// this.setMapBounds()
		resolve({
			lines, places
		})
	})
}

function createLineArr(a){
	let trackPoints = []
	for (var i =0; i < a.trackPoints.length; i++){	
		trackPoints.push({lat: a.trackPoints[i].lat, lng: a.trackPoints[i].lon})	
	}
	return trackPoints
}

export default processMovesData