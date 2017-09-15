var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-ruby-sass'),
	livereload = require('gulp-livereload'),
	imagemin = require('gulp-imagemin'),
	prefix = require('gulp-autoprefixer');

//Image Task
//Compress
gulp.task('image', function(){
	gulp.src('src/images/*')
	.pipe(imagemin())
	.pipe(gulp.dest('img'));
});

//Scripts Task
//Uglifies
gulp.task('scripts', function(){
	gulp.src('src/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('js'));
});

//Styles Task
//Compile SCSS
gulp.task('styles', function(){
		sass('src/sass/**/*.scss', {
			style: 'compressed'
		})
		.on('error', sass.logError)
		.pipe(prefix({
			browsers: ['last 4 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('css'))
		.pipe(livereload());
});

//Watch Task
//Watches JS
gulp.task('watch', function() {

	var server = livereload();

	gulp.watch('src/js/*.js', ['scripts']);
	gulp.watch('src/sass/**/*.scss', ['styles']);
});

gulp.task('default', ['scripts', 'styles', 'image', 'watch']);
