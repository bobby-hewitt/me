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

// const me = { 
// 	access_token: '09N19KL6_V0IMvl7EU7f2FUEDk0m63toupNVRb58ggZ014jmO57XRcn2EU8DaFJE',
// 	token_type: 'bearer',
// 	expires_in: 15551999,
// 	refresh_token: 'sPY0vTQI30rHIJL37JMS9nKOA2V93e3J5yla_39DAhj2Y45c6eJsQkR9PcuOMe9N',
// 	user_id: 69099701657845820 
// }

// Me.create(me, function (err, investment) {
//   if (err) console.log('me not created') 
//   else console.log('success adding investment')
// })

// Me.findOne({}, function(err, me){
	// console.log(me)
	// me.name="me"
	// me.save()
// })



app.post('/res', (req, res) => {
	console.log(req.body)
	console.log(req)
	// res.send('Hello World!'))
})

// ID

let PORT = process.env.PORT || 9000
app.listen(PORT, () => console.log('Example app listening on port ' + PORT))

var id = '3wshpVqsf39llcb11mFUP7j7tz66Dz2w'
var secret = '34Pn6pct3lOpwOd4ysev3z0Pvb6F5MPVv4B3dlvK0II30bz3tfiH0Qz3Hm6YlsPM'
var code = 'manwwj0z2QUqO4M9oFwidN3H9Z161VYBhfpsQlPSd92J6IGELFOuMOcP2i1357cu'


app.get('/get-moves', (req, res, next) => {
	Me.findOne({name: 'me'}, function(err, me){
		if (err) return console.log('No user found')
		checkAccessToken(res, me)
	})
})



function refreshToken(response, me){
	console.log('Access token invalid: refreshing token')
	let refreshUrl = `https://api.moves-app.com/oauth/v1/access_token?grant_type=refresh_token&refresh_token=${me.refresh_token}&client_id=${process.env.MOVES_CLIENT_ID}&client_secret=${process.env.MOVES_CLIENT_SECRET}`
	request.post(url, (err, status, res) => {
		if (err){
			return console.log('Refreshing token failed')
		} 
		let keys = Object.keys(res)
		for(var i =0; i < keys.length; i++){
			me[keys[i]] = res[keys[i]]
		}

		me.save(getMovesData(response, me))
	})
}

function checkAccessToken(response, me){
	console.log('User found: checking access token')
	let token = me.access_token
	let url = `https://api.moves-app.com/oauth/v1/tokeninfo?access_token=${token}`
	request(url, (err, status, res) => {
		if (err) refreshToken(response, me)
		getMovesData(response, me)
	})

}

function getMovesData(response, me){
	console.log('Access token valid: getting data')
	let token = me.access_token
	let url = `https://api.moves-app.com/api/1.1/user/storyline/daily?pastDays=7&trackPoints=true&access_token=${token}`
	request(url, (err, status, res) => {
		if (err) console.log('ERROR with call')
		let moves = JSON.parse(res)
		getLastFM(response, moves)
		// response.send(res)
	})
}

function getLastFM(response, moves){
	let url = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=gingerbob89&api_key=fbf9744101ebad363e1a570fa82bf4d7&format=json'
		request(url, (err, status, lastfm) => {
		if (err) response.send({moves})
		else {
			lastfm = JSON.parse(lastfm)
			getSpotify(lastfm.recenttracks.track).then((track) => {
				response.send({
					moves, 
					lastfm,
					spotify: track.spotify
				})
			})
			.catch((err) => {
				response.send({
					moves, 
					lastfm
				})
			})
		}
		
		
	})
	// response.send(moves)	
}



function getSpotify(tracks){
	return new Promise((resolve, reject) => {
		getSpotifyToken()
		.then((token) => {
			console.log('getting track')
			searchSpotifyTrack(token, tracks, 0)
			.then((track) => {
				resolve({spotify: track})
			})
			.catch((err) => {
				console.log('caught error')
				reject({spotify: null})
			})
		})
		.catch((err) => {
			reject(err)
		})
	})
}

