
/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

function updateTimeline(fields) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
  fields.personal = fields.personal.split(',');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  fields.corporate = fields.corporate.split(',');
  fetch('/api/timeline', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function getTimelineByUser(fields) {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  fetch(`/api/timeline?userId=${fields.userId}`)
    .then(showResponse)
    .catch(showResponse);
}
