var path = require('path'),
	colog = require('colog'),
	fs = require('fs');

var CONFIGPATH = '.ttlogn';

/* 
	get the user's home path
*/
var configPath = function () {
	var pathResult;
	pathResult = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
	pathResult = path.join(pathResult, CONFIGPATH);
	return pathResult;
};


	/* 
	saves the a file in an asynchronous way
	ppath: path 
	pdata: data to save
	*/
var saveFile = function (pdata){
	var relativePath = configPath();
	fs.writeFile(relativePath, pdata, 'utf8', '0777',function(err){
            if(err) {
				colog.log(colog.colorRed('Error: saving file.'));
                colog.log(colog.colorRed(err));
                process.exit(1);
            }
            else{
				colog.log(colog.colorGreen('Success: configuration file saved'));
			}

        });
};


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

	/* 
	saves the configuration file in an asynchronous way
	pdata: data to save
	*/
	saveConfig: function(pdata){
		saveFile(pdata);
	},

	/* 
	read the configuration file
	*/
	readConfig: function(){
		var relativePath = configPath();
		return fs.readFileSync(relativePath, 'utf8');
	},

	/* 
	pbranch: branch to bind
	register a repo in the configuration file
	*/
	registerRepo: function(pbranch){
		var configuration = {};
		
		if(config.existConfig()){
			configuration = config.getConfig();
			user.login(configuration.email, configuration.password).then(function(puser){
				return project.getProjects(puser.result.id);

			}).then(function(pprojects) {
				utils.printArray(pprojects.result, NAME);
				getProject(pprojects.result);

			}).catch(function(error) {
				colog.log(colog.colorRed(error));
			});
		}
		else{
			colog.log(colog.colorRed('Error: Make first the configuration:'));
			colog.log(colog.colorRed('ttlogn login'));
		}
	},

	/* 
	returns a boolean, says if the config file exists
	*/
	existConfig: function(){
		var relativePath = configPath();
		return fs.existsSync(relativePath);
	}
};

module.exports = controllerConfigFile;