'use strict';
const gulp = require('gulp');
// const imageOptimization = require('gulp-image-optimization');
const plugins = require('gulp-load-plugins')();
const runSequence = require('run-sequence');

// Game Tasks
gulp.task('scripts:dev', () => {
  return gulp.src([__dirname + '/game/js/lib/utilities/utilities.js',
                   __dirname + '/game/js/lib/objects/loadingImage.js',
                   __dirname + '/game/js/lib/graphics/graphic.js',
                   __dirname + '/game/js/lib/objects/particleSystem.js',
                   __dirname + '/game/js/lib/player/player.js',
                   __dirname + '/game/js/game.js',
                   __dirname + '/game/js/lib/objects/resources.js',
                   __dirname + '/game/js/lib/initialization/renderGame.js',
                   __dirname + '/game/js/lib/initialization/initializeGame.js'
    ])
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat('game.min.js'))
    .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(__dirname + '/server/build/js/'));
});
gulp.task('scripts:dependencies', () => {
  return gulp.src([__dirname + '/game/js/lib/vendor/pixi.js',
                   __dirname + '/game/js/lib/vendor/pixi-particles.js'
    ])
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat('dependencies.min.js'))
    .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(__dirname + '/server/build/js/'));
});
gulp.task('images:dev', () => {
  return gulp.src(__dirname + '/game/assets/images/**')
    // .pipe(imageOptimization({ optimizationLevel: 7, progressive: true, interlaced: true }))
    .pipe(gulp.dest(__dirname + '/server/build/assets'));
});
gulp.task('sounds:dev', () => {
  return gulp.src(__dirname + '/game/assets/music/**')
    .pipe(gulp.dest(__dirname + '/server/build/assets'));
});
gulp.task('html:dev', () => {
  return gulp.src(__dirname + '/game/index.html')
    .pipe(plugins.htmlmin({ collapseWhitespace: true }))
    .pipe(plugins.rename('/server/build/index.html'))
    .pipe(gulp.dest(__dirname));
});
gulp.task('css:dev', () => {
  var processors = [
    require('cssnext'),
    require('postcss-font-family'),
    require('postcss-font-magician'),
    require('autoprefixer'),
    require('css-mqpacker'),
    require('csswring')
  ];
  return gulp.src(__dirname + '/game/css/*.scss')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.postcss(processors))
    .pipe(plugins.cssnano())
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(__dirname + '/server/build/css/'));
});

// Build Tasks
gulp.task('build:dev', function(callback) {
  runSequence('scripts:dev', 'html:dev', 'css:dev', 'images:dev', 'sounds:dev', callback);
});
gulp.task('build:dependencies', function(callback) {
  runSequence('scripts:dependencies', callback);
});

// Application Task
gulp.task('build:app', function(callback) {
  runSequence('build:dev', 'build:dependencies', callback);
});
gulp.task('default', ['build:dev']);
