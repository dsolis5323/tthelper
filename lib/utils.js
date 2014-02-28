var _ = require('underscore'),
	path = require('path'),
	colog = require('colog'),
	moment = require('moment-timezone'),
	prompt = require('prompt'),
	RSVP = require('rsvp'),
	commit = require(path.resolve(__dirname,'../models/commit.js'));

var FORMAT_HOUR = /\(\d+(|\.\d+)h\)/i,
	INTEGER = /^\d+$/,
	DIGITS = /[^\(\)h]+/i,
	YES_OR_NO = /^(y|n)$/,
	TIME_IN = /^[0-2]\d\:[0-6]\d$/,
	FORMAT_TIME = /^\d+(|\.\d+)h$/i;




var utils = {

	/* parray: array of items
	print the description of the items
	*/
	printArray: function(parray, patribute){
		_.each(parray, function(value, index){
			index++;
			colog.log(colog.colorBlue(index + ': ' + value[patribute]));
		});
	},

		/*
	prestriction: restriction of the 
	returns the prompt of a restriction
	*/
	getPrompt: function(prestriction){
		var promise = new RSVP.Promise(function(resolve, reject){
			var self = this;
			prompt.start();
			prompt.get({
				properties: {
					result: prestriction
				}
			}, function (err, resultPrompt) {
				if(!err){
					resolve(resultPrompt.result);
				}
				else{
					reject(self);
				}
			});
		});
		return promise;
	},

	/*
	pname: name to print 
	returns the confirmation
	*/
	getConfirmation: function(pname){
		var promise = new RSVP.Promise(function(resolve, reject){
			var self = this;
			
			colog.log(colog.colorBlue('Do you want to delete: ' + pname));

			prompt.start();
			prompt.get({
				properties: {
					result: {
						description: '(y or n)'.magenta,
						required: true,
						pattern: YES_OR_NO
					}
				}
			}, function (err, resultPrompt) {
				if(!err){
					if(resultPrompt.result === 'y'){
						resolve();
					}
					else{
						colog.log(colog.colorRed('Canceled'));
						process.exit(0);
					}
				}
				else{
					reject(self);
				}
			});
		});
		return promise;
	},

	/*
	prestriction: restriction of the 
	parray: array of items to select
	returns the prompt of a restriction
	*/
	getNumberPrompt: function(prestriction, parray){
		var promise = new RSVP.Promise(function(resolve, reject){
			var cancel = parray.length,
				self = this;
			
			cancel++;
			colog.log(colog.colorBlue(cancel + ': Cancel'));
			
			prompt.start();
			prompt.get({
				properties: {
					result: prestriction
				}
			}, function (err, resultPrompt) {
				if(!err){
					if(resultPrompt.result < cancel){
						resolve(parray[resultPrompt.result - 1]);
					}
					else{
						colog.log(colog.colorRed('Canceled'));
						process.exit(0);
					}
				}
				else{
					reject(self);
				}
			});
		});
		return promise;
	},

	/*
	returns the prompt of a name
	*/
	getPromptText: function(ptext){
		var restriction = { description: ptext.magenta,
			required: true
		};
		return utils.getPrompt(restriction);
	}

};

module.exports = utils;