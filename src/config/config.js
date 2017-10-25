// 路径配置
var root = {
    src: './src/**',
    dist: './dist/**'
}

var css = {
    src: './src/css/**',
    dist: './dist/css'
}

var js = {
    src: './src/js/**',
    dist: './dist/js'
}

var font = {
    src: './src/font/**',
    dist: './dist/font'
}

var img = {
    src: './src/img/*',
    dist: './dist/img'    
}

var mock = {
    src: './src/mock/*',
    dist: './dist/mock'    
}

var page = {
    src: './src/page/**',
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
    demo,
    font,
    mock
}