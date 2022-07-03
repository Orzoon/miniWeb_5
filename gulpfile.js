const gulp = require("gulp");
const browserSync = require("browser-sync").create();

const pug = require("gulp-pug");
const prefixer = require("gulp-autoprefixer");
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require("gulp-sourcemaps")

function html(){
    return gulp.src("./index.pug")
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('./'))
}

function css(){
    return gulp.src("sass/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({}))
    .pipe(prefixer())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream())
}

function watch(){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })

    gulp.watch("./sass/**.scss", css)
    gulp.watch("./index.pug", html)
    gulp.watch("./index.html").on("change", browserSync.reload)
    gulp.watch("./js/index.js").on("change", browserSync.reload)

}


// function exports
exports.css = css;
exports.html = html;
exports.watch = watch