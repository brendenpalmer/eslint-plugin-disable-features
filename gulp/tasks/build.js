const gulp = require('gulp');
const babel = require('gulp-babel');

export function build() {
  return gulp
    .src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('lib'));
}
