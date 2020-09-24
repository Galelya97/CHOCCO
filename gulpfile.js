const gulp = require('gulp');
const del = require('del');
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sass = require("gulp-sass");

// CSS task
function css() {
    return gulp
        .src("./main/scss/**/*.scss")
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulp.dest("./main/css/"))
}

// Clean assets
function clean() {
    return del(["./main/css/**", "!./main/css/layout"]);
}

const build = gulp.series(clean, gulp.parallel(css));

exports.build = build;