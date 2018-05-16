var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Me = new Schema({
	name: '',
	access_token: '',
	refresh_token: '',
	token_type: '',
	expires_in: '',
	refresh_token: '',
	user_id: '' 
});
 
var Me = module.exports = mongoose.model('Me', Me);