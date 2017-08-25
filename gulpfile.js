var gulp = require('gulp'), nodemon = require('gulp-nodemon'), notify = require('gulp-notify'), livereload = require('gulp-livereload');

// Task
gulp.task('default', function() {
    // listen for changes
    livereload.listen();
    // configure nodemon
    nodemon({
        // the script to run the app
        script: '/public/index.html',
        ext: 'js'
    }).on('restart', function() {
        // when the app has restarted, run livereload.
        gulp.src('/public/index.html')
            .pipe(livereload())
            .pipe(notify('Reloading page, please wait...'));
    });
});