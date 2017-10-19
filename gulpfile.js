const gulp = require('gulp')
const runTaskSequence = require('gulp-sequence')
const streamCombiner = require('stream-combiner2')
const deleteFiles = require('del')
const renameFiles = require('gulp-rename')
const lesscss = require('gulp-less')

gulp.task('clear old build', () => {
    return deleteFiles([
        './build/demo-pages/index.html',
        './build/demo-pages/index.css',
        './build/styles-researching/'
    ])
})

gulp.task('build html', () => {
    return gulp.src('./source/demo.html')
    .pipe(renameFiles({ basename: 'index' }))
    .pipe(gulp.dest('./build/demo-pages'))
})

gulp.task('build css demo', () => {
    const combinedStream = streamCombiner.obj([
        gulp.src('./source/styles/index.less'),
        lesscss(),
        gulp.dest('./build/demo-pages')
    ])

    combinedStream.on('error', error => {
        console.error('\n'+'='.repeat(64))
        console.error(error)
        console.error('='.repeat(64)+'\n')
    })

    return combinedStream
})

gulp.task('build css researching', () => {
    const combinedStream = streamCombiner.obj([
        gulp.src([
            './source/styles-researching/*/index.less'
            // , './source/styles-researching/*/all-components.less'
            , './source/styles-researching/*/skins-index.less'
            // , './source/styles-researching/*/component-1-index.less'
            // , './source/styles-researching/*/component-2-index.less'
        ]),
        lesscss(),
        gulp.dest('./build/styles-researching')
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
    ['build html', 'build css demo', 'build css researching']
)(onThisTaskEnd))

gulp.task('start watching files', () => {
    return gulp.watch('source/**/*', ['build']);
})

gulp.task('default', ['build', 'start watching files'])
