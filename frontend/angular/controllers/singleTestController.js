app.controller('singleTestLoader', ['$window', 'socket', '$routeParams', 'apiservice','$scope','$route' ,function($window, socket, $routeParams, apiservice,$scope,$route) {
    var main = this;
    var length;
    var selectedOptions  = [];
    main.index = 0;
    var time1 = 0;
    main.id =$routeParams.id
    
   $scope.$on('$destroy', function (event) {
        
        socket.emit('disconnect socket');
       
    });
    /*if (!$window.sessionStorage.user)
        window.location = "#/"*/
    socket.on('time', function(time) {
        if (main.index < length) {

            main.minutes = Math.floor((time / (60)) % 61)
            main.seconds = Math.floor(time % 61);
            
            time1 = time;

        }


        if (main.index > length) {
            window.location="#/user/take_test/scorecard/"+$routeParams.id

        }



    })


    this.setOption = function(question_id) {
       
        if (main.index == length-1) {
            var data = {
                id: $routeParams.id,
                time: time1,
                solution:selectedOptions
            }
            
            apiservice.sendResults(data).then(function(response) {
                window.location = "#/user/take_test/scorecard/" + $routeParams.id

            })

        }



        var solution = {
            test_id: $routeParams.id,
            question_id: question_id,
            solution: main.options
        }
        selectedOptions.push(solution)

        apiservice.sendAnswer(solution).then(function(response) {
            if (main.index < length)
                main.index++;

        })


    }
    this.loggout= function(){
        apiservice.loggout().then(function(response){
            window.location ="#/"
        })
    }
    socket.on('stop timer', function() {
        window.location = "#/user/take_test/scorecard/" + $routeParams.id

    })
    socket.emit('get question', $routeParams.id)
    socket.on('take question', function(data) {
       
        main.question = data
        length = data.length;
    })

    apiservice.sendTestId($routeParams.id).then(function(response) {
        if (main.index == length) {
            window.location = "#/user/take_test/scorecard/" + $routeParams.id;


        }

        if (response.data.notLoggedIn == true)
            window.location = "/#"
        socket.emit('timer started', $window.sessionStorage.user)


    })



}])
