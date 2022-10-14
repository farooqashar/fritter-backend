/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

function viewExampleFreetsByAuthor(fields) {
  fetch(`/api/exampleFreets?author=${fields.author}`)
    .then(showResponse)
    .catch(showResponse);
}

function createExampleFreet(fields) {
  fetch('/api/exampleFreets', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function deleteExampleFreet(fields) {
  fetch(`/api/exampleFreets/${fields.id}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}
