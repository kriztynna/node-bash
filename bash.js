var commands = require('./commands.js');
var request = require('request');
//Output a prompt
process.stdout.write('que pasa > ');

//Input
process.stdin.on('data',function(data){
	var input = data.toString().trim();

	var cmdList = input.split(/\s*\|\s*/g);
	var beforePipe = cmdList[0]; // first command + possible file
	var afterPipe = cmdList[1]; // all other commands
	var commandList;
	var firstCommand = beforePipe.split(" ")[0];
	if(afterPipe){
		var allOtherCommands = afterPipe.split(" ");
		commandList = [firstCommand].concat(allOtherCommands);
	}
	else{
		commandList = [firstCommand];
	}
	var file = beforePipe.split(" ")[1]; // only supports single file

	var currentResult = undefined;

	while (commandList.length) {
		var currentCMD = commandList.shift();
		currentResult = commands[currentCMD](currentResult,file,commandList.length);
	}
});