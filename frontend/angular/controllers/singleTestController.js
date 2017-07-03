app.controller('singleTestLoader', ['$window', 'socket', '$routeParams', 'apiservice','$scope' ,function($window, socket, $routeParams, apiservice,$scope) {
    var main = this;
    var length;
    var selectedOptions  = [];
    main.index = 0;
    var time1 = 0;
   $scope.$on('$destroy', function (event) {
        console.log('controller destroyed')
        socket.emit('disconnect socket');
       
    });
    /*if (!$window.sessionStorage.user)
        window.location = "#/"*/
    socket.on('time', function(time) {
        if (main.index < length) {

            main.minutes = Math.floor((time / (60)) % 61)
            main.seconds = Math.floor(time % 61);
            console.log(main.minutes + ':' + main.seconds)
            time1 = time;

        }


        if (main.index > length) {
            window.location="#/user/take_test/scorecard/"+$routeParams.id

        }



    })


    this.setOption = function(question_id) {
        console.log("index is " + main.index)
        if (main.index == length-1) {
            var data = {
                id: $routeParams.id,
                time: time1,
                solution:selectedOptions
            }
            console.log(data)
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
    socket.on('stop timer', function() {
        window.location = "#/user/take_test/scorecard/" + $routeParams.id

    })
    socket.emit('get question', $routeParams.id)
    socket.on('take question', function(data) {
        console.log(data)
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
