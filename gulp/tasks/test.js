const gulp = require('gulp');
const mocha = require('gulp-mocha');

export function test() {
  return gulp.src('tests/**/*.js', { read: false }).pipe(
    mocha({
      require: '@babel/register',
      reporter: 'nyan',
    })
  );
}
