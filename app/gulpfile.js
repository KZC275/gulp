var gulp = require('gulp');

//压缩js代码
var uglify = require('gulp-uglify');

//合并js文件
var concat = require('gulp-concat');

//sass插件
var sass=require("gulp-ruby-sass");

//用来实现动态刷新功能的模块
var connect =  require("gulp-connect"); 

//把js文件压缩合并
gulp.task('default', function() {
    // gulp.src(paths.scripts)
    gulp.src('demo/*.js')
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('build'));//如果不存在build文件夹就创建一个
});


// scssToCss转化,scss文件转化为css
gulp.task("scssToCss",function(){
	sass('sass/*.scss',{style:"compact"}).on('error', sass.logError).pipe(gulp.dest('./css'))
})

//html文件是否改变，自动刷新页面
gulp.task("html",function(){
	gulp.src('./*.html').pipe( connect.reload() );
})


//css文件是否改变，自动刷新页面
gulp.task("css",function(){
	gulp.src('css/*.css').pipe( connect.reload() );
})

//watch监听

gulp.task('watch',function(){
	connect.server({
	    livereload:true    //开启服务后，需要在开启服务的端口打开对应html文件才可以监听并实时更新页面
	})
	 gulp.watch("sass/*.scss",["scssToCss"]);
	 gulp.watch("demo/*.js",["default"]);
	 gulp.watch("./*.html",["html"]);
	 gulp.watch("css/*.css",["css"]);

})