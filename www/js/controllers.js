angular.module('starter.controllers', [])

.controller('QuestionsController', function($scope,$ionicScrollDelegate,$localStorage,$timeout,QuizAPI,$ionicScrollDelegate) {
    // $scope.navTitle='<img class="title-image" style="height: 27px;margin-top: 8px;" src="img/logoiclubs.png" />';
    $scope.navTitle = 'Quiz';
    $scope.doRefresh = function() {
       QuizAPI.getQuestions().then(function(response){
        $scope.questions = [];
        angular.forEach(response,function(data,index){
          var mydata = {};
          mydata.user = $localStorage.userdata.id;
          mydata.question = data.id;
          QuizAPI.getQuestionResult(mydata).then(function(result){
            console.log(result);
            if(result.length > 0){
              data.checked = true;
              if(result[0].answer.answer_isTrue == true){
               data.rightResult = result[0].answer;
             }
             else {
               angular.forEach(data.question_answers,function(answersResult){
                if(answersResult.answer_isTrue == true){
                  data.rightResult = answersResult;
                }
              })
               data.wrongResult = result[0].answer;
             }
           }
         })
          $scope.questions.push(data);
        })
      });
      $scope.$broadcast('scroll.refreshComplete');
    };
    $scope.doRefresh();
    $scope.check = function(answer,question,index){
      var mydata = {};
      mydata.user = $localStorage.userdata.id;
      mydata.question = question;
      mydata.answer = answer;
      QuizAPI.questionResult(mydata).then(function(data){
        $scope.doRefresh();
      })
    }
   $scope.mode = 2;
   $scope.modeChange = function(){
      if($scope.mode == 1){
        $scope.mode = 2;
      }
      else if($scope.mode == 2){
        $scope.mode = 1;
      }
      $ionicScrollDelegate.scrollTop();
   }
})

.controller('articleQuestionCtrl',function($scope,$localStorage,$stateParams,QuizAPI){
  $scope.articleInfo = $stateParams.data;
    $scope.doRefresh = function(){
      QuizAPI.getQuestionByArticle($stateParams.articleId).then(function(data){
        $scope.articleQuestions = [];
        angular.forEach(data,function(data,index){
          var mydata = {};
          mydata.user = $localStorage.userdata.id;
          mydata.question = data.id;
          QuizAPI.getQuestionResult(mydata).then(function(result){
            if(result.length > 0){
              data.checked = true;
              if(result[0].answer.answer_isTrue == true){
               data.rightResult = result[0].answer;
             }
             else {
               angular.forEach(data.question_answers,function(answersResult){
                if(answersResult.answer_isTrue == true){
                  data.rightResult = answersResult;
                }
              })
               data.wrongResult = result[0].answer;
             }
           }
         })
          $scope.articleQuestions.push(data);
        })
      })
      $scope.$broadcast('scroll.refreshComplete');
    }
    $scope.doRefresh();
    $scope.check = function(answer,question,index){
      var mydata = {};
      mydata.user = $localStorage.userdata.id;
      mydata.question = question;
      mydata.answer = answer;
      QuizAPI.questionResult(mydata).then(function(data){
        $scope.doRefresh();
      })
    }

})

.controller('CategoryDetailController', function($scope,QuizAPI,$stateParams,$state) {
  $scope.doRefresh = function(){
     QuizAPI.getCategoryDetail($stateParams.categoryId).then(function(data){
      $scope.categoryDetail = data;
    });
     $scope.$broadcast('scroll.refreshComplete');
  }
  $scope.doRefresh();
  $scope.goDetail = function(data){
    $state.go('tab.article-detail',{data:data,articleId:data.id},{reload:true});
  }
})

