var ADDON_TITLE = 'Gift Question Importer';
var documentProperties = PropertiesService.getDocumentProperties();
var form = FormApp.getActiveForm(); 
var giftCode = "True or false?{T}";
 
/**   
 * Adds a custom menu to the active form to show the add-on sidebar.
 *
 * @param {object} e The event parameter for a simple onOpen trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode.
 */  
 
function onOpen(e) {
//  var authInfo = ScriptApp.getAuthorizationInfo(ScriptApp.AuthMode.FULL);
  form.setIsQuiz(true);

  FormApp.getUi()
  .createAddonMenu()
  .addItem('Import GIFT Questions', 'showSideBarImportQuestions')
  .addItem('Manage Dates', 'showSideBarManageDate')
  .addItem('Manage Bank Questions', 'showSideBarManageBank')
  .addItem('Export Results', 'showSideBarExportResults')
  .addItem('About', 'showAbout')
  .addToUi();
   
}

/**
 * Runs when the add-on is installed.
 *
 * @param {object} e The event parameter for a simple onInstall trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode. (In practice, onInstall triggers always
 *     run in AuthMode.FULL, but onOpen triggers may be AuthMode.LIMITED or
 *     AuthMode.NONE).
 */
function onInstall(e) {
  onOpen(e);
}
/**
 * Opens a sidebar in the form containing the add-on's user interface for
 * configuring the notifications this add-on will produce.
 */

function showSideBarImportQuestions() {
  FormApp.getUi().showSidebar(getSideBarImportQuestionsHTML());
}

function showSideBarManageBank(){
  FormApp.getUi().showSidebar(getSideBarManageBankHTML());
}

function showSideBarManageDate(){
  FormApp.getUi().showSidebar(getSideBarManageDatesHTML());
}

function showSideBarExportResults(){
  FormApp.getUi().showModalDialog(getSideBarExportResultsHTML(), 'Export Results');
}

function getSideBarManageBankHTML(){
  var html = HtmlService.createTemplateFromFile('SideBarManageBank');
  return html.evaluate().setTitle(ADDON_TITLE).setWidth(1200).setHeight(700);
} 

function getSideBarImportQuestionsHTML(){
  giftCode = documentProperties.getProperty(form.getId());
  if(!giftCode) {
    giftCode = "True or false?{T}";
  }
  var html = HtmlService.createTemplateFromFile('SideBarImportQuestions');
  html.giftCode = giftCode;
  return html.evaluate().setTitle(ADDON_TITLE);
}

function getSideBarManageDatesHTML(){
var html = HtmlService.createTemplateFromFile('SideBarManageDates');
  html.giftCode = giftCode;
  var openDate = documentProperties.getProperty("openDate");
  if(!openDate){
    openDate = "";
  }
  html.openDate = openDate;
  var closeDate = documentProperties.getProperty("closeDate");
  if(!closeDate){
    closeDate = "";
  }
  html.closeDate = closeDate;
  return html.evaluate().setTitle(ADDON_TITLE);
}

function showAbout() {
  var ui = HtmlService.createHtmlOutputFromFile('About')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setWidth(420)
      .setHeight(270);
  FormApp.getUi().showModalDialog(ui, 'About Gift Question Importer');
}

//Code modified from : https://ctrlq.org/code/20039-google-picker-with-apps-script

function showSideBarExportResults(){
   return HtmlService.createHtmlOutputFromFile('SideBarExportResults.html')
      .setWidth(600)
      .setHeight(425)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME); 
  //FormApp.getUi().showModalDialog(html, 'Export Results');
} 

function getOAuthToken() {
  DriveApp.getRootFolder();
  return ScriptApp.getOAuthToken();
}
