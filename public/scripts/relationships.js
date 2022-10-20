
/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

function createUserRelationship(fields) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
  fields.bestFriends = fields.bestFriends.split(',');
  fetch('/api/users/relationships', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function updateUserRelationship(fields) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
  fields.bestFriends = fields.bestFriends.split(',');
  fetch('/api/users/relationships', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function getUserRelationship(fields) {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  fetch(`/api/users/relationships?userId=${fields.userId}`)
    .then(showResponse)
    .catch(showResponse);
}
