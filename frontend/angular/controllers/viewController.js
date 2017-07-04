app.controller('viewController', function(apiservice, $routeParams,$window) {
    var main = this
    this.loggout = function() {
        apiservice.loggout().then(function(response) {
            window.location = "#/"
        })
    }
    $window.sessionStorage.user_id = $routeParams.id
    main.tests = [];
    apiservice.getTestForAdminById($routeParams.id).then(function(result) {
        if (result.data.notLoggedIn == true)
            window.location = "#/"

        console.log(result.data)

        function squash(arr) {
            var tmp = [];
            for (var i = 0; i < arr.length; i++) {
                if (tmp.indexOf(arr[i]) == -1) {
                    tmp.push(arr[i]);
                }
            }
            return tmp;
        }

        result.data = squash(result.data)


        result.data.forEach(function(id) {


            apiservice.getTestFromIdForAdmin(id).then(function(test) {
            	console.log(test)
                if (test.data[0] != undefined) {

                    main.tests.push(test.data[0])
                }
            })
        })

    })

})
