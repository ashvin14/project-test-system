app.factory('socket', function($rootScope) {
    console.log('socket  starting . . .')
    var socket = io.connect('http://localhost:8080/take_test');

    return {
        on: function(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                //console.log(args);
                $rootScope.$apply(function() {


                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        },
        removeAllListeners: function(eventName, callback) {
            socket.removeAllListeners(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        },
        socket:socket
    };


});
