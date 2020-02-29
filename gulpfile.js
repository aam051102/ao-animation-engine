const gulp = require("gulp");
const minify = require("gulp-minify");
const jsImport = require("gulp-js-import");
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const connect = require("gulp-connect");
const sass = require("gulp-sass");
const babel = require("gulp-babel");
const imagemin = require("gulp-imagemin");


sass.compiler = require("node-sass");


function html(next) {
    gulp.src("./src/html/templates/*.ejs")
        .pipe(ejs().on("error", err => { console.error(err); }))
        .pipe(rename(function(path) {
            if(path.basename !== "index") {
                path.dirname = path.basename;
                path.basename = "index";
            }

            path.extname = ".html";
        }))
        .pipe(gulp.dest("./dist/"))
        .pipe(connect.reload());

    next();
}

function images(next) {
    gulp.src("./src/assets/img/*")
        .pipe(imagemin())
        .pipe(gulp.dest("./dist/assets/images/"))
        .pipe(connect.reload());

    next();
}

function scss(next) {
    gulp.src("./src/css/**/*.scss")
        .pipe(sass().on("error", err => console.error(err)))
        .pipe(gulp.dest("./dist/assets/css"))
        .pipe(connect.reload());

    next();
}

function js(next) {
    gulp.src("./src/js/templates/**/*.js")
        .pipe(jsImport().on("error", err => console.error(err)))
        .pipe(babel({
            presets: ['@babel/env']
        }).on("error", err => console.log(err)))
        .pipe(minify({
            ext: {
                min: ".js"
            },
            noSource: true
        }).on("error", err => console.error(err)))
        .pipe(gulp.dest("./dist/assets/js"))
        .pipe(connect.reload());

    next();
}

function audio(next) {
    gulp.src("./src/assets/audio/*.mp3")
        .pipe(gulp.dest("./dist/assets/audio"))
        .pipe(connect.reload());

    next();
}

function fonts(next) {
    gulp.src("./src/assets/fonts/*")
        .pipe(gulp.dest("./dist/assets/fonts"))
        .pipe(connect.reload());

    next();
}

// Watchers
function watchHtml() {
    gulp.watch("./src/html/**/*.ejs", { ignoreInitial: false }, html);
}

function watchImages() {
    gulp.watch("./src/assets/img/*", { ignoreInitial: false }, images);
}

function watchScss() {
    gulp.watch("./src/css/**/*.scss", { ignoreInitial: false }, scss);
}

function watchJs() {
    gulp.watch("./src/js/templates/**/*.js", { ignoreInitial: false }, js);
}

function watchAudio() {
    gulp.watch("./src/assets/audio/**/*.mp3", { ignoreInitial: false }, audio);
}
function watchFonts() {
    gulp.watch("./src/assets/fonts/**/*", { ignoreInitial: false }, fonts);
}

gulp.task("dev", function(next) {
    watchHtml();
    watchImages();
    watchScss();
    watchJs();
    watchAudio();
    watchFonts();
    connect.server({
        livereload: true,
        root: "dist"
    });

    next();
});

gulp.task("build", function(next) {
    js(next);
    scss(next);
    images(next);
    audio(next);
    html(next);
    fonts(next);
    
    next();
});