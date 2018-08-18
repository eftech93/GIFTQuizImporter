function addDescriptionQuestion(question) {
   var giftTitle = (question.title ? question.title: "");
   var stemText = stripHTML(question.stem.text);
   var item = form.addSectionHeaderItem();
   item.setTitle(giftTitle);
   item.setHelpText(stemText);
   return item;
}
