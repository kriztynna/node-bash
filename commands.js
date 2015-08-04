var fs = require('fs');
var request = require('request');

function done(output,x){
	if(x.length===0){
		process.stdout.write(output);
		process.stdout.write('\nque pasa > ');
	}
	else {
		var nextFunc = x.shift();
		module.exports[nextFunc](output,undefined,x);
	}
}

function pwd(stdin,file,x) {
	done(process.cwd(),x);	
}

function date(stdin,file,x){
	var newDate = new Date();
	done(newDate.toString(),x);
}

function ls(stdin,input,x){
	var fileList=[];
	fs.readdir('.', function(err,files){
		if (err) throw err;
		files.forEach(function(f) {
			fileList.push(f.toString());
		});
	fileList = fileList.join("\n");
	done(fileList,x);
	});

}

function echo(stdin,file,x){
	done(file,x);
}

function cat(stdin,files,x){
	if (!stdin){
		var texts = [];
		var count = 0;
		files.forEach(function(filename,i){
			fs.readFile(filename,{'encoding':'utf8'},function(err,text){
				if (err) throw err;
				texts[i] = text;
				count++;
				if(count===files.length) { done(texts.join("\n"),x); }
			});
		});
	}
	else {
		done(stdin,x);
	}
}

function head(stdin,file,x){
	if (!stdin){
		fs.readFile(file, 'utf8',function(err,contents){
			if (err) throw err;
			done(contents.toString().split('\n').slice(0,5).join('\n'),x);
		});
	}
	else {
		done(stdin.toString().split('\n').slice(0,5).join('\n'),x);
	}
}

function tail(stdin,file,x){
	if (!stdin){
		fs.readFile(file, 'utf8',function(err,contents){
			if (err) throw err;
			done(contents.toString().split('\n').slice(-5).join('\n'),x);
		});			
	}
	else {
		done(stdin.toString().split('\n').slice(-5).join('\n'),x);
	}
}

function wc(stdin,file,x){
	if (!stdin){
		fs.readFile(file, 'utf8',function(err,contents){
			if (err) throw err;
			done(String(contents.toString().split('\n').length),x);
		});			
	}
	else {
		done(String(stdin.toString().split('\n').length),x);
	}
}

function sort(stdin,file,x){
	if (!stdin){
		fs.readFile(file, 'utf8',function(err,contents){
			if (err) throw err;
			var sorted = contents.toString().split('\n').sort().join('\n');
			done(sorted,x);
		});		
	}
	else {
		var sorted = stdin.toString().split('\n').sort().join('\n');
		done(sorted,x);
	}
}

function uniq(stdin,file,x){
	if (!stdin){
		fs.readFile(file, 'utf8',function(err,contents){
			if (err) throw err;
			var unique = contents.toString().split('\n').filter(function(elem,idx,arr){
				if (idx===0){
					return true;
				}
				if (elem!=arr[idx-1]){
					return true;
				}
				return false;
			}).join("\n");
			done(unique,x);
		});			
	}
	else {
		var unique = contents.toString().split('\n').filter(function(elem,idx,arr){
			if (idx===0){
				return true;
			}
			if (elem!=arr[idx-1]){
				return true;
			}
			return false;
		}).join("\n");
		done(unique,x);
	}
}

function curl(stdin,url,x){
	var input = setInput(stdin,url);
	request('http://'+url,function(error,response,body){
		if (!error && response.statusCode == 200) {
			done(body,x);		}
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