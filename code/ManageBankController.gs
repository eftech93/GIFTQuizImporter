var prefix = "GQEBANK_";
var searchFor ='title contains "GQEBANK_"';

function createBank(name, questions) {
  var giftObj = verifyGIFT(name, true);
  if(giftObj.length !== "undefined" && name !== "undefined" && questions != "undefined"){ 
      try{
         var doc = DocumentApp.create(prefix + name); 
         doc.getBody().appendParagraph(questions);
         doc.saveAndClose();
         return "File created";
      }catch(err){
         throw "Error while creating the bank file on drive";
      }
  }else{
    throw "Error while parsing the gift questions";
  }
}

 
function searchBanks(){
  var result = new Array();
  var files = DriveApp.searchFiles('title contains "GQEBANK_"');
  while (files.hasNext()) {
      var file = files.next();
      result.push([file.getName(), file.getId()]);
  }
  return result;
}


function openBank(idx){
  var doc = DocumentApp.openById(idx);
  var result = doc.getBody().getText();
  return result;
}

function modifieBank(idx, questions){
  var doc = DocumentApp.openById(idx);
  doc.getBody().clear();
  doc.getBody().appendParagraph(questions);
  doc.saveAndClose();
  return "Done";
}