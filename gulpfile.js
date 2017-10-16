const gulp = require('gulp')
const runTaskSequence = require('gulp-sequence')
const deleteFiles = require('del')
const lesscss = require('gulp-less')

gulp.task('clear old build', () => {
    return deleteFiles('./build/')
})

gulp.task('build html', () => {
    return gulp.src('./source/index.html')
        .pipe(gulp.dest('./build/'))
})

gulp.task('build css', () => {
    return gulp.src('./source/styles/index.less')
        .pipe(lesscss())
        .pipe(gulp.dest('./build/'))
})

gulp.task('build', runTaskSequence(
    'clear old build',
    ['build html', 'build css']
))

gulp.task('start watching files', () => {
    return gulp.watch('source/**/*', ['build']);
})

gulp.task('default', ['build', 'start watching files'])