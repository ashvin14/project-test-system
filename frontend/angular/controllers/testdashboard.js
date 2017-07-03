app.controller('testdashboard', function(apiservice) {
    var main = this

    main.tests = [];
    apiservice.getTestId().then(function(result) {
    	console.log(result)
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

            apiservice.getTestFromId(id).then(function(test) {

                if (test.data[0] != undefined){
                	
                    main.tests.push(test.data[0])
                }
            })
        })
    })
})
