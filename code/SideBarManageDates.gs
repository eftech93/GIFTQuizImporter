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
        <form>
            <div class="date options">
                Changes Dates <br> Open Date: <input type="text" id="openDate" placeholder="DD/MM/YYYY HH:mm" value="<?= openDate ?>"><br> Close Date <input type="text" id="closeDate" placeholder="DD/MM/YYYY HH:mm" value="<?= closeDate ?>"><br>
            </div>
            <div class="block" id="button-bar">
                <button class="create" id="add-date">Set Dates</button>
            </div>
        </form>
    </div>
    <div class="sidebar bottom">
        <img alt="Add-on logo" class="logo" width="25" src="https://g-suite-documentation-images.firebaseapp.com/images/newFormNotificationsicon.png">
        <span class="gray branding-text">Gift Quiz Editor by Jonathan G.V.</span>
    </div>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js">
    </script>
    <script>
        /**
         * On document load, assign required handlers to each element,
         * and attempt to load any saved settings.
         */
        $(function() {
            /* 
              Setting the event for choosing a question from bank
            */
            $('#add-date').click(function(event) {
                $('#error').remove();
                event.preventDefault();
                event.stopPropagation();
                if (verifyDates($('#openDate').val(), $('#closeDate').val())) {
                    google.script.run
                        .withSuccessHandler(function(msg) {
                            showMessage(msg);
                        })
                        .withFailureHandler(function(err) {
                            showError(err);
                        })
                        .withUserObject(this)
                        .setUpDatesOfForm($('#openDate').val(), $('#closeDate').val());
                }

            });
        });


        function verifyDates(openDateString, closeDateString) {
            if (openDateString !== "" && !verifyDateFromString(openDateString)) {
                showError("Wrong open date, please use the format DD/MM/YYYY HH:mm");
                return false;
            }
            if (closeDateString !== "" && !verifyDateFromString(closeDateString)) {
                showError("Wrong closing date, please use the format DD/MM/YYYY HH:mm");
                return false;
            }
            if (openDateString !== "" && closeDateString !== "") {
                var openDate = parseDateFromString(openDateString);
                var closeDate = parseDateFromString(closeDateString);
                if (closeDate < openDate) {
                    showError("Closing date cannot be before opening date");
                    return false;
                }
            }

            if (closeDateString !== "") {
                var closeDate = parseDateFromString(closeDateString);
                if (new Date() > closeDate) {
                    showError("Closing date must be bigger than now");
                    return false;
                }
            }
            return true;
        }

        function verifyDateFromString(date) {
            return moment(date, "DD/MM/YYYY HH:mm", true).isValid();
        }

        function parseDateFromString(date) {
            return moment(date, 'DD/MM/YYYY HH:mm').toDate();
        }

        function showError(msg) {
            $('#error').remove();
            var div = $('<div id="error" class="error">' + msg + '</div>');
            $("#add-date").before(div);
        }

        function showMessage(msg) {
            $('#error').remove();
            var div = $('<div id="error" class="good-validation">' + msg + '</div>');
            $("#add-date").before(div);
        }
    </script>

    <?!= HtmlService.createHtmlOutputFromFile('moments').getContent(); ?>
</body>

</html>