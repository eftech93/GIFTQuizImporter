function addMCQuestion(question) {
      var giftTitle = (question.title ? question.title : "");
      var stemText = stripHTML(question.stem.text);
      var item;
      if (question.choices[0].weight) {
        item = form.addCheckboxItem().setTitle(stemText);
      } else {
        item = form.addMultipleChoiceItem().setTitle(stemText);
      }
      item.setPoints(1);
      item.setHelpText("Note: this MULTIPLE CHOICE question is not completely compatible with Google's quizzes. Individual feedback items for each answer are not (yet?) supported by Google. Feedback is aggregated into only CORRECT and INCORRECT.");
      
      var choices = [];
      if (question.choices) {
        var feedbackPositive = "";
        var feedbackNegative = "";
        for (var j = 0; j < question.choices.length; j++) {
          //Workaround to have some accepted answer on checkbox
          if (question.choices[j].weight && parseInt(question.choices[j].weight) > 0) {
            question.choices[j].isCorrect = true;
          }
          
          var choice = item.createChoice(stripHTML(question.choices[j].text.text), question.choices[j].isCorrect);
          // Not supported by google
          //  if(question.choices[j].weight){
          //    choice.setPoints(question.choices[j].weight);
          //  }
          if (question.choices[j].feedback) {
            var fbMsg = "\n" + stripHTML(question.choices[j].text.text) + " (" + 
              (question.choices[j].isCorrect ? "correct" : "incorrect") + "): " + stripHTML(question.choices[j].feedback.text);
            if (question.choices[j].isCorrect) {
              feedbackPositive += fbMsg;
            } else {
              feedbackNegative += fbMsg;
            }
          }
          choices.push(choice);
        }
        item.setChoices(choices);
        //TODO set feedback
        // Workaround Google set feedback for correct and incorrect answer while GIFT is set per choice
        if (feedbackPositive) {
          var correctFeedback = FormApp.createFeedback()
          .setText(feedbackPositive)
          .build();
          item.setFeedbackForCorrect(correctFeedback);
        }
        if (feedbackNegative) {
          var incorrectFeedback = FormApp.createFeedback()
          .setText(feedbackNegative)
          .build();
          item.setFeedbackForIncorrect(incorrectFeedback);
        }
      } else {
        throw "Missing different choice for the question";
      }
      return item;
      
}