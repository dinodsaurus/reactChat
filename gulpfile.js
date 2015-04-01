"use strict";
var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
var browserify = require("browserify");
var babelify = require("babelify");
var source = require("vinyl-source-stream");
var browserSync = require("browser-sync");
var reload = browserSync.reload;

gulp.task("styles", function () {
  return gulp.src("app/style/**/*.scss")
    .pipe($.sass({
      outputStyle: "nested", // libsass doesn"t support expanded yet
      precision: 10,
      includePaths: ["."],
      onError: console.error.bind(console, "Sass error:")
    }))
    .pipe($.postcss([
      require("autoprefixer-core")({browsers: ["last 2 versions", "> 5%"]})
    ]))
    .pipe($.flatten())
    .pipe(gulp.dest(".tmp/styles"));
});

gulp.task("scripts", function () {
  browserify({
    entries: "./app/js/index.jsx",
    extensions: [".jsx"],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source("bundle.js"))
  .pipe(gulp.dest(".tmp"));
});

gulp.task("serve",  ["styles", "scripts"],function () {
  browserSync({
    notify: false,
    port: 9000,
    ghostMode: false,
    server: {
      baseDir: [".tmp", "app"],
      routes: {
        "/bower_components": "bower_components"
      }
    }
  });
  // watch for changes
  gulp.watch([
    "app/*.html",
    ".tmp/styles/**/*.css",
    "app/scripts/**/*.jsx",
    "app/images/**/*"
  ]).on("change", reload);

  gulp.watch("app/style/**/*.scss", ["styles", reload]);
  gulp.watch("app/js/**/*.jsx", ["scripts", reload]);
});

gulp.task("default", ["serve"]);
