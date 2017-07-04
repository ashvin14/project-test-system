app.controller('adminController',function(apiservice){
	var main  = this;
	this.loggout = function() {
        apiservice.loggout().then(function(response) {
            window.location = "#/"
        })
    }
	apiservice.getAllProfiles().then(function(response){
		if(response.data.notLoggedIn == true){
			window.location="#/"
		}
		console.log(response.data)
		main.profiles = response.data;
	})
})