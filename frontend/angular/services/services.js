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

})