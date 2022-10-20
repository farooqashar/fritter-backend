
/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

//  function viewExampleFreetsByAuthor(fields) {
//     fetch(`/api/exampleFreets?author=${fields.author}`)
//       .then(showResponse)
//       .catch(showResponse);
//   }

function createUserRelationship(fields) {
  fetch('/api/users/relationships', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

//   Function deleteExampleFreet(fields) {
//     fetch(`/api/exampleFreets/${fields.id}`, {method: 'DELETE'})
//       .then(showResponse)
//       .catch(showResponse);
//   }
