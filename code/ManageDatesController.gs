function setUpDatesOfForm(startDate, closeDate) {
    try{
        addOpenCloseQuiz(startDate, closeDate);
        //addOpenCloseQuiz(parseDate_(startDate), parseDate_(closeDate));
        return "Dates Setted";
    } catch(err) {
       throw err;
    }
}