const gulp = require('gulp');
const sequence = require('gulp-sequence');

gulp.task('default', sequence(['clean', 'lint'], ['test', 'build']));
