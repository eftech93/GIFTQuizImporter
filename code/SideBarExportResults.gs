<!DOCTYPE html>
<!-- Code modified from : https://ctrlq.org/code/20039-google-picker-with-apps-script -->
<html>
<head>
  <base target="_top">
  <link rel="stylesheet" href="https://ssl.gstatic.com/docs/script/css/add-ons.css">
  <script type="text/javascript">
    var DIALOG_DIMENSIONS = {
        width: 600,
        height: 425
    };
    var pickerApiLoaded = false;
    var idFile = '';
    function onApiLoad() { 
        gapi.load('picker', {
            'callback': function() {
                pickerApiLoaded = true;
            }
        });
        google.script.run.withSuccessHandler(createPicker)
            .withFailureHandler(showError).getOAuthToken();
    }

    function createPicker(token) {
        if (pickerApiLoaded && token) {
            var docsView = new google.picker.DocsView()
                .setIncludeFolders(true)
                .setMimeTypes('application/vnd.google-apps.folder')
                .setSelectFolderEnabled(true);

            var picker = new google.picker.PickerBuilder()
                //.addView(docsView)
                .addView(google.picker.ViewId.SPREADSHEETS)
                .enableFeature(google.picker.Feature.NAV_HIDDEN)
                .hideTitleBar()
                .setSize(DIALOG_DIMENSIONS.width - 2, DIALOG_DIMENSIONS.height - 2)
                .setOAuthToken(token)
                .setCallback(pickerCallback)
                .setOrigin('https://docs.google.com')
                .build();

            picker.setVisible(true);

        } else {
            showError('Unable to load the file picker.');
        }
    }

    /**
     * A callback function that extracts the chosen document's metadata from the
     * response object. For details on the response object, see
     * https://developers.google.com/picker/docs/result
     *
     * @param {object} data The response object.
     */
    function pickerCallback(data) {
        var action = data[google.picker.Response.ACTION];
        if (action == google.picker.Action.PICKED) {
            var doc = data[google.picker.Response.DOCUMENTS][0];
            var id = doc[google.picker.Document.ID];
            // Show the ID of the Google Drive folder
            //document.getElementById('result').innerHTML = id;
            idFile = id;
            document.getElementById('config').style.display = "inline";
        } else if (action == google.picker.Action.CANCEL) {
            google.script.host.close();
        }
    }

    function showError(message) {
        document.getElementById('result').innerHTML = 'Error: ' + message;
    }
    function exportResults(){
       var columnName = document.getElementById('columns').value;
       if(idFile && idFile.length > 0 && columnName && columnName.length >0 ){
         google.script.run.withSuccessHandler(function(v , k){
            document.getElementById('config').style.display = "none";
            document.getElementById('result').innerHTML = v;
         })
         .withFailureHandler(function(v, k){
            document.getElementById('config').style.display = "none";
            document.getElementById('result').innerHTML = v;
         }).exportResultsTo(idFile, columnName);
       } 
    } 
    
    function getColumnsFromFile(){
        google.script.run.
            withSuccessHandler(function(result, e) {
                var dropdown = document.getElementById('columns');
                for(var i = 0; i < result.length; i++){
                  var newOption = document.createElement('option');
                  newOption.value = result[i];
                  newOption.innerHTML = result[i];
                  dropdown.appendChild(newOption);
                }
            }).withFailureHandler(function(err, element) {
                document.getElementById('result').innerHTML = element;
            }).withUserObject(this).getAllColumns(idFile);
    }
  </script>
</head>

<body>
    <div>
        <p id='result'></p>
    </div>
    <div id="config" style="display:none">
        <button onclick="getColumnsFromFile();">Get Columns From File</button><br>
        Select Colummn to Export
        <select id="columns">
        </select>
        <br>
        <!--Column name : <input id="column_name" type="text">-->
        <button onclick="exportResults();">Export</button>
    </div>
    <script type="text/javascript" src="https://apis.google.com/js/api.js?onload=onApiLoad"></script>
</body>
</html>
