var gulp = require("gulp"),
    clean = require("gulp-clean"),
    concat = require("gulp-concat"),
    sourcemaps = require("gulp-sourcemaps"),
    typescript = require("gulp-typescript"),
    uglify = require("gulp-uglify");

//Paths
var webroot = "./wwwroot";
var tsconfig = "./tsconfig.json";
var systemJsConfig = "./Scripts/systemjs.config.js";
var srcPaths = {
    ts: ["Scripts/app/**/*.ts"],
    npm: [
        "Scripts/app/**/*.js",
        "node_modules/core-js/client/shim.min.js",
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/typescript/lib/typescript.js'],
    ng: ["node_modules/@angular/**"],
    rxjs: ["node_modules/rxjs/**"],
    html: ["Scripts/**/*.html"],
    css: ["Scripts/**/*.css"]
};

var destPaths = {
    webroot: `${webroot}/`,
    app: `${webroot}/app/`,
    js: `${webroot}/js/`,
    ng: `${webroot}/js/@angular/`,
    rxjs: `${webroot}/js/rxjs/`
};

//cleans the wwwroot folder
gulp.task("clean", function() {
    return gulp.src(webroot)
        .pipe(clean({ force: true }));
})

//copies all js files from external libraries to wwwroot
gulp.task("copy:js", ["clean"], function() {
    gulp.src(systemJsConfig)
        .pipe(gulp.dest(webroot));

    gulp.src(srcPaths.ng)
        .pipe(gulp.dest(destPaths.ng));

    gulp.src(srcPaths.rxjs)
        .pipe(gulp.dest(destPaths.rxjs));
    
    return gulp.src(srcPaths.npm)
        .pipe(gulp.dest(destPaths.js));
});

//copies html files into wwwroot.
gulp.task("copy:html", ["clean"], function() {
  return gulp.src(srcPaths.html)
    .pipe(gulp.dest(destPaths.webroot));
})

//copies css files into wwwroot.
gulp.task("copy:css", ["clean"], function(){
   return gulp.src(srcPaths.css)
    .pipe(gulp.dest(destPaths.webroot)) ;
});

//compile, minify, and create sourcemaps and place them to wwwroot/app.
gulp.task("build:app", ["clean"], function() {
    return gulp.src(srcPaths.ts)
        .pipe(sourcemaps.init())
        .pipe(typescript(require(tsconfig).compilerOptions))
        .pipe(uglify({ mangle: false }))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(destPaths.app));
});

//Watch specified files and define what to do upon file changes.
gulp.task("watch", function() {
    return gulp.watch([srcPaths.app, srcpaths.js], ['build:app', 'copy:js']);
})

//global build task
gulp.task("build", ["clean", "copy:js", "build:app", "copy:html", "copy:css"]);

