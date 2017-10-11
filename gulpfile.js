// 引入gulp插件
var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del')
var minify = require('gulp-minify-css');

// config
var config = require('./src/config/config.js');

// 开发
gulp.task('dev', function(){
    console.log('---开始监听---')
    gulp.watch(config.root.src, ['build'])
})

// 编译
gulp.task('build', ['clean'], function(){
    gulp.start(['build-css', 'build-js', 'build-img', 'build-page'], function(){
        console.log('静态编译 success')
    })  
});

// 编译sass
gulp.task('build-css', function(){
    return gulp.src(config.css.src)
    .pipe(sass())
    .on('error', swallowError)
    .pipe(minify())
    .pipe(gulp.dest(config.css.dist))
});

// 移动js
gulp.task('build-js', function(){
    return gulp.src(config.js.src)
    .pipe(gulp.dest(config.js.dist))
});

// 移动page
gulp.task('build-page', function(){
    return gulp.src(config.page.src)
    .pipe(gulp.dest(config.page.dist))
});

// 移动img
gulp.task('build-img', function(){
    return gulp.src(config.img.src)
    .pipe(gulp.dest(config.img.dist))
});

// 清空dist
gulp.task('clean', function(){
    return del([config.root.dist])
})

// 生成demo
gulp.task('build-demo', ['clean-demo'], function(){
    return gulp.src(config.demo.src)
    .pipe(gulp.dest(config.demo.dist))
})

// 清空demo
gulp.task('clean-demo', function() {
    return del([config.demo.dist])
})

// 吃掉异常，防止watch监听 crash
function swallowError(error) {
    console.log(error.toString())
    this.emit('end')
}
