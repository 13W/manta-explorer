var path = require('path');

function shellLog(err, stdout, stderr, cb) {

	if (err) {
		console.log(stdout);
		console.log(stderr);
		console.log(err);
		throw new Error(err);
	}
}

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		shell: {
			npm_install: {
				command: [
					'cd app',
					'npm install'
				].join('&&'),

				options: {
					callback: shellLog
				}
			},
			pack_windows: {
				command: [
					'cd bin',
					'7z.exe a -r app.zip ..\\app\\* > zip.log',
					'copy /b nw.exe+app.zip app.exe',
					'del zip.log',
					'del app.zip',
					'move /Y app.exe ..\\output',
					'copy /Y *.dll ..\\output',
					'copy /Y *.pak ..\\output'
				].join('&&'),
				options: {
					callback: shellLog
				}
			},
			launch: {
				command: [
					'bin\\nw.exe app --config=config.json'
				].join('&&'),

				options: {
					callback: shellLog
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-shell');

	grunt.registerTask('default', ['shell:npm_install']);
	grunt.registerTask('run', ['shell:launch']);

	if (process.platform === 'win32') {
		grunt.registerTask('pack', ['shell:pack_windows']);
	}
};