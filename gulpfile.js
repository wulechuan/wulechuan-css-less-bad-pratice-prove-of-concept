const gulp = require('gulp')
const runTaskSequence = require('gulp-sequence')
const deleteFiles = require('del')
const renameFiles = require('gulp-rename')
const lesscss = require('gulp-less')

gulp.task('clear old build', () => {
    return deleteFiles('./build/')
})

gulp.task('build html', () => {
    return gulp.src('./source/demo.html')
    .pipe(renameFiles({ basename: 'index' }))
    .pipe(gulp.dest('./build'))
})

gulp.task('build css', () => {
    return gulp.src('./source/styles/index.less')
        .pipe(lesscss())
        .pipe(gulp.dest('./build/'))
})

gulp.task('build', (onThisTaskEnd) => runTaskSequence(
    'clear old build',
    ['build html', 'build css']
)(onThisTaskEnd))

gulp.task('start watching files', () => {
    return gulp.watch('source/**/*', ['build']);
})

gulp.task('default', ['build', 'start watching files'])
