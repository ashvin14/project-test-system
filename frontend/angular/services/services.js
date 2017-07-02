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

})