app.controller('signupController',function(apiservice){
	var main = this;
	this.signupDetails = function(){
		if(main.password==undefined && main.email==undefined && main.phone_no==undefined && main.name==undefined ){
			alert('please do not keep empty fiels')
			return null
		} 
		var data ={
			email:main.email,
			name:main.name,
			password:main.password,
			phone_no:main.phone_no
		}
		apiservice.postSignupDetails(data).then(function(response){
			window.location="#/"
		})
	}
})