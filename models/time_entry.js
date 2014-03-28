var //_ = require('underscore'),
	path = require('path'),
	dataAccess = require(path.resolve(__dirname,'../dataAccess/apitt_data_access.js'));

var TIME_ENTRY = '/time_entries/createUpdate.json',
	USER_TIME_ENTRIES = '/users/get_this_period_entries.json?id=',
	DELETE_TIME_ENTRIES = '/users/delete_time_entry.json';

var time_entry = {
	
	/* pentry: object with the information need to post the time entry
	post the time entry of an user's project 
	*/
	postTimeEntry: function(pentry){
		return dataAccess.post(TIME_ENTRY, pentry);
	}
};

module.exports = time_entry;