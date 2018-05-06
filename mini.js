const rimraf = require('rimraf'); //УДАЛЯЕТ СТАРЫЕ JS ФАЙЛЫ ИЗ ПАПКИ

const copydir = require('copy-dir');
const compressor = require('node-minify');

let t = Date.parse(new Date()); //milliseconds

//ОЧИСТИТЬ ПАПКИ prodaction/menu
rimraf.sync('prodaction');

function miniJs(fn){
  compressor.minify({
  compressor: 'gcc',
  input: './public/' + fn,
  output: 'prodaction/' + fn,
  options: {
    compilation_level: 'WHITESPACE_ONLY',
    language: 'ECMASCRIPT6'
  },
  callback: function (err, min) {}
  });
};


function miniCss(fn){
	compressor.minify({
	  compressor: 'clean-css',
	  input: './public/' + fn,
	  output: 'prodaction/' + fn,
	  options: {
	    advanced: false, // set to false to disable advanced optimizations - selector & property merging, reduction, etc. 
	    aggressiveMerging: false // set to false to disable aggressive merging of properties. 
	  },
	  callback: function (err, min) {}
	});
};

let fs = require('fs');
let path = require('path');

let p = 'public';
 
fs.readdir(p, function(err, items) {
    for (var i=0; i<items.length; i++) {
        // console.log(items[i]);

        if(path.extname(items[i]) == '.js'){
        	miniJs(items[i])
        }else if(path.extname(items[i]) == '.css'){
        	miniCss(items[i])
        }else if(path.extname(items[i]) == '.html'){
        	fs.createReadStream(p +'/index.html').pipe(fs.createWriteStream('prodaction/index.html'));
        }
    }
});