function addShortQuestion(question) {
      var giftTitle = (question.title ? question.title: "");
      var stemText = stripHTML(question.stem.text);
      var item = form.addTextItem().setTitle(stemText);
      var choiceString = "";
      for (var i=0; i<question.choices.length; i++) { choiceString += question.choices[i].text.text + ', \n'; }
      item.setHelpText("Note: this SHORT ANSWER question did not completely import from GIFT because Google's API doesn't allow creating the accepted answers in the Answer Key. You can do it manually by adding the following answers:\n" + choiceString);
      item.setPoints(1);
      return item;
}
