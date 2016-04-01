angular.module('starter.services', [])

.service('QuizAPI', function(API_URL,$q,$http){

    this.login = function(data){
        var deferrred = $q.defer();
        $http.post(API_URL+'/login',data)
        .success(function(data){
            deferrred.resolve(data);
        })
        .error(function(data){
            deferrred.reject(data);
        })
        return deferrred.promise;
    };

    this.register = function(data){
        var deferrred = $q.defer();
        $http.post(API_URL+'/user',data)
        .success(function(data){
            deferrred.resolve(data);
        })
        .error(function(data){
            deferrred.reject(data);
        })
        return deferrred.promise;
    };

    this.getUserInfo = function(data){
        var deferrred = $q.defer();
        $http.get(API_URL+'/user/'+data)
        .success(function(data){
            deferrred.resolve(data);
        })
        .error(function(data){
            deferrred.reject(data);
        })
        return deferrred.promise;
    };

    this.getQuestions = function(){
        var deferrred = $q.defer();
        $http.get(API_URL+'/question')
        .success(function(data){
            deferrred.resolve(data);
        })
        .error(function(data){
            deferrred.reject(data);
        })
        return deferrred.promise;
    };

    this.getCategories = function(){
        var deferrred = $q.defer();
        $http.get(API_URL+'/category')
        .success(function(data){
            deferrred.resolve(data);
        })
        .error(function(data){
            deferrred.reject(data);
        })
        return deferrred.promise;
    };

    this.getCategoryDetail = function(data){
        var deferrred = $q.defer();
        $http.get(API_URL+'/category/'+data)
        .success(function(data){
            deferrred.resolve(data);
        })
        .error(function(data){
            deferrred.reject(data);
        })
        return deferrred.promise;
    };

    this.getArticleQuestions = function(data){
        var deferrred = $q.defer();
        $http.get(API_URL+'/article/'+data)
        .success(function(data){
            deferrred.resolve(data);
        })
        .error(function(data){
            deferrred.reject(data);
        })
        return deferrred.promise;
    };

    this.getQuestionByArticle = function(data){
        var deferrred = $q.defer();
        $http.get(API_URL+'/question?question_article='+data)
        .success(function(data){
            deferrred.resolve(data);
        })
        .error(function(data){
            deferrred.reject(data);
        })
        return deferrred.promise;
    };

    this.questionResult = function(data){
        var deferrred = $q.defer();
        $http.post(API_URL+'/questionresult',data)
        .success(function(data){
            deferrred.resolve(data);
        })
        .error(function(data){
            deferrred.reject(data);
        })
        return deferrred.promise;
    };

    this.getQuestionResult = function(data){
        var deferrred = $q.defer();
        $http.get(API_URL+'/questionresult?question='+data.question+'&user='+data.user)
        .success(function(data){
            deferrred.resolve(data);
        })
        .error(function(data){
            deferrred.reject(data);
        })
        return deferrred.promise;
    };

    this.getQuestionResultByUser = function(data){
        var deferrred = $q.defer();
        $http.get(API_URL+'/questionresult?user='+data)
        .success(function(data){
            deferrred.resolve(data);
        })
        .error(function(data){
            deferrred.reject(data);
        })
        return deferrred.promise;
    }

});