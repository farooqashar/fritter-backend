
/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

function updateCredibilityCredits(fields) {
  switch (true) {
    case fields.score >= 1 <= 10: {
      fields.verifiedColor = 'orange';
      break;
    }

    case fields.score >= 11 <= 20: {
      fields.verifiedColor = 'yellow';
      break;
    }

    case fields.score >= 21: {
      fields.verifiedColor = 'green';
      break;
    }

    default: {
      fields.verifiedColor = 'black';
      break;
    }
  }

  fetch('/api/users/credibilitycredits', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function getUserCredibility(fields) {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  fetch(`/api/users/credibilitycredits?userId=${fields.userId}`)
    .then(showResponse)
    .catch(showResponse);
}
