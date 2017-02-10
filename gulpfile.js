var gulp=require('gulp'),
uglify=require('gulp-uglify'),
rename = require('gulp-rename')
cssmin=require('gulp-minify-css');

gulp.task('js',function(){
	gulp.src('js/*.js')
	    .pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('build'))

});
gulp.task('css',function(){
	gulp.src('style/*.css')
	.pipe(rename({suffix: '.min'}))
		.pipe(cssmin())
		.pipe(gulp.dest('build'))

});
gulp.task('default', function() {
  // 将你的默认的任务代码放在这
  gulp.task('build',['js','css']);
 
});
