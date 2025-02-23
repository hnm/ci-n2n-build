import gulp from 'gulp';
import imagemin from 'gulp-imagemin';



// gulp.task('uglify-js', () => {
// return gulp.src(['../target/public/assets/**/*.js', '!../target/public/assets/**/+(thirdparty|dist)/**', '!../target/public/assets/**/*.min.js'])
// 		.pipe(terser({ keep_classnames: true, keep_fnames: true }))
// 		.pipe(gulp.dest('../target/public/assets'));
// });


gulp.task('minify-images', () => {
	return gulp.src(['../target/public/assets/**/*.*(jpg|jpeg|png|svg|gif)'], {encoding: false})
			.pipe(imagemin())
			.pipe(gulp.dest('../target/public/assets'))
});


// gulp.task('minify-css', (cb) => {
// let cmd = 'npx cleancss --batch --batch-suffix "" "../target/public/assets/**/*.css"';
// return exec.exec(cmd, function (err, stdout, stderr) {
// 	console.log(stdout);
// 	console.error(stderr);
// 	cb(err);
// });
// });

gulp.task('minify', gulp.series(/*'uglify-js', 'minify-css',*/'minify-images'));
