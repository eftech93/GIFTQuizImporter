function addTFQuestion(question) {
    var giftTitle = (question.title ? question.title: "");
    var stemText = stripHTML(question.stem.text);
    var item = form.addMultipleChoiceItem().setTitle(stemText);
      item.setPoints(1);
      item.setChoices([
        item.createChoice("True", question.isTrue),
        item.createChoice("False", !question.isTrue)
      ]);
      
      // Add feedback
      if (question.correctFeedback) {
        var correctFeedback = FormApp.createFeedback()
        .setText(stripHTML(question.correctFeedback.text))  // clear HTML formatting
        .build();
        item.setFeedbackForCorrect(correctFeedback);
      }
      if (question.incorrectFeedback && item) {
        var incorrectFeedback = FormApp.createFeedback()
        .setText(stripHTML(question.incorrectFeedback.text))
        .build();
        item.setFeedbackForIncorrect(incorrectFeedback);
      }
      return item;
}