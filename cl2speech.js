#!/usr/bin/env node
'use strict';

var fs = require('fs');
var map = require('map-stream');
var spawn = require('child_process').spawn;
var parseArgs = require('minimist');
var args = parseArgs(process.argv.slice(2));

require('colors');

var voice = function voice(os, voicetype) {
  return map(function(file, cb) {
    var content = file.toString();
    var child = os === 'linux' 
                ? spawn('echo', [content, '|', espeak]) 
                : spawn('say', ['-v', voicetype, content]);
    child.on('exit', function() {
      fs.readFile('./static/regards.txt', 'utf8', function(err, filedata) {
        cb(null, filedata.white);
      });
    });
    console.log(content.yellow);
  });
};

var linuxvoice = function() {
  return map(function(file, cb) {
    var conent = file.toString();
    spawn('echo', ['"' + content + '"', '|', 'espeak'])
      .on('exit', function() {

      });
  });
}

fs.createReadStream('./static/cover-letter.txt')
  .pipe(voice(args.p, args.v || 'Good News'))
  .pipe(process.stdout);