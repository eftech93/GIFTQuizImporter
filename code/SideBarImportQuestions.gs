<!--
   * Copyright 2015 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   -->
<!DOCTYPE html>
<html>

<head>
    <base target="_top">
    <link rel="stylesheet" href="https://ssl.gstatic.com/docs/script/css/add-ons1.css">
    <!-- The CSS package above applies Google styling to buttons and other elements. -->
    <style>
        .branding-below {
         bottom: 54px;
         top: 0;
         }
         #error.good-validation {
         height: 20px;
         color: #008000;
         overflow-y: hidden;
         }
         #error {
         margin-bottom: 6px;
         height: 100px;
         overflow-x: hidden;
         overflow-y: scroll;
         }
         .branding-text {
         left: 7px;
         position: relative;
         top: 3px;
         }
         .logo {
         vertical-align: middle;
         }
         textarea {
         resize: vertical;
         width: 100%;
         height: 250px;
         margin-bottom: 6px;
         }
         .width-100 {
         width: 100%;
         box-sizing: border-box;
         -webkit-box-sizing: border-box;
         ‌ -moz-box-sizing: border-box;
         }
         .add-sample {
         margin-bottom: 6px;
         }
         .h4-sample {
         display: block;
         margin-bottom: 8px;
         margin-top: 2px;
         }
         #sample {
         width: 180px;
         }
         #add-sample {
         border-bottom: 2px;
         }
         label {
         font-weight: bold;
         }
         #creator-options,
         #respondent-options {
         background-color: #eee;
         border-color: #eee;
         border-width: 5px;
         border-style: solid;
         display: none;
         }
         #creator-email,
         #respondent-email,
         #button-bar,
         #submit-subject {
         margin-bottom: 10px;
         }
         #response-step {
         display: inline;
         }
         .tab {
         overflow: hidden;
         border: 1px solid #ccc;
         background-color: #f1f1f1;
         }
         /* Style the buttons inside the tab */
         .tab button {
         background-color: inherit;
         float: left;
         border: none;
         outline: none;
         cursor: pointer;
         transition: 0.3s;
         font-size: 20px;
         }
         /* Change background color of buttons on hover */
         .tab button:hover {
         background-color: #ddd;
         }
         /* Create an active/current tablink class */
         .tab button.active {
         background-color: #ccc;
         }
         /* Style the tab content */
         .tabcontent {
         padding-top: 25px;
         padding: 6px 12px;
         border: 1px solid #ccc;
         border-top: none;
         }
    </style>
</head>

