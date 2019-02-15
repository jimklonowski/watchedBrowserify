const gulp          = require('gulp');
const browserify    = require('browserify');
const buffer        = require('vinyl-buffer');
const gutil         = require('gulp-util');
const sass          = require('gulp-sass');
const source        = require('vinyl-source-stream');
const sourcemaps    = require('gulp-sourcemaps');
const tsify         = require('tsify');
const watchify      = require('watchify');

/**
 * SASS Tasks
 */
gulp.task('sass', function(){
    gutil.log(gutil.colors.yellow('--~~>> Compiling SASS <<~~--'));
    return gulp.src('src/sass/styles.scss')
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass({outputStyle: 'compressed' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dest'))
        .on('end', () => { gutil.log(gutil.colors.yellow('--~~>> Done Compiling SASS <<~~--')); });
});

gulp.task('sass:watch', function(){
    gulp.watch(['src/sass/**/*.scss'], gulp.task('sass')).on('change', () => { gutil.log(gutil.colors.yellow('--~~>> SCSS changes detected <<~~--')); });
});

//// ts browserify
function TS_BROWSERIFY(){
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/ts/main.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify);    
}


//// ts bundle
function TS_BUNDLE(bundler){
    function onerror(err){
        console.error(err.toString());
        console.error(err.codeFrame);
    }
    gutil.log(gutil.colors.magenta('--~~>> Bundling TypeScript <<~~--'));
    return bundler.bundle()
        .on('error', (err) => {
            onerror(err);
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps:true}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dest'))
        .on('end', () => { gutil.log(gutil.colors.magenta('--~~>> Done Bundling TypeScript. <<~~--')); });
}

//bundle ts with browserify (dont need watchify for this task)
gulp.task('ts', ()=>{
    return TS_BUNDLE(TS_BROWSERIFY());
});

// watch for changes and rebundle (use watchify here)
gulp.task('ts:watch', () => {
    let bundler = watchify(TS_BROWSERIFY());
    let rebundle = () => {
        TS_BUNDLE(bundler);
    };

    bundler.on('update', () => {
        //console.log(':: Bundling,', new Date());
        gutil.log(gutil.colors.magenta('--~~>> TypeScript changes detected <<~~--'));
        rebundle();
    });

    rebundle();
});

//watch task
gulp.task('watch', gulp.parallel(['ts:watch', 'sass:watch']));
//default task (run ts and sass in parallel, and when both are done, run watch)
gulp.task('default', gulp.series([gulp.parallel(['ts', 'sass']), 'watch']));
