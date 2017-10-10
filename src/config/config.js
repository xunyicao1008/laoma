// 路径配置
var root = {
    src: './src/**/*',
    dist: './dist/**/*'
}

var css = {
    src: './src/css/*.scss',
    dist: './dist/css'
}

var js = {
    src: './src/js/*.js',
    dist: './dist/js'
}

var img = {
    src: './src/img/*',
    dist: './dist/img'    
}

var page = {
    src: './src/page/*',
    dist: './dist/page'
}

var demo = {
    src: './dist/**',
    dist: './demo'    
}

module.exports = {
    root,
    css,
    js,
    img,
    page,
    demo
}