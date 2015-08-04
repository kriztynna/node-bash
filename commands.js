var fs = require('fs');
var request = require('request');

var done =function(output,x){
	if(x===0){process.stdout.write(output);
	process.stdout.write('\nque pasa > ');
	}
	else{
		return output;
	}
}

function pwd(stdin,file,x) {
	done(process.cwd(),x);	
}

function date(stdin,file){
	var date = new Date();
	done(date.toString(),x);
}

function ls(stdin,file,x){
	var val="";
	fs.readdir('.', function(err,files){
		if (err) throw err;
		files.forEach(function(file) {
			val +=file.toString()+'\n';
		});
	done(val,x);
	});

}

function echo(stdin,file,x){
	done(file,x);
	}

function cat(stdin,file,x){
	fs.readFile(file,function(err,contents){
		if (err) throw err;
		done(contents,x);
	});
}

function head(stdin,file,x){
	var newfile=setInput(stdin,file);
	fs.readFile(newfile, 'utf8',function(err,contents){
		if (err) throw err;
		done(contents.toString().split('\n').slice(0,5).join('\n'),x);
	});	
}

function tail(stdin,file,x){
	fs.readFile(file, 'utf8',function(err,contents){
		if (err) throw err;
		done(contents.toString().split('\n').slice(-5).join('\n'),x);
	});	
}

function wc(stdin,file,x){
	fs.readFile(file, 'utf8',function(err,contents){
		if (err) throw err;
		done(String(contents.toString().split('\n').length),x);
	});	
}

function sort(stdin,file,x){
	fs.readFile(file, 'utf8',function(err,contents){
		if (err) throw err;
		var sorted = contents.toString().split('\n').sort().join('\n');
		done(sorted,x);
	});	
}

function uniq(stdin,file,x){
	fs.readFile(file, 'utf8',function(err,contents){
		if (err) throw err;
		var unique = contents.toString().split('\n').filter(function(elem,idx,arr){
			if (idx==0){
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

function curl(stdin,url,x){
	request('http://'+url,function(error,response,body){
		if (!error && response.statusCode == 200) {
			done(body,x);		}
	})
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