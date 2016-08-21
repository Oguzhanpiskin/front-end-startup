var gulp =require("gulp");
    less = require('gulp-less'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    ngAnnotate = require('gulp-ng-annotate'),
    htmlmin   =  require('gulp-htmlmin'),
    ngHtml2Js = require("gulp-ng-html2js");



gulp.task('less', function () {
  gulp.src(['resources/bootstrap/less/bootstrap.less']
    )
      .pipe(plumber())
      .pipe(less())
      .pipe(concat('bs-custom.css'))
      .pipe(minifycss())
    .pipe(gulp.dest('./assets/css'))
})

gulp.task('sp', function () {
  gulp.src(['resources/bootstrap/less/custom/foreach.less']
    )
      .pipe(plumber())
      .pipe(less())
      .pipe(concat('functionz.css'))
      .pipe(minifycss())
    .pipe(gulp.dest('./assets/css'))
})













gulp.task('js', function () {
  return gulp.src(['./resources/angularjs/modules.js', 'resources/angularjs/libs/*.js', 'resources/angularjs/config/*.js', 'resources/angularjs/**/*.js'])
    .pipe(plumber())
     .pipe(concat('./app-compiled.js'))
      .pipe(ngAnnotate())
      .pipe(uglify())
    .pipe(gulp.dest('./assets/js-compiled'))
    .pipe(livereload());
})












































gulp.task('html2js', function () {
  gulp.src(['resources/angularjs/views/*.html', 'resources/angularjs/views/**/*.html', 'resources/angularjs/views/**/**/*.html'])
    .pipe(htmlmin({collapseWhitespace: true}))  
    .pipe(ngHtml2Js({
        moduleName: "templatePartials",
        prefix: "tpl-"
  }))
    .pipe(concat("partials.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./assets/js-compiled"));
});

gulp.task('htmljs', ['html2js'], function () {
  livereload.listen();
    gulp.watch(['resources/angularjs/views/*.html', 'resources/angularjs/views/**/*.html', 'resources/angularjs/views/**/**/*.html'], ['html2js'])
    .on('change', function(file) {
      console.log("works")
        livereload.changed(file.path);
    });
});






















gulp.task('all', ['less', 'js'], function () {
  livereload.listen();

    gulp.watch(['resources/bootstrap/less/*.less', 'resources/bootstrap/less/**/*.less'], ['less'])
    .on('change', function(file) {
      console.log("works")
        livereload.changed(file.path);
    });

    gulp.watch(['resources/angularjs/*.js', 'resources/angularjs/**/*.js', 'resources/angularjs/**/**/*.js'], ['js'])
    .on('change', function(file) {
      console.log("works")
        livereload.changed(file.path);
    });

    gulp.watch(['resources/angularjs/views/*.html', 'resources/angularjs/views/**/*.html', 'resources/angularjs/views/**/**/*.html'], ['html2js'])
    .on('change', function(file) {
      console.log("works")
        livereload.changed(file.path);
    });



    gulp.watch(['index.html'])
    .on('change', function(file) {
        livereload.changed(file.path);
    });

});

gulp.task('default', ['less'], function () {
  livereload.listen();

    gulp.watch(['resources/bootstrap/less/*.less', 'resources/bootstrap/less/**/*.less'], ['less'])
    .on('change', function(file) {
      console.log("works")
        livereload.changed(file.path);
    });

    gulp.watch(['index.html'])
    .on('change', function(file) {
        livereload.changed(file.path);
    });

});
