import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import uglifyes from 'gulp-uglify-es';
import uglyComposer from 'gulp-uglify/composer.js';
import exec from 'child_process';

var uglify = uglyComposer(uglifyes, console);


gulp.task('uglify-js', () => {
	return gulp.src(['../target/public/assets/**/*.js', '!../target/public/assets/**/+(thirdparty|dist)/**', '!../target/public/assets/**/*.min.js'])
			.pipe(uglify({ keep_classnames: true, keep_fnames: true }))
			.pipe(gulp.dest('../target/public/assets'));
});


gulp.task('minify-images', () => {
	return gulp.src(['../target/public/assets/**/*.png', '../target/public/assets/**/*.jpg', '../target/public/assets/**/*.jpeg'])
			.pipe(imagemin())
			.pipe(gulp.dest('../target/public/assets'))
});


gulp.task('minify-css', (cb) => {
	let cmd = 'npx cleancss --batch --batch-suffix "" "../target/public/assets/**/*.css"';
	return exec.exec(cmd, function (err, stdout, stderr) {
		console.log(stdout);
		console.error(stderr);
		cb(err);
	});
});

gulp.task('minify', gulp.parallel('uglify-js', 'minify-css', 'minify-images'));
