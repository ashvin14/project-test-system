

var app = angular.module('myApp',['ngRoute','chart.js']);

app.controller('loginController',function(apiservice,$window){
	var main = this;
	this.postLoginDetails= function(){
		if (main.email == "" || main.password == "") {
            alert('please dont keep anything blank')
            return null;
        }
		var user = {
			email:main.email,
			password:main.password
		}
		apiservice.postLoginDetails(user).then(function(response){
			
			
			if(response.data.status == "user not found"){
				$(".banner").append("<p class='center-align'>*password or email is incorrect</p>")
				return null
			}
			if(response.data.user.type == 'admin'){
				$window.sessionStorage.user= response.data.user.name;
				window.location="#/admin"
			}
			else{
				$window.sessionStorage.user= response.data.user.name;
				window.location="#/user"
			}

			
		})


	}
	this.googleLogin = function(){
		$window.sessionStorage.user = "passport"
		apiservice.googleLogin().then(function(response){
			
		})
	}
	this.facebookLogin = function(){
		$window.sessionStorage.user = "passport"
		apiservice.facebookLogin().then(function(response){
			
		})
	}
	this.loggout = function(){
		apiservice.loggout().then(function(response){
			window.location="#/"
		})
	}

})