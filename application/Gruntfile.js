module.exports = function(grunt){
    // save the location of the Gruntfile (for the watch task to work, see watch options)
    var GruntfileDir = process.cwd();
    // If the Gruntfile is not in the same directory as package.json
    grunt.file.setBase('../');
    
    // Project configuration
    grunt.initConfig({
        site  : grunt.file.readYAML('application/config.yml'),
        // COPY
		copy: {
			assets: {
				files: [
					// FontAwesome
					{
						expand: true,
                        flatten: true,
                        filter: 'isFile',
                        src: ['<%= site.base %>/bower_components/fontawesome/fonts/*'],
                        dest: '<%= site.dest %>/fonts'
					},
                    // Images
                    {
						expand: true,
                        flatten: true,
                        filter: 'isFile',
                        src: ['<%= site.src %>/images/**'],
                        dest: '<%= site.dest %>/img'
					}
				]
			}
		},
        // LESS
		less: {
			options: {
				compress: true
			},
			site: {
				files: {
					'<%= site.dest %>/css/theme.min.css': '<%= site.src %>/less/site/_main.less'
				}
			}
		},
        // CSS MIN
		cssmin: {
			options: {
				keepSpecialComments: 0
			},
			// Base vendor CSS files
			base: {
				files: {
					'<%= site.dest %>/css/base.min.css': [
						'<%= site.base %>/bower_components/skeleton/css/normalize.css',
						'<%= site.base %>/bower_components/skeleton/css/skeleton.css',
						'<%= site.base %>/bower_components/fontawesome/css/font-awesome.css'
					]
				}
			}
		},
        // CONCAT
		concat: {
			options: {
				separator: '\n',
                stripBanners: false
			},
			// Third party base JS files
			base: {
				files: {
					'<%= site.src %>/grunt/base.js': [
						'<%= site.base %>/bower_components/jquery/dist/jquery.js',
						'<%= site.base %>/bower_components/sjcl/sjcl.js',
                        '<%= site.base %>/bower_components/noty/js//noty/packaged/jquery.noty.packaged.js',
                        '<%= site.src %>/js/lib/**/*.js',
                        // '<%= site.src %>/js/lib/jquery.secStore.js',
						// '<%= site.src %>/js/lib/namespace.js',
                        // '<%= site.src %>/js/lib/jquery.touchwipe.js',
						// '<%= site.src %>/js/lib/jquery.tooglesidebar.js'
					]
				}
			},
			// Site
			site: {
				files: {
                    // Application
					'<%= site.src %>/grunt/express.js': [
						'<%= site.src %>/js/application/express/_express.js',
                        '<%= site.src %>/js/application/express/functions/express.functions.js',
						'<%= site.src %>/js/application/express/storage/express.localstorage.js',
                        '<%= site.src %>/js/application/express/messages/express.messages.js',
						'<%= site.src %>/js/application/express/api/express.api.js',
						'<%= site.src %>/js/application/express/api/express.api.ajax.js',
                        '<%= site.src %>/js/application/express/api/express.api.utility.js',
                        '<%= site.src %>/js/application/express/auth/express.auth.js',
                        '<%= site.src %>/js/application/express/user/express.user.js'
					],
                    // Controllers
                    '<%= site.src %>/grunt/controllers.js': [
                        '<%= site.src %>/js/application/controllers/_controllers.js',
                        '<%= site.src %>/js/application/controllers/**/*.js',
                        // '<%= site.src %>/js/application/controllers/controllers.splash.js',
                        // '<%= site.src %>/js/application/controllers/public/controllers.login.js',
                        // '<%= site.src %>/js/application/controllers/app/controllers.app.js'
                    ]
				}
			}
		},
        // UGLIFY
		uglify: {
			base: {
				files: {
					'<%= site.dest %>/js/application/base.min.js': '<%= site.src %>/grunt/base.js'
				}
			},
			site: {
				files: {
                    '<%= site.dest %>/js/application/application.min.js': ['<%= site.src %>/grunt/express.js', '<%= site.src %>/grunt/controllers.js'],
                    '<%= site.dest %>/js/main.min.js': '<%= site.src %>/js/application/document.ready.js'
				}
			}
		},
        // WATCH
		watch: {
			options: {
				livereload: false,
                cliArgs: ['--gruntfile', require('path').join(GruntfileDir, 'Gruntfile.js')]
			},
            devdesktop: {
                files: ['<%= site.src %>/less/**/*.less', '<%= site.src %>/js/**/*.js', '<%= site.templates %>/**/*.{pug,json,yml}'],
                tasks: ['less:site', 'concat:site', 'uglify:site', 'pug:desktop']
            },
            devphonegap: {
                files: ['<%= site.src %>/less/**/*.less', '<%= site.src %>/js/**/*.js', '<%= site.templates %>/**/*.{pug,json,yml}'],
                tasks: ['less:site', 'concat:site', 'uglify:site', 'pug:phonegap']
            }
		},
        // PUG
        pug: {
            options: {
                pretty: true,
                debug: false,
                data: {
                    site: '<%= site %>',
                    phonegap: false
                }
            },
            desktop: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%= site.templates %>/*.pug', '<%= site.templates %>/application/*.pug'],
                        dest: '<%= site.dest %>',
                        ext: ".html"
                    }
                ]
            },
            phonegap: {
                options: {
                    data: {
                        site: '<%= site %>',
                        phonegap: true
                    }
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%= site.templates %>/*.pug', '<%= site.templates %>/application/*.pug'],
                        dest: '<%= site.dest %>',
                        ext: ".html"
                    }
                ]
            }
        }
    });
    
    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-pug');
    
    // Default task
  	grunt.registerTask('default', ['copy', 'less', 'cssmin', 'concat', 'uglify', 'pug:desktop']);
    // Phonegap task
  	grunt.registerTask('phonegap', ['copy', 'less', 'cssmin', 'concat', 'uglify', 'pug:phonegap']);
};