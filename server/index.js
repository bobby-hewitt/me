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

app.get('/get-my-data', (req, res, next) => {
	console.log('getting data')
	Me.findOne({name: 'me'}, function(err, me){
		if (err) return console.log('No user found')
		let promises = [getSpotifyData(me), getMovesData(me)]
		Promise.all(promises).then((responses) => {
			res.send(responses)
		}).catch((err) => {
			res.send({})
		})
	})
})




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




