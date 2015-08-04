var commands = require('./commands.js');
var request = require('request');
//Output a prompt
process.stdout.write('que pasa > ');

//Input
process.stdin.on('data',function(data){
	var input = data.toString().trim();

	var cmdList = input.split(/\s*\|\s*/g); // array split on pipes
	commandsAndArgs = cmdList.map(function(a){return a.split(" ");}); // further split into subarrays on spaces
	
	var current = commandsAndArgs[0]; // the first subarray
	// current[0] is the actual commmand 
	//current.slice(1) is all the potential args following it
	commands[current[0]](undefined,current.slice(1),commandsAndArgs.slice(1));
});