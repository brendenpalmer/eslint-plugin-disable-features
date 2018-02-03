const gulp = require('gulp');
const eslint = require('gulp-eslint');

export function lint() {
  return gulp
    .src(['src/**/*.js', 'tests/**/*.js', 'gulp/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}
