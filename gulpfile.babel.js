// # PATHS

const CSS_SRC_DIR = './app/frontend/stylesheets/'
const CSS_GLOB = '**/*.styl'
const CSS_SRC = CSS_SRC_DIR + CSS_GLOB
const CSS_DST = './static/stylesheets/'

const JS_SRC_DIR = './app/frontend/javascripts/'
const JS_GLOB = '**/*.js'
const JS_SRC = JS_SRC_DIR + JS_GLOB
const JS_DST = './static/javascripts/'

// -----

import gulp from 'gulp'
import babel from 'gulp-babel'
import watch from 'gulp-watch'
import stylus from 'gulp-stylus'
import plumber from 'gulp-plumber'
import browserify from 'browserify'
import babelify from 'babelify'
import buffer from 'vinyl-buffer'
import source from 'vinyl-source-stream'
import glob from 'glob'
import async from 'async'

gulp.task('stylus', (done) => {
  gulp
    .src(CSS_SRC)
    .pipe(plumber())
    .pipe(stylus({compress: true}))
    .pipe(gulp.dest(CSS_DST))
    .on('end', done)
})

gulp.task('browserify', (done) => {
  function buildFile(file, done) {
    const relativeFile = file.slice(
      file.indexOf(JS_SRC_DIR) + JS_SRC_DIR.length
    )

    let b = browserify({
      entries: file,
      debug: true,
    })

    return b
      .transform(babelify, {presets: ['babel-preset-env']})
      .bundle()
      .on('error', done)
      .pipe(plumber())
      .pipe(source(relativeFile))
      .pipe(buffer())
      .pipe(gulp.dest(JS_DST))
      .on('end', done)
  }

  glob(JS_SRC, (err, files) => {
    async.map(files, buildFile, done)
  })
})

gulp.task('watch', () => {
  watch(CSS_SRC, () => gulp.start('stylus'))
  watch(JS_SRC, () => gulp.start('browserify'))
})

gulp.task('build', ['stylus', 'browserify'])
gulp.task('default', ['build', 'watch'])
