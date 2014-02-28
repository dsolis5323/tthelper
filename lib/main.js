var path = require('path'),
	colog = require('colog'),
	_ = require('underscore'),
	controllerConfigFile = require(path.resolve(__dirname,'../controllers/controller_config_file.js')),
	controllerSaveWork = require(path.resolve(__dirname,'../controllers/controller_save_work.js')),
	controllerAddEntry = require(path.resolve(__dirname,'../controllers/controller_add_entry.js')),
	controllerModifyEntry = require(path.resolve(__dirname,'../controllers/controller_modify_entry.js')),
	controllerDeleteEntry = require(path.resolve(__dirname,'../controllers/controller_delete_entry.js')),
	controllerListCommits = require(path.resolve(__dirname,'../controllers/controller_list_commit.js'));

var arg = process.argv.splice(2);

//process.setMaxListeners(0);

switch(arg[0])
{	// user credentials
	case 'login':
		controllerConfigFile.registerUser();
		break;
	// add a new ...
	case 'add':
		switch(arg[1])
		{	// repository
			case 'repo':
				controllerConfigFile.registerRepo();
				break;
			default:
			colog.log(colog.colorRed('Error: add repo'));
		}
		break;
	default:
		colog.log(colog.colorRed('Error: bad command'));
}