/*
Code got and modified from : https://www.labnol.org/internet/schedule-google-forms/20707/
*/
function addOpenCloseQuiz(openDate, closeDate) {
    var documentProperties = PropertiesService.getDocumentProperties();
    try {
        deleteTriggers_();
    } catch (ee) {
        Logger.log("parseOpenCloseQuiz delete trigger error ");
    } 
    if (openDate !== undefined &&
        openDate.length > 0){
        var d = parseDate_(openDate);
        if(new Date() < d) {
            closeForm();
            ScriptApp.newTrigger("openForm")
                .timeBased()
                .at(D)
                .create();
            documentProperties.setProperty("openDate", openDate);
        } else {
            openForm();
            documentProperties.setProperty("openDate", "");
        }
    }else {
            openForm();
            documentProperties.setProperty("openDate", "");
        }
    if (closeDate !== undefined &&
        closeDate.length > 0) {
        ScriptApp.newTrigger("closeForm")
            .timeBased()
            .at(parseDate_(closeDate))
            .create();
        documentProperties.setProperty('closeDate', closeDate);
    } else {
        documentProperties.setProperty('closeDate', "");
    }
}

function deleteTriggers_() {
    var triggers = ScriptApp.getProjectTriggers();
    for (var i = 0; i < triggers.length; i++) {
        if (triggers[0] != null) {
            ScriptApp.deleteTrigger(triggers[0]);
            triggers.slice(0, 1);
        }
    }
}

function openForm() {
    var form = FormApp.getActiveForm();
    form.setAcceptingResponses(true);
}

function closeForm() {
    var form = FormApp.getActiveForm();
    form.setAcceptingResponses(false);
    deleteTriggers_();
}
//new Date(yyyy,MM,dd, HH,mm)
//our format : dd/MM/yyyy HH:mm
function parseDate_(d) {
  return new Date(d.substr(6,4), d.substr(3,2)-1, 
                  d.substr(0,2), d.substr(11,2), d.substr(14,2));
}