<body>
    <div class="sidebar branding-below">
        <div class="tab">
            <button id="button-modify" class="tablinks" onclick="openTab(event, 'fromSimple')">Samples</button>
            <button class="tablinks" onclick="openTab(event, 'fromBank')">From Banks</button>
        </div>
        <div class="tabcontent" id="fromSimple">
            <h4 class="h4-sample">Add sample</h4>
            <div class="add-sample">
                <select id="sample">
                  <option value="TF">True or false</option>
                  <option value="TFF">True or false with feedback</option>
                  <option value="MC">Multiple choices</option>
                  <option value="MCMA">Multiple choices multiple good answer</option>
                  <option value="NMS">Numerical question with validation</option>
                  <option value="NM">Numerical question</option>
                  <option value="ES">Essay</option>
                  <option value="DESC">Description</option>
               </select>
                <button id="add-sample">Add</button><br>
            </div>

        </div>
        <div class="tabcontent" id="fromBank" style="display: none">
            <select id="my-banks">
                  <option value="">Select Bank</option>
               </select>
            <br>
            <select id="questions"></select>
            <button id="import-question">Import Question</button>
        </div>
        <form>
            <a href="" onclick="openInGitHubPages();">Open on full screen editor</a>
            <textarea id="gift-code" rows="4" cols="50"><?= giftCode ?></textarea>
            <div class="block" id="button-bar">
                <!--button class="action" id="validate-gift">Validate</button-->
                <button class="create" id="import-question" onclick="addQuestions();">Import Questions</button><br>
                <input type="checkbox" id="restart-form">Delete all existing elements<br>
                <!-- <button id="append-gift">Append</button> -->
            </div>
        </form>
    </div>
    <div class="sidebar bottom">
        <img alt="Add-on logo" class="logo" width="25" src="https://g-suite-documentation-images.firebaseapp.com/images/newFormNotificationsicon.png">
        <span class="gray branding-text">Gift Quiz Importer by Esteban J. Puello Fuentes</span>
    </div>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script>
        function openTab(evt, cityName) {
               var i, tabcontent, tablinks;
               tabcontent = document.getElementsByClassName("tabcontent");
               for (i = 0; i < tabcontent.length; i++) {
                   tabcontent[i].style.display = "none";
               }
               tablinks = document.getElementsByClassName("tablinks");
               for (i = 0; i < tablinks.length; i++) {
                   tablinks[i].className = tablinks[i].className.replace(" active", "");
               }
               document.getElementById(cityName).style.display = "block";
               evt.currentTarget.className += " active";
           }
            /**
             * On document load, assign required handlers to each element,
             * and attempt to load any saved settings.
             */
            $(function() {
             /*
             Setting the events for choosing the banks and updating the list of questions from each bank
             */
         
                google.script.run.
                    withSuccessHandler(function(msg, element){
                        var $dropdown = $("#my-banks");
                        $.each(msg, function(k, v) {
                              $dropdown.append($("<option />").val(v[1]).text(v[0].split("GQEBANK_")[1]));
                        });
                        $dropdown
                           .change(function () {
                           var idx = $('#my-banks').find(":selected").val();
                           $(".question-gift").each(function(){
                              $(this).remove();
                           });
                           if(idx !== ''){ 
                             google.script.run.
                                  withSuccessHandler(function(q, element){
                                        var $questions = $("#questions");
                                        $.each(q, function(k, v) {
                                               $questions.append($("<option />").val(v[1]).text(v[0]).attr('class','question-gift'));
                                        });
                                  }).
                                  withFailureHandler(function(msg_, element){
                                        showError(msg_);
                                  }).
                                  withUserObject(this).
                                  getQuestionsFromBank(idx);
                              }
                           });
                           
                    }).
                    withFailureHandler(function(msg, element){
                    }).
                    withUserObject(this).
                    searchBanks();
                    
          /* 
            Setting the event for choosing a question from bank
          */
          
                $('#add-sample').click(function(event) {
                    var e = document.getElementById("sample");
                    var option = e.options[e.selectedIndex].value;
                    var result = getSimpleText(option);
                    if(typeof result == 'string'){
                       $('#gift-code').val($('#gift-code').val() + "\n" + result);
                    }else{
                       showError(result.message); 
                    }
                });
            });
            
            function addQuestions(){
              try{
                  $('#error').remove();
                  var giftText = $('#gift-code').val();
                  var output = giftParser.parse(giftText);
                  google.script.run
                  .withSuccessHandler(function(msg) {
                    var div = $('<div id="error" class="good-validation">'+msg+'</div>');
                    $("#gift-code").after(div);       
                    })
                  .withFailureHandler(function(err) {
                    var div = $('<div id="error" class="error">' + err + '</div>');
                    $("#gift-code").after(div); 
                   })
                   .withUserObject(this)
                   .addQuestionsToForm(output, $('#restart-form').is(":checked"));
                }catch(err){
                  showError(err);
                }
            }
            
            function openInGitHubPages(){
              window.open('https://tebo93.github.io/GIFTEditor/?text='+encodeURIComponent($('#gift-code').val()));
            }
            
            function showError(msg) {
                if (msg == "Everything looks good!") {
                    var div = $('<div id="error" class="good-validation">' + msg + '</div>');
                    $("#gift-code").after(div);
                } else if (typeof msg != 'object' && msg.substr(msg.length - 6) == "added.") {
                    var div = $('<div id="error" class="good-validation">' + msg + '</div>');
                    $("#gift-code").after(div);
                } else {
                    var div = $('<div id="error" class="error">' + msg + '</div>');
                    $("#gift-code").after(div);
                }
            }
            
            var typingTimer;
            var doneTypingInterval = 500;
            
            $('#gift-code').keyup(function() {
                clearTimeout(typingTimer);
                if ($('#gift-code').val()) {
                    typingTimer = setTimeout(doneTyping, doneTypingInterval);
                }
            });
            
            function doneTyping() {
                $('#error').remove();
                try{
                    var giftText = $('#gift-code').val();
                    var output = giftParser.parse(giftText);
                    $('#import-question').prop('enabled', true);
                    showMessage("Good!");
                }catch(e){
                    $('#import-question').prop('enabled', false);
                    showError(e.message);
                }
            }
            
            function getSimpleText(option) {
                if (option == 'TF') {
                    return "The sun rises in the east.{T}\n";
                } else if (option == 'TFF') {
                    return "//True or false with feedback\n Grant is buried in Grant's tomb.{FALSE#wrong answer feedback#right answer feedback}\n";
                } else if (option == 'MC') {
                    return "// multiple choice with specific feedback\n::Q2:: What's between orange and green in the spectrum?\n{=yellow # correct! ~red # wrong, it's yellow ~blue # wrong, it's yellow}\n";
                } else if (option == 'MCMA') {
                    return "// multiple choice with multiple good answer (checkbox)\nWhat two people are entombed in Grant's tomb? {\n~%-100%No one\n~%50%Grant # yup its good\n~%50%Grant's wife\n ~%-100%Grant's father\n}\n";
                } else if (option == 'NMS') {
                    return "// question: 229196  name: Test Numerical\n::Test Numerical::Whats two plus 4?{#\n=%100%6:0#Good job its really 6!\n}\n\n";
                 } else if (option == 'NM') {
                    return "//Custom Validation not yet supported\nWhat is the value of pi (to 3 decimal places)? {#3.1415:0.0005}.\n";
                } else if (option == 'ES') {
                    return "Write a short biography of Dag Hammarskjöld. {}\n";
                } else if (option == 'DESC') {
                    return "You can use your pencil and paper for these next math questions.\n";
                } else {
                    return new Error("Demo option not availables");
                }
            }
            
            function showMessage(msg){
                 $('#error').remove();
                 var div = $('<div id="error" class="good-validation">' + msg + '</div>');
                 $("#gift-code").after(div);
             }
             
             function verifyOptions(openDateString, closeDateString){
                  if(openDateString !== "" && !verifyDateFromString(openDateString)){
                        showError( "Wrong open date, please use the format DD/MM/YYYY HH:mm");
                        return false;
                  }
                  if(closeDateString !== "" && !verifyDateFromString(closeDateString)){
                        showError(); "Wrong closing date, please use the format DD/MM/YYYY HH:mm";
                        return false;
                  }
                  if(openDateString !== "" && closeDateString !== ""){
                         var openDate = parseDateFromString(openDateString);
                         var closeDate = parseDateFromString(closeDateString);
                         if(closeDate < openDate){
                            showError( "Closing date cannot be before opening date"); 
                            return false;
                         }else{
                         
                         }
                   }
                   if(closeDateString !== ""){
                         var closeDate = parseDateFromString(closeDateString);
                           if(new Date() > closeDate){
                                showError( "Closing date must be bigger than now"); 
                                return false;
                           }
                   }
                   return true;
             }
       
    </script>
    <?!= HtmlService.createHtmlOutputFromFile('parserGIFT').getContent(); ?>  
</body>

</html>