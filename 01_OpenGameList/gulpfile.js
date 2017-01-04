var gulp = require("gulp"),
    clean = require("gulp-clean"),
    concat = require("gulp-concat"),
    sourcemaps = require("gulp-sourcemaps"),
    typescript = require("gulp-typescript"),
    uglify = require("gulp-uglify");

//Paths
var webroot = "./wwwroot";
var tsconfig = "./tsconfig.json";
var srcPaths = {
    app: ["Scripts/app/**/*.ts"],
    js: [
        "Scripts/app/**/*.js",
        "node_modules/@angular/**",
        "node_modules/@rxjs/**",
        "node_modules/core-js/client/shim.min.js",
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/typescript/lib/typescript.js'],
    html: ["Scripts/app/**/*.html"],
    css: ["Scripts/app/**/*.css"]
};

var destPaths = {
    app: `${webroot}/app/`,
    js: `${webroot}/js/`
};

//cleans the wwwroot/app folder
gulp.task("clean:app", function() {
    return gulp.src(destPaths.app)
        .pipe(clean({ force: true }));
});

//cleans the wwwroot/js folder
gulp.task("clean:js", function() {
    return gulp.src(destPaths.js)
        .pipe(clean({ force: true }));
});

//clean all within wwwroot
gulp.task("clean", ["clean:app", "clean:js"]);

//copies all js files from external libraries to wwwroot/js
gulp.task("copy:js", ["clean:js"], function() {
    return gulp.src(srcPaths.js)
        .pipe(gulp.dest(destPaths.js));
});

//compile, minify, and create sourcemaps and place them to wwwroot/app.
gulp.task("build:app", ["clean:app"], function() {
    return gulp.src(srcPaths.app)
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
gulp.task("build", ["clean", "copy:js", "build:app"]);

