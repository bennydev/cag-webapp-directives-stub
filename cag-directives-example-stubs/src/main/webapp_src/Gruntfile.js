'use strict';

module.exports = function ( grunt ) {

  // Reads package.json and loads grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  /**
   * Load in our build configuration file.
   */
  var userConfig = require( './build.config.js' );

  // optional flags, pass `--flag=value` to set
  // where "flag" is name of the flag
  var flag = {
    env: grunt.option('env') || 'dev',
    skipTests: grunt.option('skipTests') || null,
    appVersion: grunt.option('appVersion') || null
  };

  /**
   * This is the configuration object Grunt uses to give each plugin its
   * instructions.
   */
  var taskConfig = {
    /**
     * We read in our `package.json` file so we can access the package name and
     * version. It's already there, so we don't repeat ourselves here.
     */
    pkg: grunt.file.readJSON("package.json"),

    flag: flag,

    /**
     * The banner is the comment that is placed at the top of our compiled
     * source files. It is first processed as a Grunt template, where the `<%=`
     * pairs are evaluated based on this very configuration object.
     */
    meta: {
      banner:
        '/**\n' +
        ' * <%= pkg.name %> - v<%= flag.appVersion || pkg.version %> - <%= grunt.template.today("yyyy-mm-dd (HH:MM:ss)") %>\n' +
        ' */\n'
    },

    /**
     * The directories to delete when `grunt clean` is executed.
     */
    clean:  {
      options: {
        force: true
      },
      files: {
        src: [
          '<%= build_dir %>',
          '<%= compile_dir %>/**/*',
          '!<%= compile_dir %>/WEB-INF',
          '!<%= compile_dir %>/WEB-INF/web.xml'
        ]
      }
    },

    /**
     * The `connect` task will start up a Node.js-server. By running `grunt watch`
     * the server will serve a development version of your app with livereload
     * enabled. By running simply `grunt` the server will serve your
     * production ready app with livereload disabled.
     */
    connect: {
      options: {
        port: 9002,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0',
        // livereload: 35729,
        livereload: false,
        middleware: function (connect, options) {
          if (!Array.isArray(options.base)) {
            options.base = [options.base];
          }

          // Setup the proxy
          var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];

          // Serve static files.
          options.base.forEach(function(base) {
            middlewares.push(connect.static(base));
          });

          // Make directory browse-able.
          var directory = options.directory || options.base[options.base.length - 1];
          middlewares.push(connect.directory(directory));

          return middlewares;
        }
      },
      proxies: [
        {
          context: '/resources',
          host: 'localhost',
          port: 9000,
          https: false,
          changeOrigin: false,
          xforward: false,
          // If you have your backend on a different context path
          // you can use rewrites to direct calls appropriately
          rewrite: {
          //   // This rewrite has the following effect:
          //   // Calls made to: http:/localhost:9000/resources
          //   // Will be redirected to: http:/localhost:8080/i84ds03/resources
             '/resources': '/i84ds03/resources'
          },
          headers: {
            "x-custom-added-header": "Delivered by Grunt.js awesomeness"
          }
        }
      ],
      livereload: {
        options: {
          base: '<%= build_dir %>'
        }
      },
      dist: {
        options: {
          base: '<%= compile_dir %>',
          livereload: false
        }
      }
    },

    /**
     * The `copy` task just copies files from A to B. We use it here to copy
     * our project assets (images, fonts, etc.) and javascripts into
     * `build_dir`, and then to copy the assets to `compile_dir`.
     */
    copy: {
      build_app_assets: {
        files: [
          {
            src: [ '**', '!**/*.md' ],
            dest: '<%= build_dir %>/assets/',
            cwd: 'src/assets',
            expand: true
          }
        ]
      },
      build_vendor_assets: {
        files: [
          {
            src: [ '<%= vendor_files.assets %>', '!**/*.md' ],
            dest: '<%= build_dir %>/assets/',
            cwd: '.',
            expand: true,
            flatten: false
          }
        ]
      },
      build_ng_file_upload_assets: {
        files: [
          {

               //*This is a workaround for file upload to work in IE 8, 9
               //* that uses flash API to upload files

               // this is a bad solution, though, since it assumes that the users have flash installed.

            src: [ '<%= vendor_files.ng_file_upload_assets %>', '!**/*.md' ],
            dest: '<%= build_dir %>/vendor/ng-file-upload/',
            cwd: '.',
            expand: true,
            flatten: true
          }
        ]
      },
      build_ng_animate_font_assets: {
        files: [
          {

               // this is a special case, where we want the glyph-icon fonts to be in
              // a special folder so ng-animate can access them on the client.
            src: [ '<%= vendor_files.ng_animate_font_assets %>', '!**/*.md' ],
            dest: '<%= build_dir %>/assets/styles/css/vendor/bootstrap/fonts/',
            cwd: '.',
            expand: true,
            flatten: true
          }
        ]
      },
      build_appjs: {
        files: [
          {
            src: [ '<%= app_files.js %>' ],
            dest: '<%= build_dir %>/',
            cwd: '.',
            expand: true
          }
        ]
      },
      build_vendorjs: {
        files: [
          {
            src: [ '<%= vendor_files.js %>', '!**/*.md' ],
            dest: '<%= build_dir %>/',
            cwd: '.',
            expand: true
          }
        ]
      },
      build_vendorcss: {
        files: [
          {
            src: [ '<%= vendor_files.css %>', '!**/*.md' ],
            dest: '<%= build_dir %>/',
            cwd: '.',
            expand: true
          }
        ]
      },
      compile_assets: {
        files: [
          {
            src: [ '**' ],
            dest: '<%= compile_dir %>/assets',
            cwd: '<%= build_dir %>/assets',
            expand: true
          }
        ]
      }
    },

    /**
     * `grunt concat` concatenates multiple source files into a single file.
     */
    concat: {
      /**
       * The `compile_css` target concatenates compiled CSS and vendor CSS
       * together.
       */
      compile_css: {
        /*src: [
          '<%= vendor_files.css %>',
          '<%= less.build.dest %>'
        ],*/
        src: [ '<%= vendor_files.css %>','<%= less.build.dest %>', '!**/*.png', '!**/*.gif', '!**/*.jpg' ],
        dest: '<%= less.build.dest %>'
      },
      /**
       * The `compile_js` target is the concatenation of our application source
       * code and all specified vendor source code into a single file.
       */
      compile_js: {
        options: {
          banner: '<%= meta.banner %>'
        },
        src: [
          '<%= vendor_files.js %>',
          'module.prefix',
          '<%= build_dir %>/src/**/*.js',
          '<%= html2js.app.dest %>',
          '<%= html2js.common.dest %>',
          'module.suffix'
        ],
        dest: '<%= compile_dir %>/assets/<%= pkg.name %>-<%= flag.appVersion || pkg.version %>.min.js'
      }
    },

    /**
     * `ngAnnotate` annotates the sources before minifying. That is, it allows us
     * to code without the array syntax.
     */
    ngAnnotate: {
      options: {
        // Task-specific options go here.
      },
      app: {
        // Target-specific file lists and/or options go here.
        files: {
          '<%= concat.compile_js.dest %>': ['<%= concat.compile_js.dest %>']
          // src: [ '<%= app_files.js %>' ],
          // cwd: '<%= build_dir %>',
          // dest: '<%= build_dir %>',
          // expand: true
        }
      }
    },

    /**
     * Minify the sources!
     */
    uglify: {
      compile: {
        options: {
          banner: '<%= meta.banner %>'
        },
        files: {
          '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
        }
      }
    },

    /**
     * `less` handles our LESS compilation and uglification automatically.
     * Only our `main.less` file is included in compilation; all other files
     * must be imported from this file.
     */
    less: {
      build: {
        src: '<%= app_files.less %>',
        dest: "<%= build_dir %>/assets/styles/css/<%= pkg.name %>-<%= flag.appVersion || pkg.version %>.css"
      }
    },

    cssmin: {
      minify: {
        src: ['<%= less.build.dest %>'],
        dest: "<%= compile_dir %>/assets/styles/css/<%= pkg.name %>-<%= flag.appVersion || pkg.version %>.min.css"
      }
    },

    /**
     * Instead of using hacky less-mixins for CSS3 features and such,
     * we run out compiled CSS through the autoprefixer. You can
     * now use the official syntax without having to worry.
     */
    postcss: {
      options: {
        processors: [
          require('autoprefixer-core')({browsers: ['last 2 version', 'ie 8', 'ie 9']})
        ]
      },
      dist: {
        src: '<%= less.build.dest %>'
      }
    },

    /**
     * `jshint` defines the rules of our linter as well as which files we
     * should check. This file, all javascript sources, and all our unit tests
     * are linted based on the policies listed in `options`. But we can also
     * specify exclusionary patterns by prefixing them with an exclamation
     * point (!); this is useful when code comes from a third party but is
     * nonetheless inside `src/`.
     */
    jshint: {
      src: [
        '<%= app_files.js %>'
      ],
      test: [
        '<%= app_files.jsunit %>'
      ],
      gruntfile: [
        'Gruntfile.js'
      ],
      options: {
        curly: true,
        immed: true,
        newcap: true,
        noarg: true,
        sub: true,
        boss: false,
        eqnull: false,
        globalstrict: true,
        jquery: true,
        browser: true,
        devel: true,
        debug: true,
        laxcomma: true,
        globals: {
          module: true,
          require: true,
          Modernizr: true,
          angular: true,
          _: true,
          jQuery: true,
          jasmine: true,
          describe: true,
          ddescribe: true,
          xdescribe: true,
          it: true,
          xit: true,
          expect: true,
          beforeEach: true,
          afterEach: true,
          inject: true,
          spyOn: true
        }
      },
    },

    /**
     * HTML2JS is a Grunt plugin that takes all of your template files and
     * places them into JavaScript files as strings that are added to
     * AngularJS's template cache. This means that the templates too become
     * part of the initial payload as one JavaScript file. Neat!
     */
    html2js: {
      /**
       * These are the templates from `src/app`.
       */
      app: {
        options: {
          base: 'src/app'
        },
        src: [ '<%= app_files.atpl %>' ],
        dest: '<%= build_dir %>/templates-app.js'
      },

      /**
       * These are the templates from `src/common`.
       */
      common: {
        options: {
          base: 'src/common'
        },
        src: [ '<%= app_files.ctpl %>' ],
        dest: '<%= build_dir %>/templates-common.js'
      }
    },

    /**
     * The Karma configurations.
     */
    karma: {
      options: {
        configFile: '<%= build_dir %>/karma-unit.js'
      },
      unit: {
        runnerPort: 9876,
        background: true
      },
      continuous: {
        singleRun: true
      }
    },

    /**
     * The `index` task compiles the `index.html` file as a Grunt template. CSS
     * and JS files co-exist here but they get split apart later.
     */
    index: {

      /**
       * During development, we don't want to have wait for compilation,
       * concatenation, minification, etc. So to avoid these steps, we simply
       * add all script files directly bottom of `index.html`. The
       * `src` property contains the list of included files.
       */
      build: {
        dir: '<%= build_dir %>',
        src: [
          '<%= vendor_files.js %>',
          '<%= build_dir %>/src/**/*.js',
          '<%= html2js.common.dest %>',
          '<%= html2js.app.dest %>',
          '<%= vendor_files.css %>',
          '<%= less.build.dest %>'
        ]
      },

      /**
       * When it is time to have a completely compiled application, we can
       * alter the above to include only a single JavaScript and a single CSS
       * file. Now we're back!
       */
      compile: {
        dir: '<%= compile_dir %>',
        src: [
          '<%= concat.compile_js.dest %>',
          '<%= cssmin.minify.dest %>'
        ]
      }
    },

    /**
     * This task compiles the karma template so that changes to its file array
     * don't have to be managed manually.
     */
    karmaconfig: {
      unit: {
        dir: '<%= build_dir %>',
        src: [
          '<%= vendor_files.js %>',
          '<%= html2js.app.dest %>',
          '<%= html2js.common.dest %>',
          '<%= test_files.js %>'
        ]
      }
    },

    /**
     * And for rapid development, we have a watch set up that checks to see if
     * any of the files listed below change, and then to execute the listed
     * tasks when they do. This just saves us from having to type "grunt" into
     * the command-line every time we want to see what we're working on; we can
     * instead just leave "grunt watch" running in a background terminal. Set it
     * and forget it, as Ron Popeil used to tell us.
     *
     * But we don't need the same thing to happen for all the files.
     */
    watch: {
      /**
       * By default, we want the Live Reload to work for all tasks; this is
       * overridden in some tasks (like this file) where browser resources are
       * unaffected. It runs by default on port 35729, which your browser
       * plugin should auto-detect.
       */
      options: {
        livereload: '<%= connect.options.livereload %>'
      },

      /**
       * When the Gruntfile changes, we just want to lint it. In fact, when
       * your Gruntfile changes, it will automatically be reloaded!
       */
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: [ 'jshint:gruntfile' ],
        options: {
          livereload: false
        }
      },

      /**
       * When our JavaScript source files change, we want to run lint them and
       * run our unit tests.
       */
      jssrc: {
        files: [
          '<%= app_files.js %>'
        ],
        tasks: [ 'jshint:src', 'karma:unit:run', 'copy:build_appjs' ]
      },

      /**
       * When index.html changes, we need to compile it.
       */
      html: {
        files: [ '<%= app_files.html %>' ],
        tasks: [ 'index:build' ]
      },

      /**
       * When our templates change, we only rewrite the template cache.
       */
      tpls: {
        files: [
          '<%= app_files.atpl %>',
          '<%= app_files.ctpl %>'
        ],
        tasks: [ 'html2js' ]
      },

      /**
       * When the CSS files change, we need to compile and minify them.
       */
      less: {
        files: [ 'src/**/*.less' ],
        tasks: [ 'less:build', 'postcss' ]
      },

      /**
       * When a JavaScript unit test file changes, we only want to lint it and
       * run the unit tests. We don't want to do any live reloading.
       */
      jsunit: {
        files: [
          '<%= app_files.jsunit %>'
        ],
        tasks: [ 'jshint:test', 'karma:unit:run' ],
        options: {
          livereload: false
        }
      }
    }
  };

  grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ) );

  /**
   * The development task. By running `serve` your project will be built,
   * opened in the browser with help from the connect-server
   * and watched for changes.
   */
  grunt.registerTask( 'serve', [ 'build', 'karma:unit', 'configureProxies:server', 'connect:livereload', 'watch' ] );

  /**
   * The default task is to build and compile. When build and compile is finished
   * the project opened in your browser served by the connect-server.
   */
  grunt.registerTask( 'default', [ 'build', 'compile', 'configureProxies:server', 'connect:dist:keepalive' ] );

  /**
   * The `deploy` task will do the same tasks as the default task, but will
   * not start a connect-server.
   */
  grunt.registerTask( 'deploy', [ 'build', 'compile' ] );

  /**
   * The `build` task gets your app ready to run for development and testing.
   */
  grunt.registerTask(
      'build',
        ['clean',
        'html2js',
        'jshint',
        'less:build',
        'copy:build_vendorcss',
        'postcss',
        'copy:build_app_assets',
        'copy:build_vendor_assets',
        //'copy:build_ng_file_upload_assets',
        'copy:build_ng_animate_font_assets',
        'copy:build_appjs',
        'copy:build_vendorjs',
        'index:build',
        'karmaconfig',
    'karma:continuous'
  ]);

  /**
   * The `compile` task gets your app ready for deployment by concatenating and
   * minifying your code.
   */
  grunt.registerTask( 'compile', [
    'concat:compile_css', 'cssmin:minify', 'copy:compile_assets', 'concat:compile_js', 'ngAnnotate', 'uglify', 'index:compile'
  ]);

  /**
   * A utility function to get all app JavaScript sources.
   */
  function filterForJS ( files ) {
    return files.filter( function ( file ) {
      return file.match( /\.js$/ );
    });
  }

  /**
   * A utility function to get all app CSS sources.
   */
  function filterForCSS ( files ) {
    return files.filter( function ( file ) {
      return file.match( /\.css$/ );
    });
  }

  /**
   * The index.html template includes the stylesheet and javascript sources
   * based on dynamic names calculated in this Gruntfile. This task assembles
   * the list into variables for the template to use and then runs the
   * compilation.
   */
  grunt.registerMultiTask( 'index', 'Process index.html template', function () {
    var dirRE = new RegExp( '^('+grunt.config('build_dir')+'|'+grunt.config('compile_dir')+')\/', 'g' );
    var jsFiles = filterForJS( this.filesSrc ).map( function ( file ) {
      return file.replace( dirRE, '' );
    });
    var cssFiles = filterForCSS( this.filesSrc ).map( function ( file ) {
      return file.replace( dirRE, '' );
    });

    grunt.file.copy('src/index.html', this.data.dir + '/index.html', {
      process: function ( contents, path ) {
        return grunt.template.process( contents, {
          data: {
            scripts: jsFiles,
            styles: cssFiles,
            version: grunt.config( 'pkg.version' )
          }
        });
      }
    });
  });

  /**
   * In order to avoid having to specify manually the files needed for karma to
   * run, we use grunt to manage the list for us. The `karma/*` files are
   * compiled as grunt templates for use by Karma. Yay!
   */
  grunt.registerMultiTask( 'karmaconfig', 'Process karma config templates', function () {
    var jsFiles = filterForJS( this.filesSrc );

    grunt.file.copy( 'karma/karma-unit.tpl.js', grunt.config( 'build_dir' ) + '/karma-unit.js', {
      process: function ( contents, path ) {
        return grunt.template.process( contents, {
          data: {
            scripts: jsFiles
          }
        });
      }
    });
  });

};
