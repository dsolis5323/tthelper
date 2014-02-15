var git  = require('gift'),
	_ = require('underscore'),
	path =require('path'),
	commit = require(path.resolve(__dirname, 'commit.js')),
	utils = require(path.resolve(__dirname,'utils.js'));
	apiTT = require(path.resolve(__dirname,'apiTT.js'));

//console.log(__dirname);
//console.log(process.cwd());
//console.log(__filename);



//git("../repoPrueba");

// ------------------
//var arg = process.argv.splice(2);
//commit.getLastCommitsMaster(arg[0], 2);
//commit.getLastCommits(arg[0], 'master', 2);
//commit.getCommitsBranch(arg[0], 'master');
//commit.getCommitsPagination(arg[0], 'master', 2,2);

//apiTT.getProjects();
apiTT.getUserProject();
//apiTT.postTimeEntry();
//apiTT.getUsers();
