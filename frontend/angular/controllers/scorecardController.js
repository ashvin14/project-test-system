app.controller('scorecardController', function(apiservice, $routeParams) {
    var main = this;
    this.loggout= function(){
        apiservice.loggout().then(function(response){
            window.location ="#/"
        })
    }

    apiservice.getResults($routeParams.id).then(function(response) {
        
        if (response.data.notLoggedIn == true)
            window.location = "#/"
        main.result = response.data;
        main.time = response.data.score[response.data.score.length - 1].time_taken;
        main.minutes = Math.floor((main.time / (60)) % 61)
        main.seconds = Math.floor(main.time % 61);
        main.testName = response.data.test[0].testName;
        main.score =	response.data.score[response.data.score.length - 1].score

    })
})
