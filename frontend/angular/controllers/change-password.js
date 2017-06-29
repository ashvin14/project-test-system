app.controller('passController', function(apiservice, $window) {
    var main = this;
    this.changePassword = function() {
        if (main.password == undefined) {
            alert('dont put empty fields')
            return null;
        }
        var data = {
            password: main.password,
            email: $window.sessionStorage.email

        }
        apiservice.changePassword(data).then(function(response){
        	delete $window.sessionStorage.email;
        	window.location="#/"
        })

    }
})
