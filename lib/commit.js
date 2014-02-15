var git  = require('gift');

var _ = require('underscore');

//----------------
// hacer los if de error, buscar lo de promesas
//-------------

/* parray: array of commits
prints the information of the commits */
var printCommits = function(parray){
	//var now = new Date('3-2-14');
	_.each(parray,function(value,index){
	//	if(now > value.committed_date){
			console.log(value.author);
	//	}

	//console.log(value.committed_date);
	//	console.log(value.author);
	//	console.log(value.message);
	//	console.log(value.committed_date.getDate() + "," + value.committed_date.getMonth());
		console.log('-----------------------');
	});

};

/* ppath: path of the directory
return the directory */
var getRepository = function (ppath)
{
	return git(ppath);
};

var commit = {

	/* ppath: path of the directory
	pnumber: the number of commits
	return the last commits of master */
	getLastCommitsMaster: function(ppath, pnumber){
		var repo = getRepository(ppath);
		repo.commits('master', pnumber, function(err, commits){
			printCommits(commits);
			if(err){
				console.log(err);
			}
			
		});
	},

	/* ppath: path of the directory
	pbranch: name of the branch
	pnumber: the number of commits
	return the last commits of a branch */
	getLastCommits: function(ppath, pbranch, pnumber){
		var repo = getRepository(ppath);
		repo.commits(pbranch, pnumber, function(err, commits){
			printCommits(commits);
			if(err){
				console.log(err);
			}
		});
	},

	/* ppath: path of the directory
	pbranch: name of the branch
	return the last 10 commits of branch */
	getCommitsBranch: function(ppath, pbranch){
		var repo = getRepository(ppath);
		repo.commits(pbranch, function(err, commits){
			printCommits(commits);
			if(err){
				console.log(err);
			}
		});
	},

	/* ppath: path of the directory
	pbranch: name of the branch
	pnumber: the number of continue commits
	pskipNumber: the number of commits skiped
	return some commits and skips others of a branch */
	getCommitsPagination: function(ppath, pbranch, pnumber, pskipNumber){
		var repo = getRepository(ppath);
		repo.commits(pbranch,pnumber,pskipNumber, function(err, commits){
			printCommits(commits);
			if(err){
				console.log(err);
			}
		});
	}
};

module.exports = commit;


