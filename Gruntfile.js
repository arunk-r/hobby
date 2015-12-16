module.exports = function (grunt) {

// Project configuration.
    grunt.initConfig({
        serverFile: 'server.js',
        concurrent: {
            dev: {
                tasks: ['shell:nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        shell: {
            nodemon: {
                command: 'nodemon <%= serverFile %>',
                options: {
                    stdout: true,
                    stderr: true
                }
            }
        },
        watch: {
            serverJS: {
                files: ['server/**/*.js'],
                tasks: ['newer:jshint:server']
            }
        },
        jshint: {
            server: {
                options: {
                    jshintrc: '.jshintrc-server'
                },
                src: [
                    'schema/**/*.js',
                    'server/**/*.js'
                ]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-concurrent');
    
    grunt.registerTask('default', 'shell:nodemon');
};