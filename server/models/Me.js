var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Me = new Schema({
	name: '',
	access_token: '',
	refresh_token: '',
	token_type: '',
	expires_in: '',
	spotify_refresh_token: '',
	spotify_access_token: '',
	user_id: '',
	lastTrack: '',
	tracks: '',
	movesLines: '',
	movesPlaces:'',
	movesActivity: ''
});
 
var Me = module.exports = mongoose.model('Me', Me);