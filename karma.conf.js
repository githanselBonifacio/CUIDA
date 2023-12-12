module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-coverage'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            type: 'lcovonly',
            dir: 'coverage',
            subdir: '.',
            file: 'lcov.info'
        },
        client: {
            jasmine: {
                random: false
            }
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: true,
        restartOnFileChange: true
    });
};
