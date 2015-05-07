module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    concat:
      options:
        banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      basic:
        src: ['src/text-mix.js']
        dest: 'dist/<%= pkg.name %>.js'
      jqueryPlugin:
        src: ['src/text-mix.js', 'src/text-mix.jquery.js']
        dest: 'dist/jquery-<%= pkg.name %>.js'
      # copy the requirement into the demo directory.
      demo:
        options:
          banner: ''
        src: ['node_modules/levenshtein/lib/levenshtein.js']
        dest: 'demo/levenshtein.js'
    jshint:
      files: ['src/*.js', 'demo/app.js']
    uglify:
      options:
        banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      dist:
        files:
          'dist/<%= pkg.name %>.min.js': ['<%= concat.basic.dest %>']
          'dist/jquery-<%= pkg.name %>.min.js': ['<%= concat.jqueryPlugin.dest %>']
    simplemocha:
      test:
        src: ['tests/*.tests.js']
    watch:
      demo:
        files: ['index.html', 'demo/**/*']
        options:
          livereload: true
    connect:
      server:
        options:
          port: 8000
          livereload: true

  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-simple-mocha'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-connect'

  grunt.registerTask 'default', ['jshint', 'simplemocha', 'concat', 'uglify']
  grunt.registerTask 'build', ['concat', 'uglify']
  grunt.registerTask 'test', ['jshint', 'simplemocha']
  grunt.registerTask 'dev', ['connect', 'concat', 'watch']
  grunt.registerTask 'demo', ['concat:demo', 'dev']
