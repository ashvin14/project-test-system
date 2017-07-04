app.controller('analyticsController', function($scope, $routeParams, apiservice) {
    $scope.data = []
    $scope.labels = []
    this.loggout = function() {
        apiservice.loggout().then(function(response) {
            window.location = "#/"
        })
    }
    apiservice.getTestAndScores($routeParams.test_id).then(function(response) {
        var index = 1;
        $scope.datasetOverride = [{ yAxisID: 'y-axis-2' }];
        if(response.data.notLoggedIn == true)
          window.location ="#/"
        
        if(response.data.length ==0)
          window.location="#/"
        $scope.testName = response.data.test.testName
        $scope.options = {
            responsive: true,
            maintainAspectRatio: true,
            scales: {

                yAxes: [{
                    ticks: {
                        max: response.data.test.total_score || 20,
                        min: 0,
                        stepSize: (response.data.total_score)/10
                    },
                    id: 'y-axis-2',
                    type: 'linear',
                    display: true,
                    position: 'left'
                }]
            }
        };


        response.data.scores.forEach(function(score) {

            $scope.data.push(score.score)
            $scope.labels.push("attempt " + index++)
        })


        /*
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right'
        }
      ]
    }
  };




    */
    })

})
