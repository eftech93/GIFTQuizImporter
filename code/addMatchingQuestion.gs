function addMatchingQuestion(question) {
     var giftTitle = (question.title ? question.title: "");
     var stemText = stripHTML(question.stem.text);
      var item = form.addGridItem();
      var rows = [], cols = [];
      var choiceString = "";
      // collect rows and columns
      for (var j = 0; j < question.matchPairs.length; j++) {
        var pair = question.matchPairs[j];
        if (pair.subquestion.text != "") rows.push(stripHTML(pair.subquestion.text));
        add(cols, pair.subanswer); // apps script has no Set implementation
        choiceString += stripHTML(pair.subquestion.text) + " -> " + pair.subanswer + ", \n";
      }
      item.setTitle(stemText)
        .setRows(rows)
        .setColumns(cols);
      item.setHelpText("Note: this MATCHING question did not completely import from GIFT because Google's API doesn't allow creating the Answer Key (or setting the points). You can do it manually by matching the following answers:\n" + choiceString);
      // item.setPoints(1);     // not supported by Google (yet?)
      return item;
}
