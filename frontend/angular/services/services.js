app.service('apiservice',function($http){
	this.postLoginDetails = function(data){
		return $http({
			method:'POST',
			data:data,
			url:'./userAuth/login'
		})

	}
	this.postSignupDetails = function(data){
		return $http({
			method:'POST',
			data:data,
			url:'./userAuth/signup'
		})

	}
	this.sendOTP = function(data){
		return $http({
			method:'POST',
			data:data,
			url:'./userAuth/forgotpassword'
		})
	}
	this.changePassword = function(data){
		return $http({
			method:'PUT',
			data:data,
			url:'./userAuth/changepassword'
		})
	}
	this.createTest = function(data){
		return $http({
			method:'POST',
			data:data,
			url:'./admin/create_test'
		})
	}
	this.addQuestion = function(data,id){
		return $http({
			method:'POST',
			data:data,
			url:'./admin/create_test/'+id
		})
	}
	this.getAllTest = function(){
		return $http({
			method:'GET',
			url:'./user/take_test'
		})
	}
	this.sendTestId = function(id){
		return $http({
			method:'GET',
			url:'./user/take_test/'+id
		})
	}
	this.sendAnswer = function(data){
		return $http({
			method:'POST',
			url:'./user/take_test/solution',
			data:data
		})
	}
	this.sendResults = function(data){
		return $http({
			method:'POST',
			url:'./user/scorecard',
			data:data
		})
	}
	this.getResults = function(id){
		return $http({
			method:'GET',
			url:'./user/scorecard/'+id

		})
	}
	this.getTestId = function(){
		return $http({
			method:'GET',
			url:'./user/'
		})
	}
	this.getTestFromId = function(id){
		return $http({
			method:'GET',
			url:'./user/'+id
		})
	}
	this.loggout = function(){
		return $http({
			method:'GET',
			url:'./userAuth/loggout'
		})
	}
	this.getTestAndScores = function(id){
		return $http({
			method:'GET',
			url:'./user/get/test/and/scores/'+id
		})
	}
	this.loggout = function(){
		return $http({
			method:'GET',
			url:'./userAuth/loggout'
		})
	}
	this.getAllProfiles = function(){
		return $http({
			method:'GET',
			url:'./admin/'
		})

	}
	this.getTestForAdminById = function(id){
		return $http({
			method:'GET',
			url:'./admin/'+id
		})
	}
	this.getTestFromIdForAdmin =function(id){
		return $http({
			method:'GET',
			url:'./admin/test/'+id,
			
		})
	}
	this.getTestAndScoresForAdmin = function(id,DATA){
		return $http({
			method:'post',
			url:'./admin/get/test/and/scores/'+id,
			data:DATA
		})
	}


})