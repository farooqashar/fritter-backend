
/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

function initHOF(fields) {
  fetch('/api/halloffame', {method: 'POST', body: '{}'})
    .then(showResponse)
    .catch(showResponse);
}

function toggleHOFFreets(fields) {
  fetch('/api/halloffame/freets', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function viewHallOfFameByUser(fields) {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  fetch(`/api/halloffame/freets?userId=${fields.userId}`)
    .then(showResponse)
    .catch(showResponse);
}
