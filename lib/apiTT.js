var assert = require('assert');
var restify = require('restify');
var prettyjson = require('prettyjson');

var apiTT = restify.createJsonClient({
  url: 'http://10.0.1.80:3000',
  version: '~1.0'
});

var rest = {
	//gets all the projects
	getProjects: function(){
		apiTT.get('/projects.json', function (err, req, res, obj) {
			assert.ifError(err);
			console.log(prettyjson.render(obj));
		});
	},
	//gets all the users
	getUsers: function(){
		apiTT.get('/users.json', function (err, req, res, obj) {
			assert.ifError(err);
			console.log(prettyjson.render(obj));
		});
	},
	//gets projects of an user
	getUserProject: function(){
		apiTT.get('/users/projects.json?id=169', function (err, req, res, obj) {
			assert.ifError(err);
			console.log(prettyjson.render(obj));
		});
	},
	//post a time entry
	postTimeEntry: function(){
		apiTT.post('http://10.0.1.80:3000/time_entries/createUpdate?created=2011-06-21T13:42:22.000Z&developer_id=169&project_id=3&description=pruebaTT2dos&time=2.0&hour_type_id=1', function (err, req, res, obj) {
			assert.ifError(err);
			console.log(prettyjson.render(obj));
		});
	}
};

module.exports = rest;