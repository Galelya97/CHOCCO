const gulp = require('gulp');
const del = require('del');
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sass = require("gulp-sass");
const gls = require('gulp-live-server');
const urlAdjuster   = require('gulp-css-url-adjuster');

// CSS task
// function scss() {
//     del(["./main/css/**"]);
//     return gulp
//         .src("./main/scss/style.scss")
//         .pipe(sass())
//         .pipe(postcss([autoprefixer(), cssnano()]))
//         .pipe(gulp.dest("./main/css/"))
//         .pipe(server.notify.apply(server, [file]));
// }

// Clean assets
// function clean() {
//     return del(["./main/css/**"]);
// }

// const build = gulp.series(clean, gulp.parallel(css));

gulp.task('watch', function() {
    const server = gls.static('main', 5000);
    server.start();
    gulp.watch('./main/scss/**/*.scss', function(file) {

        del(["./main/css/**"]);
        return gulp
            .src("./main/scss/style.scss")
            .pipe(sass())
            .pipe(urlAdjuster({
                replace:  ['../../assets','../assets'],
            }))
            .pipe(postcss([autoprefixer(), cssnano()]))
            .pipe(gulp.dest("./main/css/"))
            .pipe(server.notify.apply(server, [file]));
    });
});

// exports.build = build;