.controller('RankController', function($scope,QuizAPI,$stateParams) {
   $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = true;
    });
      $scope.items = [
            {text:'English',src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_001.jpg'},
            {text:'Information system',src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_002.jpg'},
            {text:'History',src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_003.jpg'},
            {text:'Web',src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_004.jpg'},
            {text:'Math',src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_005.jpg'},
            {text:'Economics',src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_006.jpg'},
            {text:'Life',src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_007.jpg'},
            {text:'Entertainment',src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_008.jpg'},
            {text:'English',src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_009.jpg'},
        ]
})
.controller('CategoryController',function($scope,QuizAPI,$state){
    QuizAPI.getCategories().then(function(data){
      $scope.categories = data;
    });
    $scope.goDetail = function(data){
      $state.go('app.category-detail',{categoryId:data.id},{reload:true});
    }
})
.controller('loginCtrl',function($scope,$ionicLoading,$cordovaOauth,$state,QuizAPI,$ionicPopup,$localStorage){

  $scope.login = function(data){
    QuizAPI.login(data).then(function(data){
      if(data.status == true){
        $localStorage.userdata = data.user;
        $state.go('tab.questions');
      }
      else {
        alert(data.message);
      }
    })
  }

  $scope.facebookSignIn = function(){
      $cordovaOauth.facebook("832500260195628",["email"]).then(function (result){
        console.log(result);
        $http.get("https://graph.facebook.com/v2.5/me",{params:{access_token: result.access_token,fields:"id,name,mobile_phone,gender,location,website,picture,relationship_status,email" }}).then(function(result){
          console.log(result);
        })
      },function(data){
        console.log(data);
      })
  }
})

.controller('ProfileController',function($scope,$state,$localStorage,QuizAPI){
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
  viewData.enableBack = true;
});
  QuizAPI.getUserInfo($localStorage.userdata.id).then(function(data){
    $scope.profileInfo = data;
  })
})

.controller('signupCtrl',function($scope,QuizAPI,$localStorage,$state,$ionicPopup,$ionicLoading){
$scope.$on('$ionicView.beforeEnter', function (event, viewData) {
  viewData.enableBack = true;
});
  $scope.register = function(data){
    if(!data || !data.email || !data.name || !data.password){
        alert('Talbariig guitsed buglunu uu');
    }
    else {
      QuizAPI.register(data).then(function(response){
        if(!response.status){
          var logindata = {};
          logindata.email = data.email;
          logindata.password = data.password;
          QuizAPI.login(logindata).then(function(response){
            if(response.status == true){
              $localStorage.userdata = response.user;
              $state.go('tab.questions');
            }
            else {
              alert(response.message);
            }
          })
        }
        else {
          alert(response.error);
        }
      })
    }
  }

})
.controller('TagsController', function($scope,$ionicFilterBar) {
        //$scope.$on('$ionicView.enter', function(e) {
        //});
    $scope.router = function(){
      console.log('xaxa');
    }
        $scope.tags = [
        {name:'Music',color:getRandomColor()},
        {name:'Art',color:getRandomColor()},
        {name:'Trend',color:getRandomColor()},
        {name:'Award',color:getRandomColor()},
        {name:'Movie',color:getRandomColor()},
        {name:'Oscardwadwadwaawdawda',color:getRandomColor()},
        {name:'NBA',color:getRandomColor()},
        {name:'FIFA',color:getRandomColor()},
        {name:'Twitter',color:getRandomColor()},
        {name:'Facebook',color:getRandomColor()},
        {name:'ISIS',color:getRandomColor()},
        {name:'Crime',color:getRandomColor()}
        ]
        function getRandomColor() {
          var letters = '0123456789ABCDEF'.split('');
          var color = '#';
          for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          return color;
        }

        $scope.showFilterBar = function () {
            filterBarInstance = $ionicFilterBar.show({
                items: $scope.locales,
                update: function (filteredItems, filterText) {
                    $scope.locales = filteredItems;
                    if (filterText) {
                        console.log(filterText);
                    }
                },
                filterProperties: 'description'
            });
        };

})


.controller('FavoritosController', function($scope) {
      $scope.items = [
            {text:'English',src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_001.jpg'},
            {text:'Information system',src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_002.jpg'},
            {text:'History',src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_003.jpg'},
            {text:'Web',src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_004.jpg'},
            {text:'Math',src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_005.jpg'},
            {text:'Economics',src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_006.jpg'},
            {text:'Life',src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_007.jpg'},
            {text:'Entertainment',src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_008.jpg'},
            {text:'English',src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_009.jpg'},
        ]
  
})

.controller('AccountController', function($scope,QuizAPI,$window,$ionicLoading,$state,$ionicScrollDelegate,$timeout,$localStorage) {
  $scope.person = $localStorage.userdata;
  QuizAPI.getQuestionResultByUser($scope.person.id).then(function(data){
      $scope.results = data;
      $scope.rightResult = 0;
      $scope.wrongResult = 0;
      angular.forEach($scope.results,function(data){
          if(data.answer.answer_isTrue == true){
            $scope.rightResult++;
          }
          if(data.answer.answer_isTrue == false){
            $scope.wrongResult++;
          }
      })
  })

  $scope.goRank = function(){
    $state.go('tab.rank');
  }

  $scope.goInfo = function(){
    $state.go('tab.profile');
  }

  $scope.logout = function(){
    $ionicLoading.show({
      template: 'Loading...'
    });
      $timeout(function(){
          localStorage.clear();
          $state.transitionTo('login',{},{reload:true});
          $window.location.reload(true);
          $ionicLoading.hide();
      },1000);
  }
  $scope.onUserDetailContentScroll = onUserDetailContentScroll;
  
  function onUserDetailContentScroll(){
    var scrollDelegate = $ionicScrollDelegate.$getByHandle('userDetailContent');
    var scrollView = scrollDelegate.getScrollView();
    $scope.$broadcast('userDetailContent.scroll', scrollView);
  }
})
.directive('headerShrink', function($document) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      var resizeFactor, scrollFactor, blurFactor;
      var header = $document[0].body.querySelector('.about-header');
      $scope.$on('userDetailContent.scroll', function(event,scrollView) {
        if (scrollView.__scrollTop >= 0) {
          scrollFactor = scrollView.__scrollTop/3.5;
          header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, +' + scrollFactor + 'px, 0)';
        } else if (scrollView.__scrollTop > -50) {
          resizeFactor = -scrollView.__scrollTop/100 + 0.99;
          // blurFactor = -scrollView.__scrollTop/50;
          header.style[ionic.CSS.TRANSFORM] = 'scale('+resizeFactor+','+resizeFactor+')';
          // header.style.webkitFilter = 'blur('+blurFactor+'px)';
        }
      });
    }
  }
})
.directive('fallbackSrc', function () {
  var fallbackSrc = {
    link: function postLink(scope, iElement, iAttrs) {
      iElement.bind('error', function() {
        angular.element(this).attr("src", iAttrs.fallbackSrc);
      });
    }
  }
  return fallbackSrc;
})

;
