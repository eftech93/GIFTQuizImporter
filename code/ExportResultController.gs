var COLUMN_CODE_UNIVERSAL = 'Code Universel';
var COLUMN_COURRIEL = 'Courriel';

function exportResultsTo(idFile, columnName) {
  var ssFile = SpreadsheetApp.openById(idFile);
  // Get first sheet from file
  var sheet = ssFile.getSheets()[0];
  //get all values in the sheet
  var allInfo = sheet.getDataRange().getValues();
  var codes =[];
  var emails = [];
  var scores = {};
  var codeUniversalColumn = getCodeUnversalColumn(allInfo);
  var emailColumn = getEmailColumn(allInfo);
  var newColumn = getColumnBy(allInfo, columnName);
  if(emailColumn == -1){
     throw new Exception("The email column does not exist");
  }
  
  if(codeUniversalColumn == -1){
     throw new Exception("The universal code column does not exist");
  }
  
  if(newColumn == -1){
     throw new Exception("There's no column to export the results");
  }
  // we don't take the first row, we start from the fourth one
  // we suppose that the number of codes and the number of emails are the same
  for(x = 4, code = '', email = ''; x < allInfo.length; x++, code = undefined, email = undefined){
      code = allInfo[x][codeUniversalColumn];
      email = allInfo[x][emailColumn];
      if(code == null){
          throw new Exception("Le code dans la ligne " + (x + 1) + " est vide" );
      }
      
      if(email == null ){
          throw new Exception("L'email  dans la ligne " + (x + 1) + " est vide" );
      }
      codes.push(allInfo[x][codeUniversalColumn]);
      emails.push(allInfo[x][emailColumn]);
  }
  
  //var newColumn = getColumnNextEmpty(allInfo);
  
  var responses = FormApp.getActiveForm().getResponses();
  scores = getScores(responses);   
  scores = setPosition(scores, codes, emails);
  if(scores !== undefined){
    //Here we start exporting the results
    var l = numberToLetter(newColumn).toUpperCase();
    //We set the column name
    sheet.getRange(l+1).setValue(columnName);
    //Fill the cells (scores)
    for(var k in scores){
        var position = scores[k]['position'] ;
        var score = scores[k]['score'];
        sheet.getRange(l+position).setValue(score);
    }
    return "Export finished";
  }else{
    throw new Error("There are some emails without responses");
  }
}

function numberToLetter(num){
   return String.fromCharCode(97 + num);
}

function setPosition(scores, codes, emails){
    for(var k in scores){
        var emailName = k.split("@")[0];
        for(i = 0; i < codes.length; i++){
             var bCode = codes[i].indexOf(emailName) != -1; 
             var bEmail = (emails[i].split('@')[0]).indexOf(emailName) != -1;
             Logger.log(emailName + ' contains ' + codes[i] + ' : ' + bCode + ' or : ' + (emails[i].split('@')[0]) + ' : ' + bEmail );
             if(bCode || bEmail){
                 scores[k]['position'] = i+5;
                 break;
             }
        }
        if(scores[k]['position'] == -1){
           delete scores[k];
        }
    }
    if(Object.keys(scores).length == codes.length){
       return scores;
    }else{
      return undefined;
    }

}

function getScores(responses){
   var result = {};
   for(i = 0; i < responses.length; i++){
      var response = responses[i];
      var count = 0;
      var items = response.getGradableItemResponses();
      for(j = 0; j < items.length; j++){
          var item = items[j];
          count = count + item.getScore();
      }
      result[response.getRespondentEmail()] = {'score': count, 'position': -1};
   }
   return result;
}

function getColumnNextEmpty(allInfo){
   for(x = 0; ; x++){
      if(allInfo[0][x] == null){
         return parseInt(x, 10);
      }
   }
   return -1;
}

function getColumnBy(allInfo, str){
 for(x = 0; ; x++){
      if(allInfo[0][x].indexOf(str)!= -1){
         return parseInt(x, 10);
      }
   }
   return -1;
}

function getCodeUnversalColumn(allInfo){
  return getColumnBy(allInfo, COLUMN_CODE_UNIVERSAL);
}

function getEmailColumn(allInfo){
  return getColumnBy(allInfo, COLUMN_COURRIEL);
}

function getAllColumns(idFile){
  var ssFile = SpreadsheetApp.openById(idFile);
  var sheet = ssFile.getSheets()[0];
  var dataRange =  sheet.getDataRange();
  var allInfo = sheet.getDataRange().getValues();
  var elements = [];
   for(x = 0, element = undefined; x<dataRange.getLastColumn() ; x++){
      element = allInfo[0][x];
      if(element != null){
        elements.push(element);
      }
   }
   return elements;
}