var gulp = require('gulp');
var uglifyes = require('gulp-uglify-es').default;
var uglyComposer = require('gulp-uglify/composer');
var imagemin = require('gulp-imagemin');
var uglify = uglyComposer(uglifyes, console);
var exec = require('child_process').exec;

gulp.task('uglify-js', function () {
	return gulp.src(['../target/public/assets/**/*.js', '!../target/public/assets/**/+(thirdparty|dist)/**', '!../target/public/assets/**/*.js'])
			.pipe(uglifyes({ keep_classnames: true, keep_fnames: true }))
			.pipe(gulp.dest('../target/public/assets'));
});

gulp.task('minify-css', (cb) => {
	let cmd = 'npx cleancss --batch --batch-suffix "" "../target/public/assets/**/*.css"';
	exec(cmd, function (err, stdout, stderr) {
		console.log(stdout);
		console.error(stderr);
		cb(err);
	});
});

gulp.task('minify-images', () =>
	gulp.src(['../target/public/assets/**/*.png', '../target/public/assets/**/*.jpg', '../target/public/assets/**/*.jpeg'])
		.pipe(imagemin())
		.pipe(gulp.dest('../target/public/assets'))
);

gulp.task('minify', gulp.parallel('uglify-js', 'minify-css', 'minify-images'));
