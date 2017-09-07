// Aqui nós carregamos o gulp e os plugins através da função `require` do nodejs
const
    gulp            = require('gulp'),
    minifycss       = require('gulp-minify-css'),
    eslint          = require('gulp-eslint'),
    uglify          = require('gulp-uglify'),
    concat          = require('gulp-concat'),
    connect         = require('gulp-connect'),
    sourcemaps      = require('gulp-sourcemaps'),
    gutil           = require('gulp-util'),
    ngAnnotate      = require('gulp-ng-annotate'),
    minifyHTML      = require('gulp-minify-html'),
    templateCache   = require('gulp-angular-templatecache'),
    flatten         = require('gulp-flatten'),
    del             = require('del'),
    eslint_conf     = require('./.eslintrc'),
    APP_PREFIX      = 'vila-mota',
    FOLDERS_TO_CLEAN= './dist/**/',
    ASSETS_ARRAY    = ['src/**/img/**/*', 'src/**/icons/*', 'src/**/js/*/*', 'src/**/css/*/*'],
    SRC_CODE        = [
        './src/app.module.js',
        './src/**/*.js'
    ],
    CONNECT_SERVER  = {
        'port'       : 3000,
        'livereload' : true,
        'fallback'   : 'index.html'
    },
    BUNDLE_CODE     = SRC_CODE.concat('./build/templatecache/app.templates.js');

// TASK CHAIN DEFINITIONS
gulp.task('default', [ 'build' ]);
gulp.task('test',    [ 'eslint' ]);
gulp.task('dev',     [ 'build', 'connect', 'watch' ]);
gulp.task('build',   [ 'copy:assets', 'minify:css', 'build:bundle' ]);

// CLEAN FOLDERS
gulp.task('clean', function () {
    del([ FOLDERS_TO_CLEAN ]);
});

gulp.task('copy:assets', function () {
    return gulp.src(ASSETS_ARRAY)
            .pipe(gulp.dest(gutil.env.src
                ? gutil.env.src + '/assets/'
                : './dist/assets'));
});

gulp.task('minify:css', function () {

    return gulp.src('./src/**/*.css')
            .pipe(sourcemaps.init())
                .pipe(concat(APP_PREFIX + '.min.css'))
                .pipe(minifycss({ 'processImport': false }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(gutil.env.src ? gutil.env.src + '/assets/css' : './dist/assets/css'));

});

gulp.task('minify:html', () => {

    return gulp
        .src('./src/**/*.html')
            .pipe(minifyHTML({ 'conditionals': true, 'spare': true }))
            .pipe(flatten())
            .pipe(templateCache('app.templates.js', { 'module': 'vilaMota.templates', 'standalone': true }))
        .pipe(gulp.dest('./build/templatecache/'));
});

gulp.task('eslint', () => {

    return gulp.src(SRC_CODE)
        .pipe(eslint(eslint_conf))
        .pipe(eslint.format());

});

gulp.task('build:bundle', [ 'build:min' ],  function () {

    return gulp
        .src(BUNDLE_CODE)
        .pipe(concat(APP_PREFIX + '.js'))
        .pipe(gulp.dest(gutil.env.src || './dist/'));

});

gulp.task('build:min', [ 'minify:html' ], function () {
    return gulp
        .src(BUNDLE_CODE)
        .pipe(sourcemaps.init())
        .pipe(concat(APP_PREFIX + '.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(gutil.env.src || './dist/'));
});

gulp.task('connect', ['build'], function () {
    connect.server(CONNECT_SERVER);
});

gulp.task('watch', function () {
    gulp.watch(['./src/**' ], [ 'reload' ]);
});

gulp.task('reload', ['build'], function () {
    connect.reload();
});