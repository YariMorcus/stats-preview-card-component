const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

// Compile Sass to CSS function
function compiler() {

    // Locate the SCSS files
    return gulp.src('./sass/**/*.scss')

    // Compile SCSS to CSS
    .pipe(sass().on('error', sass.logError))

    // Minify the CSS
    .pipe(cleanCSS(
        {
            compatibility: '*', // (default) - Internet Explorer 10+ compatibility mode
            debug: true
        }, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize} (unmin)`);
        console.log(`${details.name}: ${details.stats.minifiedSize} (min)`);
    }))

    // Save the CSS
    .pipe(gulp.dest('./styles'))

    // Stream to all browser (doesn't reload the page)
    .pipe(browserSync.stream());

}

/**
 * Initiate browserSync
 * Watch for changes
 * Automatically compile SCSS → CSS
*/
function watch() {

    // Initiate browserSync
    browserSync.init({
        server: {
            baseDir: './'
        }
    })

    // Automatically compile SCSS to CSS
    gulp.watch('./sass/**/*.scss', compiler);

    // Watch for changes in .html or .js files, 
    // If change detected, reload page automatically
    gulp.watch('./*.html').on('change', () => browserSync.reload() );
    gulp.watch('./js/**/*.js').on('change', () => browserSync.reload() );

}

// Use 'comp' to compile SCSS → CSS
exports.comp = compiler;

// Use 'watch' to watch for changes and automatic scss compilation
exports.watch = watch;