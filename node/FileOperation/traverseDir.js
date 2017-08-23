var fs = require('fs')
var path = require('path')

function travelSync(dir) {
  fs.readdirSync(dir).forEach(function (file) {
    var pathname = path.join(dir, file)

    if (fs.statSync(pathname).isDirectory()) {
      travelSync(pathname)
    } else {
      console.log(pathname)
    }
  })
}

travelSync(process.argv[2])

function travel(dir, callback, finish) {
  fs.readdir(dir, function(err, files) {
    (function next(i) {
      if (i < files.length) {
          var pathname = path.join(dir, files[i]);

          fs.stat(pathname, function (err, stats) {
              if (stats.isDirectory()) {
                  travel(pathname, callback, function () {
                      next(i + 1);
                  });
              } else {
                console.log(pathname);
                next(i + 1)
              }
          });
      }
    }(0));  
  })
}