app.controller('alltestloader', ['apiservice','$window',function(apiservice,$window) {
    var main = this;
    main.tests = []
    var i = 0
    

    apiservice.getAllTest().then(function(response) {
        if (response.data.notLoggedIn == true)
            window.location = "#/"
        
        main.tests = response.data;
       

    })
    this.loggout= function(){
        apiservice.loggout().then(function(response){
            window.location ="#/"
        })
    }
}])
app.directive('openModal',function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            
            //On click

            $(elem).click(function(e) {
              e.preventDefault()
               $('.modal'+attrs.openModal).modal();

            });

            //On interval
           
        }

    }
})