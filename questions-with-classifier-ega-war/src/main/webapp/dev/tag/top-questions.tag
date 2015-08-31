/* Copyright IBM Corp. 2015 Licensed under the Apache License, Version 2.0 */

<top-questions>
    <div each={ question, i in questions } class="question">
        <div class="circle"> {i + 1} </div>
        <h4 class="top-question-text" onclick={ parent.askTopQuestion } id="top-question-{ i }">{ question.questionText }</h4>
    </div>

    <script>
    
    var action        = require("./action.js"),
        constants     = require("./constants.js"),
        self          = this;
    
    self.on("mount", function() {
        Dispatcher.trigger(action.GET_TOP_QUESTIONS);
        self.colorsNum = 5;
    });

    Dispatcher.on(action.TOP_QUESTIONS_BROADCAST, function(topQuestions) {
        self.questions = topQuestions;
        self.update();
    });

    askTopQuestion(e) {
        Dispatcher.trigger(action.ASK_QUESTION, {"message" : e.item.question.questionText, "referrer" : constants.topQuestionFeedbackType});
    }
    
    </script>
</top-questions>