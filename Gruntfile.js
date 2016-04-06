/**
 * Grunt file for the ZigBeeSiteSurvey
 *
 * grunt update
 *    Updates the local common files with the ones from the editor project

 * Create a new bugfix version (x.y.++):
 *   grunt v:patch
 *
 * Create a new feature version (x.++.0)
 *   grunt v:minor
 *
 * Create a new major version (++.0.0)
 *   grunt v:major
 *
 * Created by kc on 27.06.15.
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
        push: false,
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: false,
        regExp: false
      }
    }
  });


  grunt.loadNpmTasks('grunt-bump');
  grunt.registerTask('v:patch', ['bump:patch']);
  grunt.registerTask('v:minor', ['bump:minor']);
  grunt.registerTask('v:major', ['bump:major']);
};
