var commands = require('./commands.js');
var request = require('request');
//Output a prompt
process.stdout.write('que pasa > ');

//Input
process.stdin.on('data',function(data){
	var input = data.toString().trim();

	var cmdList = input.split(/\s*\|\s*/g); // splits on pipes
	var beforePipe = cmdList[0]; // first command + possible file
	var afterPipe = cmdList[1]; // all other commands
	
	var commandList = [beforePipe.split(" ")[0]]; 
	
	if(afterPipe){
		var allOtherCommands = afterPipe.split(" ");
		commandList = commandList.concat(allOtherCommands);
	}
	
	var args = beforePipe.split(" ").slice(1); // everything following that initial command
	
	var currentCMD = commandList.shift();
	commands[currentCMD](undefined,args,commandList);
});