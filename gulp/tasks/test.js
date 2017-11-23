const gulp = require('gulp');
const mocha = require('gulp-mocha');

gulp.task('test', () =>
  gulp.src('tests/**/*.js', { read: false }).pipe(
    mocha({
      require: 'babel-core/register',
      reporter: 'nyan',
    })
  )
);
