var fs = require('fs');
var request = require('request');

function done(output,cmdList){
	if(cmdList.length===0){
		process.stdout.write(output);
		process.stdout.write('\nque pasa > ');
	}
	else {
		var nextFunc = cmdList.shift();
		module.exports[nextFunc](output,undefined,cmdList);
	}
}

function pwd(stdin,file,cmdList) {
	done(process.cwd(),cmdList);	
}

function date(stdin,file,cmdList){
	var newDate = new Date();
	done(newDate.toString(),cmdList);
}

function ls(stdin,input,cmdList){
	var fileList=[];
	fs.readdir('.', function(err,files){
		if (err) throw err;
		files.forEach(function(f) {
			fileList.push(f.toString());
		});
	fileList = fileList.join("\n");
	done(fileList,cmdList);
	});

}

function echo(stdin,words,cmdList){
	done(words.join(" "),cmdList);
}

function cat(stdin,files,cmdList){
	if (!stdin){
		var texts = [];
		var count = 0;
		files.forEach(function(filename,i){
			fs.readFile(filename,{encoding:'utf8'},function(err,text){
				if (err) throw err;
				texts[i] = text;
				count++;
				if(count===files.length) { done(texts.join("\n"),cmdList); }
			});
		});
	}
	else {
		done(stdin,cmdList);
	}
}

function head(stdin,fileList,cmdList){
	if (!stdin){
		var file = fileList[0]; // only uses the first file
		fs.readFile(file, 'utf8',function(err,contents){
			if (err) throw err;
			done(contents.toString().split('\n').slice(0,5).join('\n'),cmdList);
		});
	}
	else {
		done(stdin.toString().split('\n').slice(0,5).join('\n'),cmdList);
	}
}

function tail(stdin,fileList,cmdList){
	if (!stdin){
		var file = fileList[0]; // only uses the first file
		fs.readFile(file, 'utf8',function(err,contents){
			if (err) throw err;
			done(contents.toString().split('\n').slice(-5).join('\n'),cmdList);
		});			
	}
	else {
		done(stdin.toString().split('\n').slice(-5).join('\n'),cmdList);
	}
}

function wc(stdin,fileList,cmdList){
	if (!stdin){
		var file = fileList[0]; // only uses the first file
		fs.readFile(file, 'utf8',function(err,contents){
			if (err) throw err;
			done(String(contents.toString().split('\n').length),cmdList);
		});			
	}
	else {
		done(String(stdin.toString().split('\n').length),cmdList);
	}
}

function sort(stdin,fileList,cmdList){
	if (!stdin){
		var file = fileList[0]; // only uses the first file
		fs.readFile(file, 'utf8',function(err,contents){
			if (err) throw err;
			var sorted = contents.toString().split('\n').sort().join('\n');
			done(sorted,cmdList);
		});		
	}
	else {
		var sorted = stdin.toString().split('\n').sort().join('\n');
		done(sorted,cmdList);
	}
}

function uniqfilter (elem,idx,arr){
	if (idx===0){
		return true;
	}
	if (elem!=arr[idx-1]){
		return true;
	}
	return false;
}

function uniq(stdin,fileList,cmdList){
	if (!stdin){
		var file = fileList[0]; // only uses the first file
		fs.readFile(file, 'utf8',function(err,contents){
			if (err) throw err;
			var unique = contents.toString().split('\n').filter(uniqfilter).join("\n");
			done(unique,cmdList);
		});			
	}
	else {
		var unique = contents.toString().split('\n').filter(uniqfilter).join("\n");
		done(unique,cmdList);
	}
}

function curl(stdin,url,cmdList){
	var input = setInput(stdin,url);
	request('http://'+url,function(error,response,body){
		if (!error && response.statusCode == 200) {
			done(body,cmdList);
		}
	});
}

function setInput(stdin,file){
	if(stdin===undefined){
		return file;
	}
	return stdin;	
}

module.exports.pwd = pwd;
module.exports.date = date;
module.exports.ls = ls;
module.exports.echo = echo;
module.exports.cat = cat;
module.exports.head = head;
module.exports.tail = tail;
module.exports.wc = wc;
module.exports.sort = sort;
module.exports.uniq = uniq;
module.exports.curl = curl;