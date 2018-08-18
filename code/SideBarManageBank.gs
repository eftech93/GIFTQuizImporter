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

        #banks {
            width: 140px;
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

        /*code from : https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_tabs*/

        /* Style the tab 
*/

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
            font-size: 18px;
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
    <div class="sidebar branding-below" >
        <div class="tab">
            <button id="button-modify" class="tablinks" onclick="openTab(event, 'modify')">Modify Bank</button>
            <button class="tablinks" onclick="openTab(event, 'new')">New Bank</button>
        </div>
        <div class="tabcontent" id="modify">
            <h4 class="h4-sample">My Banks</h4>
            <div class="add-sample">
                <select id="banks">
                </select>
                <button id="open-bank">Open Bank</button>
            </div>
            <textarea id="gift-code-modify" rows="4" cols="50" placeholder="gift code"></textarea>
            <button class="create" id="modify-bank">Update bank</button>
        </div>
        <div class="tabcontent" id="new" style="display: none">
            <form>
                <div class="block" id="button-bar">
                    <input id="bank-name" type="text" placeholder="Bank name" />
                    <br>
                    <textarea id="gift-code-create" rows="4" cols="50"></textarea>
                    <button class="create" id="create-bank">Create bank</button>
                </div>

            </form>
        </div>
    </div>

    <div class="sidebar bottom">
        <img alt="Add-on logo" class="logo" width="25" src="https://g-suite-documentation-images.firebaseapp.com/images/newFormNotificationsicon.png">
        <span class="gray branding-text">Gift Quiz Editor by Jonathan G.V.</span>
    </div>

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js">
    </script>
    <script>
        $(function() {
            google.script.run.
            withSuccessHandler(function(result, element) {
                var $dropdown = $("#banks");
                $.each(result, function(k, v) {
                    $dropdown.append($("<option />").val(v[1]).text(v[0].split("GQEBANK_")[1]));
                });
            }).withFailureHandler(function(err, element) {
                showError(err, true);
            }).withUserObject(this).searchBanks();

            $('#create-bank').click(function(event) {
                var name = $('#bank-name').val();
                if (typeof name !== "undefined" && name.trim().length > 0) {
                    name = name.trim();
                     var giftText = $('#gift-code-create').val();
                    try{
                        var output = giftParser.parse(giftText);
                        giftText = giftText.trim();
                        google.script.run.
                            withSuccessHandler(function(result, element) {
                            showMessage(result, false);
                            }).withFailureHandler(function(err, element) {
                            showError(err, false);
                            }).withUserObject(this).createBank(name, giftText);
                    }catch(err){
                        showError(err, false);
                    }
                } else {
                    showError("The name of the bank cannot be blank", false);
                }
            });
            
            $('#modify-bank').click(function(event) {
                var idx = $('#banks').find(":selected").val();
                if (typeof idx !== "undefined") {
                    var giftText = $('#gift-code-modify').val();
                    try{
                        var output = giftParser.parse(giftText);
                        giftText = giftText.trim();
                        google.script.run.
                            withSuccessHandler(function(result, element) {
                            showMessage(result, true);
                            }).withFailureHandler(function(err, element) {
                            showError(err, true);
                            }).withUserObject(this).modifieBank(idx, giftText);
                    }catch(err){
                        showError(err, true);
                    }
                } else {
                    showError("The bank's is cannot be blank", true);
                }
            });

            $('#open-bank').click(function(event) {
                var idx = $('#banks').find(":selected").val();
                google.script.run.
                withSuccessHandler(function(msg, element) {
                    $('#gift-code-modify').val(msg);
                }).
                withFailureHandler(function(err, element) {
                    showError(err, true);
                }).
                withUserObject(this).
                openBank(idx);
            });
        });

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
        
        function showError(msg, modify) {
            $('#error').remove();
            var div;
            if (msg == "Everything looks good!") {
                div = $('<div id="error" class="good-validation">' + msg + '</div>');
            } else if (typeof msg != 'object' && msg.substr(msg.length - 6) == "added.") {
                div = $('<div id="error" class="good-validation">' + msg + '</div>');
            } else {
                div = $('<div id="error" class="error">' + msg + '</div>');
            }
            if(modify){
                $("#modify-bank").before(div);
            }else if(!modify){ 
                $("#create-bank").before(div);
            }
       }
       
       function showMessage(msg, modify){
           $('#error').remove();
            var div = $('<div id="error" class="good-validation">' + msg + '</div>');
            if(modify){
                $("#modify-bank").before(div);
            }else if(!modify){ 
                $("#create-bank").before(div);
            }
       }
     
    </script>
    <?!= HtmlService.createHtmlOutputFromFile('parserGIFT').getContent(); ?>  
</body>

</html>