var gulp = require("gulp");
var ts = require("gulp-typescript");
var nodemon = require("gulp-nodemon");
var merge = require("merge2");
var tsConfig = require("./tsconfig.json");
var del = require("del");
// var mocha = require("gulp-mocha");

gulp.task("clean", function() {
  return del(["bin"]);
});

gulp.task("compile", function() {
  var stream = gulp.src(["src/**/*.ts"]).pipe(ts(tsConfig.compilerOptions)); // your ES2015 code
  return merge([
    stream.dts.pipe(gulp.dest("bin")),
    stream.js.pipe(gulp.dest("bin"))
  ]);
});

gulp.task("server", function(done) {
  var stream = nodemon({
    ext: "ts",
    script: "bin/index.js", // run ES5 code
    watch: "src", // watch ES2015 code
    tasks: ["compile"], // compile synchronously onChange
    done: done
  });
  return stream
    .on("restart", function() {})
    .on("crash", function() {
      console.error("\nErro na API!\n");
      stream.emit("restart", 10); // restart the server in 10 seconds
    });
});

gulp.task("watch", gulp.parallel("compile"));

gulp.task("default", gulp.series("clean", "watch", gulp.parallel("server")));
