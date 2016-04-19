/* Autor: Luis Bahamonde */

angular.module('starter', ['ionic','angular-svg-round-progress','starter.config','ionic-ratings','ionic.service.core','ngStorage' , 'ngCordovaOauth', 'ngCordova' ,'starter.controllers','starter.factory','starter.services', 'jett.ionic.filter.bar', 'ion-gallery', 'jett.ionic.scroll.sista', 'ngIOS9UIWebViewPatch', 'ion-affix'])
.run(function($ionicPlatform,$rootScope,AuthService,$state,$timeout,$localStorage) {
    $ionicPlatform.ready(function() {  
    setTimeout(function () {
        navigator.splashscreen.hide();
    }, 1000);

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
       StatusBar.style(1);
    }

  });
    $rootScope.backsite = 'http://www.urilga.mn:1339';
    $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams, fromState, fromStateParams) {
      if(toState.name.indexOf('tab') !== -1 ) {
        if(!AuthService.getAuthStatus()) {
          event.preventDefault();
          $state.go('login',{},{reload:true});
        }
      } 
    })
})

.config(function($stateProvider, $urlRouterProvider ,$ionicFilterBarConfigProvider, $ionicConfigProvider) {

  $ionicFilterBarConfigProvider.theme('light');
  $ionicFilterBarConfigProvider.clear('ion-close');
  $ionicFilterBarConfigProvider.search('ion-search');
  $ionicFilterBarConfigProvider.backdrop(true);
  $ionicFilterBarConfigProvider.transition('vertical');
  $ionicFilterBarConfigProvider.placeholder('Search...');
  $ionicConfigProvider.backButton.previousTitleText(true);
  $ionicConfigProvider.backButton.text('');
    $stateProvider

    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/signin.html',
      controller: 'loginCtrl',
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller : 'signupCtrl',
    })
    .state('tab.questions', {
      url: '/questions',
      views: {
        'tab-questions': {
          templateUrl: 'templates/tab-questions.html',
          controller: 'QuestionsController'
        }
      }
    })
    .state('tab.article-detail', {
      url: '/article/:articleId',
      params: {data:null,articleId:null},
      views: {
        'tab-category': {
          templateUrl: 'templates/articleQuestion.html',
          controller: 'articleQuestionCtrl'
        }
      }
    })
    .state('tab.categories',{
      url:'/category',
      views: {
        'tab-category':{
          templateUrl: 'templates/tab-category.html',
          controller : 'CategoryController'
        }
      }
    })
    .state('tab.category-detail',{
      url:'/category/:categoryId',
      views: {
        'tab-category':{
          templateUrl: 'templates/category-detail.html',
          controller : 'CategoryDetailController'
        }
      }
    })
    .state('tab.tags', {
      url: '/tags',
      views: {
        'tab-tags': {
          templateUrl: 'templates/tab-tags.html',
          controller: 'TagsController'
        }
      }
    })
    .state('tab.favoritos', {
      url: '/favoritos',
      views: {
        'tab-favoritos': {
          templateUrl: 'templates/tab-love.html',
          controller: 'FavoritosController'
        }
      }
    })
    .state('tab.rank',{
      url:'/rank',
      views: {
        'tab-account':{
          templateUrl: 'templates/rank.html',
          controller: 'RankController'
        }
      }
    })
    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountController'
        }
      }
    })

    .state('tab.profile', {
      url: '/profile',
      views: {
        'tab-account': {
          templateUrl: 'templates/profile.html',
          controller: 'ProfileController'
        }
      }
    })
    ;

    $urlRouterProvider.otherwise(function($injector, $location){
      var $state = $injector.get("$state");
      $state.go('tab.questions');
    });

});
