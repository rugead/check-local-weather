(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

jQuery(document).ready(function () {

    var celsius = 0;
    var fahrenheit = 0;
    var city = '';
    var icon = '';

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        var baseurl = 'https://api.wunderground.com/api/687fb2c5192b74a3/conditions/q/';
        var latitude = pos.coords.latitude;
        var longitude = pos.coords.longitude;
        var url = baseurl.concat(latitude, ',', longitude, '.json');

        jQuery.ajax({
            url: url,
            dataType: 'jsonp',
            success: function success(response) {
                console.log('response', response);
                fahrenheit = response.current_observation.temp_f;
                celsius = response.current_observation.temp_c;
                city = response.current_observation.display_location.full;
                icon = response.current_observation.icon;
                $('#wetterbild').attr("src", "https://icons.wxug.com/i/c/k/" + icon + ".gif");
                $("#temperatur").html(fahrenheit + " °F");
                $('#city').html(city);
            }
        });
    }

    function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
    }

    $("#celsius").click(function () {
        // °C = (°F - 32) * 5/9
        $("#temperatur").html(celsius + " °C");
    });

    $("#fahrenheit").click(function () {
        // °F = °C * 1,8 + 32
        $("#temperatur").html(fahrenheit + " °F");
    });

    navigator.geolocation.getCurrentPosition(success, error, options);
});

},{}]},{},[1])
//# sourceMappingURL=app.js.map
