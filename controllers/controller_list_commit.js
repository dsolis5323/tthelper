var _ = require('underscore'),
	path = require('path'),
	colog = require('colog'),
	RSVP = require('rsvp'),
	moment = require('moment-timezone'),
	config = require(path.resolve(__dirname,'../models/config.js')),
	utils = require(path.resolve(__dirname,'../lib/utils.js')),
	commit = require(path.resolve(__dirname,'../models/commit.js'));

var DATE_FORMAT = 'dddd, DD MMMM YYYY'; //--- HH:mm

var controllerListCommits = {

	/* 
	list the commits the tasks realized by an user
	pdate: maximum date d/w/m
	*/
	listTasks: function(pdate){
		var reposConfig = [],
			repos = [],
			user = [],
			newRepos = [];

		if(pdate === '-w' || pdate === '-m' || pdate === '-d' || typeof pdate === 'undefined'){

			if(config.existConfig){

				commit.setDateLimit(pdate);
				
				configuration = config.getConfig();
				reposConfig = configuration.repositories;
				colog.log(colog.colorGreen('Loading...'));
				
				commit.getReposConfig(reposConfig, repos).then(function(){
					return commit.getBranches(repos);

				}).catch(function(error) {
					colog.log(colog.colorRed(error));
				});
			}
			else{
				colog.log(colog.colorRed("Error: Configuration file doesn't exist"));
			}
		}
		else{
			colog.log(colog.colorRed('Error: ttlogn ls [-d/-w/-m]'));
		}
	}

};

module.exports = controllerListCommits;
