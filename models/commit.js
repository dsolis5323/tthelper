var path = require('path'),
	colog = require('colog'),
	_ = require('underscore'),
	git  = require('gift'),
	async = require('async'),
	moment = require('moment'),
	RSVP = require('rsvp');

var NUMBER_COMMITS = 10,
	FORMATHOUR = /[^(]+\(\d+h\)/g,
	DIGITOS = /\d+/g;

var limitDate = new Date();

var commit = {


	/* pprepos: the array of repositories
	get the branches of the repositories */
	getBranches: function(prepos){
		var promise = new RSVP.Promise(function(resolve, reject){
			var promises = [],
				self = this;

			_.each(prepos, function(item){
				promises.push(commit.getBranch(item));
			});

			RSVP.all(promises).then(function(){
				resolve();
			}).catch(function(reason){
				reject(self);
			});
		});
		return promise;
	},

	/* pprepo: path of the repository
	get the branches of the repositories */
	getRepoBranches: function(prepo){
		var promise = new RSVP.Promise(function(resolve, reject){
			var repo = [],
				self = this,
				objectBrach = {};
				
			repo = git(prepo);
			repo.branches(function (err, branches){
				if(err){
					colog.log(colog.colorRed('Error: ' + err));
					reject(self);
				}
				else{
					resolve(branches);
				}
			});
		});
		return promise;
	},

	/*
	prepo: repo of the config file
	get the information of repository 
	*/
	getRepoConfig: function(prepo){
		var promise = new RSVP.Promise(function(resolve, reject){

			var repo = {},
				self = this,
				objectRepo = {};

			repo = git(prepo.path);
			repo.config(function (err, config){
				if(err){
					colog.log(colog.colorRed(err));
					reject(self);
				}
				else{
					objectRepo = {
						path: prepo.path,
						name: config.items['remote.origin.url'],
						configBranches: prepo.project,
						branches: []
					};
					resolve(objectRepo);
				}
			});
		});
		return promise;
	},

	/*
	prepos: array of repositories
	pnewRepos: structure where the information of the repositories will be store
	get the information of an array repositories
	*/
	getReposConfig: function(prepos, pnewRepos){
		var promise = new RSVP.Promise(function(resolve, reject){
			var promises = [],
				self = this;

			_.each(prepos, function(item){
				promises.push(commit.getRepoConfig(item, pnewRepos));
			});

			RSVP.all(promises).then(function(repos){
				_.each(repos, function(value){
					pnewRepos.push(value);
				});
				resolve();
			}).catch(function(reason){
				reject(self);
			});
		});
		return promise;
	}
};

module.exports = commit;