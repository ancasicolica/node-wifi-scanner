/**
 * Grunt file for node-wifi-scanner
 *
 * Create a new bugfix version (x.y.++):
 *   grunt v:patch
 *
 * Create a new feature version (x.++.0)
 *   grunt v:minor
 *
 * Create a new major version (++.0.0)
 *   grunt v:major
 *
 * Created by kc on 06.04.16
 */

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'New version added v%VERSION%',
        commitFiles: ['-a'],
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'git@github.com:ancasicolica/ZigBeeSiteSurvey.git',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: false,
        regExp: false
      }
    },

    zip: {
      'make': {
        src: ['./**/**'],
        dest: '../ZigBeeSiteSurvey_x.y.z_OS_.zip',
        compression: 'DEFLATE'
      }
    },

    compress: {
      main: {
        options: {
          archive: 'dist/ZigBeeSiteSurvey-' + grunt.file.readJSON('package.json').version + '-Win-x64.zip'
        },
        files: [{
          src: ['*.js', 'LICENSE', '*.json', 'node.exe', '*.md', 'lib/**', 'node_modules/**', 'public/**', 'routes/**', 'views/**'],
          dest: 'ZigBeeSiteSurvey-' + grunt.file.readJSON('package.json').version + '-Win-x64'
        }]
      }
    }
  });


  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-zip');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.registerTask('minify', ['concat', 'uglify:js']);
  grunt.registerTask('v:patch', ['bump:patch']);
  grunt.registerTask('v:minor', ['bump:minor']);
  grunt.registerTask('v:major', ['bump:major']);
  grunt.registerTask('make', ['zip:make']);
};
