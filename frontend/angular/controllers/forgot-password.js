app.controller('forgotController',function(apiservice,$window){
	var main = this;
	this.sendOTP = function(){
		var data ={
			email:main.email
		}
		apiservice.sendOTP(data).then(function(response){
			$window.sessionStorage.email= main.email; 
			$window.sessionStorage.otp = response.data.code
			
			window.location ="#/otpverification";
		})
	}

})
app.controller('otpController',function(apiservice,$window){
	var main = this;
	this.verifyOTP = function(){
		
		if(main.otp == $window.sessionStorage.otp){
			delete $window.sessionStorage.otp;
			window.location="#/change-password"
		}
		else{
			alert('you are not registered with our services please login')
		}
	}

})