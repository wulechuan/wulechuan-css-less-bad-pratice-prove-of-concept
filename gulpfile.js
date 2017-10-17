const gulp = require('gulp')
const runTaskSequence = require('gulp-sequence')
const streamCombiner = require('stream-combiner2')
const deleteFiles = require('del')
const renameFiles = require('gulp-rename')
const lesscss = require('gulp-less')

gulp.task('clear old build', () => {
    return deleteFiles([
        './build/index.html',
        './build/index.css'
    ])
})

gulp.task('build html', () => {
    return gulp.src('./source/demo.html')
    .pipe(renameFiles({ basename: 'index' }))
    .pipe(gulp.dest('./build'))
})

gulp.task('build css', () => {
    const combinedStream = streamCombiner.obj([
        gulp.src('./source/styles/index.less'),
        lesscss(),
        gulp.dest('./build/')
    ])

    combinedStream.on('error', error => {
        console.error('\n'+'='.repeat(64))
        console.error(error)
        console.error('='.repeat(64)+'\n')
    })

    return combinedStream
})

gulp.task('build', (onThisTaskEnd) => runTaskSequence(
    'clear old build',
    ['build html', 'build css']
)(onThisTaskEnd))

gulp.task('start watching files', () => {
    return gulp.watch('source/**/*', ['build']);
})

gulp.task('default', ['build', 'start watching files'])
