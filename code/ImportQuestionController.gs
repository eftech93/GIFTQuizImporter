function removeAllElements() {
    var items = form.getItems();
    for (var i = items.length - 1; i >= 0; i--) {
        if (items[0] != null) {
            form.deleteItem(0);
        }
    }
}

function searchBanks() {
    var result = new Array();
    var files = DriveApp.searchFiles('title contains "GQEBANK_"');
    while (files.hasNext()) {
        var file = files.next();
        result.push([file.getName(), file.getId()]);
    }
    return result;
}

function getQuestionsFromBank(idx) {
    var bank = openBank(idx);
    var result = new Array();
    var gift = verifyGIFT(bank, false);
    for (var i = 0; i < gift.length; i++) {
        var question = gift[i];
        var title;
        question.title ? title = question.title + " - " + question.stem : title = question.stem
        var stringOfQuestion = getStringOfQuestion(bank, title);
        result.push([title, stringOfQuestion]);
    }
    return result;
}

function getStringOfQuestion(bank, title) {
    var idx = bank.indexOf(title);
    if (idx !== -1) {
        for (var i = idx; i < bank.length; i++) {
            if (bank.charAt(i) == '}') {
                return bank.substr(idx, i + 1 - idx);
            }
        }
    }
    return '';
}

function addQuestionsToForm(questions, removeAll) {
    Logger.log(JSON.stringify(questions));
    Logger.log(removeAll);
    if (questions !== undefined) {
        if (removeAll) {
            removeAllElements();
        }
        for (var i = 0; i < questions.length; i++) {
            try {
                var question = questions[i];
                switch (question.type) {
                    case 'Description':
                        addDescriptionQuestion(question);
                        break;
                    case 'TF':
                        addTFQuestion(question);
                        break;
                    case 'Essay':
                        addEssayQuestion(question);
                        break;
                    case 'MC':
                        addMCQuestion(question);
                        break;
                    case 'Numerical':
                        addNumericalQuestion(question);
                        break;
                    case 'Matching':
                        addMatchingQuestion(question);
                        break;
                    case 'Short':
                        addShortQuestion(question);
                        break;
                    default:
                        break;
                }

            } catch (err) {
                Logger.log("createElementsOnForm 10 " + err.message);
            }
        }
        return "Done";
    } else {
        return "Error";
    }
}
