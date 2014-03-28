var //_ = require('underscore'),
	path = require('path'),
	fs = require('fs'),
	pivotal = require('pivotal'),
	RSVP = require('rsvp'),
	_ = require('underscore'),
	colog = require('colog'),
	dataAccess = require(path.resolve(__dirname, '../dataAccess/apitt_data_access.js'));

var USER_LOGIN = '/login/create.json',
	GET_CLIENTS = '/users/get_clients.json?id=';


var user = {

	/*puser: email of the user
	ppassword: encrypted password of the user
	gets the information of the user in the Timetracker*/
	login: function(puser, ppassword){
		var message	= {
				email: puser,
				password: ppassword
			};
		return dataAccess.post(USER_LOGIN, message);
	}

};
module.exports = user;