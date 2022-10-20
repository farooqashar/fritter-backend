
/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

function createUserEnemies(fields) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
  fields.enemies = fields.enemies.split(',');
  fetch('/api/users/enemies', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function updateUserEnemies(fields) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
  fields.enemies = fields.enemies.split(',');
  fetch('/api/users/enemies', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function getUserEnemies(fields) {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  fetch(`/api/users/enemies?userId=${fields.userId}`)
    .then(showResponse)
    .catch(showResponse);
}
