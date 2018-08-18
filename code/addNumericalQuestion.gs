function addNumericalQuestion(question) {
     var giftTitle = (question.title ? question.title: "");
     var stemText = stripHTML(question.stem.text);
     var item = form.addTextItem().setTitle(stemText);
      item.setHelpText("Note: this NUMERICAL question did not completely import from GIFT because it's not compatible with Google Quizzes (yet?).");
      item.setPoints(1);
      // 
      if (question.choices) {
        if (typeof question.choices == 'object') {
          if (question.choices.feedback) {
            var correctFeedback = FormApp.createFeedback()
            .setText(question.choices.feedback)
            .build();
            item.setFeedbackForCorrect(correctFeedback);
          }
        } else {
          throw "Missing different choice for the question";
        }
      }
    return item;
}