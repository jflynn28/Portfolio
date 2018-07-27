'use strict';

var App = angular.module('myApp',['ngRoute']);

App.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl : function() {
                return "templates/homePage.html";
            }
        })
        .when("/info", {
            templateUrl : function() {
                return "templates/infoPage.html";
            }
        })
        .when("/snake", {
            templateUrl : function() {
                return "templates/snake.html";
            }
        })
        .when("/encryption", {
            templateUrl : function() {
                return "templates/encryption.html";
            }
        })
        .when("/ecmt", {
            templateUrl : function() {
                return "templates/ecmt.html";
            }
        });
});

$('document').ready(function() {
    var popOverSettings = {
        placement: 'right',
        selector: '.fa-question-circle',
        title:'Bulk Upload',
        trigger: "hover",
        content:'This is a popover'
    };
    $(this).popover(popOverSettings);
});