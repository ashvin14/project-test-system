app.controller('createTestController', function(apiservice, $window) {

    var main = this;
    this.createTest = function() {
        var data = {
            test_name: main.name,
            test_details: main.details,
            total_score: main.score,
            total_questions: main.questions,
            time: main.time
        }
        $window.sessionStorage.total_questions = main.questions;

        apiservice.createTest(data).then(function(response) {
            console.log(response)
            $window.location = "#/admin/create_test/" + response.data._id;
        })

    }
})
app.controller('createQuestionController', function(apiservice, $routeParams, $window) {
    var main = this;
    main.array = []
    var index = 0;

    this.addQuestion = function() {
        if (index < $window.sessionStorage.total_questions) {
        	if (main.tab == 1)
                main.correct_option = main.option1;
            if (main.tab == 2)
                main.correct_option = main.option2;
            if (main.tab == 3)
                main.correct_option = main.option3;
            if (main.tab == 4)
                main.correct_option = main.option4
            var data = {

                question: main.question,
                option_A: main.option1,
                option_B: main.option2,
                option_C: main.option3,
                option_D: main.option4,
                correct_option: main.correct_option
            }
            
            apiservice.addQuestion(data, $routeParams.id).then(function(response) {
                main.question = main.option1 = main.option2 = main.option3 = main.option4 = main.correct_option = main.question = ""
                index++;


            })



        }
        if (index == $window.sessionStorage.total_questions) {
            window.location = "#/admin"
        }

    }
})
