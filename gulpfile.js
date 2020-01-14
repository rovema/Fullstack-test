var gulp = require("gulp");
var ts = require("gulp-typescript");
var nodemon = require("gulp-nodemon");
var merge = require("merge2");
var tsConfig = require("./tsconfig.json");
var del = require("del");
var mocha = require("gulp-mocha");

gulp.task("clean", function() {
  return del(["bin"]);
});

gulp.task("compile", function() {
  var stream = gulp.src(["api/**/*.ts"]).pipe(ts(tsConfig.compilerOptions)); // your ES2015 code
  return merge([
    stream.dts.pipe(gulp.dest("bin")),
    stream.js.pipe(gulp.dest("bin"))
  ]);
});

gulp.task("server", function(done) {
  var stream = nodemon({
    ext: "ts",
    script: "bin/index.js", // run ES5 code
    watch: "api", // watch ES2015 code
    tasks: ["compile"], // compile synchronously onChange
    done: done
  });
  return stream
    .on("restart", function() {
      gulp.series("test");
    })
    .on("crash", function() {
      console.error("\nErro na API!\n");
      stream.emit("restart", 10); // restart the server in 10 seconds
    });
});

gulp.task("test", function() {
  gulp
    .src("test/test.js")
    .pipe(mocha({ reporter: "list" }))
    .once("error", err => {
      console.error(err);
      // process.exit(0);
    })
    .once("end", () => {
      process.exit();
    });
});

gulp.task("watch", gulp.parallel("compile"));

gulp.task("init", gulp.series("clean", "watch", gulp.parallel("server")));

gulp.task("default", gulp.series("init"));
