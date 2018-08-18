function addEssayQuestion(question) {
  var giftTitle = (question.title ? question.title : "");
  var stemText = stripHTML(question.stem.text);
  var item = form.addParagraphTextItem().setTitle(stemText);
  item.setPoints(1);
  return item;
}
