import gulp from 'gulp';
import { clean } from './gulp/tasks/clean';
import { lint } from './gulp/tasks/lint';
import { test } from './gulp/tasks/test';
import { build } from './gulp/tasks/build';

const { parallel, series } = gulp;

gulp.task(clean);
gulp.task(lint);
gulp.task(test);
gulp.task(build);

gulp.task('default', series(parallel(clean, lint), parallel(test, build)));
