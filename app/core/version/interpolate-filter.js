'use strict';

angular.module('myApp.version.interpolate-filter', [])

    .filter('interpolate', ['version', function (version) {
        return function (text) {
            console.log('TEXT:' . text);
            return String(text)
                .replace(/\%VERSION\%/mg, version)
        };

    }]);


