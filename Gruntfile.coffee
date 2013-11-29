module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    concat:
      options:
        banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      basic:
        src: ['text-mix.js']
        dest: 'dist/<%= pkg.name %>.js'
      jqueryPlugin:
        src: ['text-mix.js', 'text-mix.jquery.js']
        dest: 'dist/jquery-<%= pkg.name %>.js'
    jshint:
      files: ['*.js']
    uglify:
      options:
        banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      dist:
        files:
          'dist/<%= pkg.name %>.min.js': ['<%= concat.basic.dest %>']
          'dist/jquery-<%= pkg.name %>.min.js': ['<%= concat.jqueryPlugin.dest %>']

  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-uglify'

  grunt.registerTask 'default', ['jshint', 'concat', 'uglify']
