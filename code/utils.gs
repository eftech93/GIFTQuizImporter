/*function verifyDateFromString(date) {
  return moment(date, "DD/MM/YYYY HH:mm", true).isValid();
}*/

function parseDateToString(date) {
  return moment(date).format("DD/MM/YYYY HH:mm");
}

function parseDateFromString(date){
  return moment(date, 'DD/MM/YYYY HH:mm').toDate();
}

function isDateAAfterDateB(A, B){
  var dateA = parseDateFromString(A);
  var dateB = parseDateFromString(B);
  return A<B;
}

function stripHTML(str) {
  return str.replace(/<(?:.|\n)*?>/gm, '');
}