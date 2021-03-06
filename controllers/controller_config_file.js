var path = require('path'),
	colog = require('colog'),
	prompt = require('prompt'),
	_ = require('underscore'),
	config = require(path.resolve(__dirname,'../models/config.js')),
	commit = require(path.resolve(__dirname,'../models/commit.js')),
	user = require(path.resolve(__dirname,'../models/user.js')),
	utils = require(path.resolve(__dirname,'../lib/utils.js')),
	project = require(path.resolve(__dirname,'../models/project.js'));

var INTEGER = /^\d+$/,
	NAME = 'name';

/*
pbranches: branches to select and bind
pproject: project to save
waits the user to choose a project, then save the repository
*/
var saveRepo = function(pbranches, pproject){
	newBranch = {};

	colog.log(colog.colorBlue('Select a branch: '));
	_.each(pbranches, function(branch, index){
		index++;
		colog.log(colog.colorBlue(index + ': ' + branch.name));
	});
	all = pbranches.length + 1;
	colog.log(colog.colorBlue(all + ': All'));

	prompt.start();

	prompt.get({
		properties: {
			branch: {
				description: "Number of the branch: ".magenta,
				required: true
			}
		}
	}, function (err, resultPrompt) {
		if(err){
			colog.log(colog.colorRed(err));
		}
		else{
			if(resultPrompt.branch <= pbranches.length){
				newBranch = pbranches[resultPrompt.branch - 1];
			}
			config.registerRepo(pproject, newBranch.name);
		}
	});
};

/*
pprojects: projects of the user to display
waits the user to choose a project, then save the repository
*/
var getProject = function(pprojects){
	var repoPath = process.cwd(), //'/mnt/hgfs/Development/repoPrueba', //process.cwd(),
		newProject = {};

	utils.getPromptProject(pprojects).then(function(pproject){
		newProject = pproject;
		return commit.getRepoBranches(repoPath);

	}).then(function(pbranches){
		saveRepo(pbranches, newProject);
	
	}).catch(function(error) {
		colog.log(colog.colorRed(error));
	});
};


var controllerConfigFile = {
	/* 
	register a user in the configuration file
	puser: the information of the user
	*/
	registerUser: function(puser){
		config.registerUser(puser);
	},

};

module.exports = controllerConfigFile;