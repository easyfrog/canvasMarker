// 包装函数
module.exports = function(grunt) {
	var fs = 'src/*.js';

	// 必要的类库文件
	grunt.config.merge({
		// concat 合并
		concat: {
			options: {
				/*banner: banner*/
			},
			domop:{
				src: fs,
				dest: "./build/FMMarkerCanvas.js"
			}
		},

		// minify
		uglify: {
			options: {
				/*banner: banner,*/
				compress: {
					unused: true,
					dead_code: true,
					drop_console: false
				}
			},
			doit: {
				src: fs,
				dest: "./build/FMMarkerCanvas.min.js",
			}
		}, 

		// copy
		copy: {
			doit: {
				src: './build/marker/FMMarkerCanvas.js',
				dest: '/Users/fengmap/Documents/ztc/works/fengmap/src/newapi-fengmap/marker/FMMarkerCanvas.js'
			}
		}
	});

	// 告诉grunt我们将使用插件
	// grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['concat', 'uglify']);
};