function getSpotifyToken(){
	console.log('getting token')
	return new Promise((resolve, reject) => {
		var authOptions = {
		  url: 'https://accounts.spotify.com/api/token',
		  headers: {
		    'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
		  },
		  form: {
		    grant_type: 'client_credentials'
		  },
		  json: true
		};
		request.post(authOptions, function(error, response, body) {
		  if (!error && response.statusCode === 200) {
		  	console.log('TOKEN RETIRNEVED', body)
		    // use the access token to access the Spotify Web API
		    resolve(body.access_token);
		  } else {
		  	reject(error)
		  }
		})
	})
}


function searchSpotifyTrack(token, tracks, index){
	const artist = encodeURIComponent(tracks[index].artist['#text'])
	const name = encodeURIComponent(tracks[index].name)
	var options = {
      url: `https://api.spotify.com/v1/search?type=track&q=${artist}%20${name}`,
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
	return new Promise((resolve, reject) => {
		request.get(options, function(error, response, body) {
			if (error && index < tracks.length){
				searchSpotifyTrack(token, tracks, index + 1)
			} else if (error){
				reject()
			} else if (body && body.tracks && body.tracks.items && body.tracks.items[0] && body.tracks.items[0].preview_url){
				resolve(body.tracks.items[0])
			} else if (index < tracks.length){
				searchSpotifyTrack(token, tracks, index + 1)
			}			
	    });
	})
	
	// return new Promise((resolve, reject) => {
	// 	var options = {
	// 	      url: 'https://api.spotify.com/v1/search',
	// 	      headers: {
	// 	        'Authorization': 'Bearer ' + token
	// 	      },
	// 	      json: true
	// 	};
	//     request.get(options, function(error, response, body) {
	//       resolve(body)
	//     });
	// })
}

function getSpotifyTrack(token){
	console.log(token)
	return new Promise((resolve, reject) => {
		
		    var options = {
		      url: 'https://api.spotify.com/v1/tracks/6STfEYoFeHSzUcYcZClBng?market=GB',
		      headers: {
		        'Authorization': 'Bearer ' + token
		      },
		      json: true
		    };
		    request.get(options, function(error, response, body) {
		      resolve(body)
		    });
		 
	})
	
}

// function getSpotifyTrack(response, obj){
// 	// your application requests authorization
// 	request.post(authOptions, function(error, response, body) {
// 	  if (!error && response.statusCode === 200) {
// 	    // use the access token to access the Spotify Web API
// 	    var token = body.access_token;
// 	    var options = {
// 	      url: 'https://api.spotify.com/v1/tracks/6STfEYoFeHSzUcYcZClBng?market=GB',
// 	      headers: {
// 	        'Authorization': 'Bearer ' + token
// 	      },
// 	      json: true
// 	    };
// 	    request.get(options, function(error, response, body) {
// 	      console.log(body);
// 	    });
// 	  }
// 	});
// }






// const url = `https://api.moves-app.com/oauth/v1/access_token?grant_type=authorization_code&code=${code}&client_id=${id}&client_secret=${secret}`
// request.post(
//     url,
//     { json: { id, secret, code } },
//     function (error, response, body) {
//     	console.log('calling back')
//     	if (response){
//     		console.log(response)
//     	}
//     	if (error) console.log(error)
//         if (!error && response.statusCode == 200) {
//             console.log(body)
//         }
//     }
// );


//endpoint
// https://api.moves-app.com/oauth/v1/authorize?response_type=code&client_id=3wshpVqsf39llcb11mFUP7j7tz66Dz2w&scope=activity
// https://api.moves-app.com/oauth/v1/authorize?response_type=code&client_id=<client_id>&scope=<scope>
// scope (mandatory): requested scopes (space-delimited). Should contain either activity, location or both scopes.


// http://668e6aa1.ngrok.io/res?code=_G3zyUziV61KkNRPFh2qOu66CiZFa230Q0yLAE20IomI6CFDRuhV92eGXJl9yTg8&state=