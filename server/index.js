const express = require('express')
const bodyParser = require('body-parser')
var request = require('request');
const mongoose = require('mongoose')
const cors = require('cors')

const Me = require('./models/Me')

require('dotenv').config({path: '.env'})
const app = express()
app.use(cors())
app.use( bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL);

mongoose.connection.on('error', function() {
    console.info('Error: Could not connect to MongoDB.?')
});
mongoose.connection.on('connected', function() {
    console.info('Successfully connected to the database')
});



let PORT = process.env.PORT || 9000
app.listen(PORT, () => console.log('Example app listening on port ' + PORT))


app.get('/homedata', (req, res, next) => {
	Me.findOne({name: 'me'}, function(err, me){
		let itemsToSend = {}
		if (!err){
			itemsToSend.lastTrack = me.lastTrack
	      	itemsToSend.tracks = me.tracks
	      	itemsToSend.movesLines = me.movesLines
	      	itemsToSend.movesPlaces = me.movesPlaces
	      	itemsToSend.movesActivity = me.movesActivity
      		res.send(itemsToSend)
      	}


	})
})

// getHomeData()
setInterval(() => {
	getHomeData()
}, 1000 * 60 * 60 * 12)

function getHomeData(){
	console.log('getting data')
	Me.findOne({name: 'me'}, function(err, me){
		if (err) return console.log('No user found')
		let promises = [getSpotifyData(me), getMovesData(me)]
		Promise.all(promises).then((responses) => {
			processAndSaveHomeData(responses, me)
		}).catch((err) => {
			console.log(err)
		})
	})
}

function processAndSaveHomeData(response, me){
	let itemsToSave = {}
	if (response[0] && response[0].items && response[0].items.length > 1){
      let item = findFirstPreview(response[0].items)
      itemsToSave.lastTrack = item
      itemsToSave.tracks = response[0].items
    }
    if (response[1]){
      const movesData = response[1]
      processMovesData(movesData).then((d) => {

      	itemsToSave.movesLines = d[0].lines
      	itemsToSave.movesPlaces = d[0].places
      	itemsToSave.movesActivity = d[1]
      	saveMe(itemsToSave, me)
        console.log('moves success')
        // console.log(itemsToSave)
      })
    } 
}


function saveMe(items, me){
	let keys = Object.keys(items)
	for (var i = 0; i < keys.length; i++){
		if (items[keys[i]]){
			me[keys[i]] = items[keys[i]]
		}
	}
	me.save(function(){
		console.log('me saved')
		console.log(me)
	})
}

function findFirstPreview(items){
	for (var i =0; i < items.length; i++){
	  // console.log(items[0])
	  if (items[i].track.preview_url && items[i].track.preview_url.length){
	    return items[i]
	  }
	}
}

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

function refreshMovesToken(response, me){
	return new Promise((resolve, reject) => {
		console.log('Access token invalid: refreshing token')
		let refreshUrl = `https://api.moves-app.com/oauth/v1/access_token?grant_type=refresh_token&refresh_token=${me.refresh_token}&client_id=${process.env.MOVES_CLIENT_ID}&client_secret=${process.env.MOVES_CLIENT_SECRET}`
		request.post(url, (err, status, res) => {
			if (err){
				reject(err)
			} 
			let keys = Object.keys(res)
			for(var i =0; i < keys.length; i++){
				me[keys[i]] = res[keys[i]]
			}
			me.save(resolve(me))
		})
	})
	
}

function getMovesData(me){
	return new Promise((resolve, reject) => {
		console.log('User found: checking access token')
		let token = me.access_token
		let url = `https://api.moves-app.com/oauth/v1/tokeninfo?access_token=${token}`
		request(url, (err, status, res) => {
			if (err){
				refreshMovesToken(me).then((me) => {
					callMovesAPI(me).then((movesData) => {
						resolve(movesData)
					})
					.catch((err) => {
						reject(err)
					})
				})
			} else {
				callMovesAPI(me).then((movesData) => {
					resolve(movesData)
				})
				.catch((err) => {
					reject(err)
				})
			}
			
		})

	})
}

function callMovesAPI(me){
	return new Promise((resolve, reject) => {
		console.log('Access token valid: getting data')
		let token = me.access_token
		let url = `https://api.moves-app.com/api/1.1/user/storyline/daily?pastDays=7&trackPoints=true&access_token=${token}`
		request(url, (err, status, res) => {
			if (err) reject('could not get moves data')
			else {
				resolve(JSON.parse(res))
			}
			
		})
	})
	
}

function getSpotifyData(me){
	return new Promise((resolve, reject) => {
		var authOptions = {
		    url: 'https://api.spotify.com/v1/me/player/recently-played',
		    headers: { 'Authorization': 'Bearer ' + me.spotify_access_token },
		    json: true
		};
		callSpotifyTrackAPI(authOptions, function(result, expired){
			if(result){
				resolve(result)
			} else if (expired){
				refreshSpotifyToken(me).then((result2) => {
					resolve(result2)
				})
				.catch((err) => {
					reject('error with token')
				})
			} else {
				reject('token valid but error occured')
			}
		})

	})
}

function callSpotifyTrackAPI(options, callback){
	request(options, function(err, response, body){
		if(!err && response.statusCode === 200){
			callback(body)
		} else {
			if (err){
				console.log(err)
			} else {
				console.log(response.statusCode)
			}
			callback(false, response && response.statusCode === 401)
		}
	})
}

function refreshSpotifyToken(me){
	return new Promise((resolve, reject) => {
		console.log(me.spotify_refresh_token)
		var authOptions = {
		    url: 'https://accounts.spotify.com/api/token',
		    headers: { 
		    	'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')),
		    	"Content-Type": "application/x-www-form-urlencoded" 
		    },
		    form: {
		      grant_type: 'refresh_token',
		      refresh_token: me.spotify_refresh_token,
		    },
		    json: true
	  	};
		request.post(authOptions, function(error, res, body) {
			if (!error && res.statusCode === 200) {
			  	var access_token = body.access_token;
				  me.spotify_access_token = access_token
				  me.save(function(){
				  	var trackOptions = {
					    url: 'https://api.spotify.com/v1/me/player/recently-played',
					    headers: { 'Authorization': 'Bearer ' + access_token },
					    json: true
					};
				  	callSpotifyTrackAPI(trackOptions, function(result){
				  		if (result){
				  			resolve(result)
				  		} else {
				  			reject('error refreshing token')
				  		}
				  	})
				  })
			} else {
				console.log(res.statusCode)
				reject('error refreshing token')
			}
		});
	})
}




