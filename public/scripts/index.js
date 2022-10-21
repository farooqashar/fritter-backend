// Show an object on the screen.
function showObject(obj) {
  const pre = document.getElementById('response');
  const preParent = pre.parentElement;
  pre.innerText = JSON.stringify(obj, null, 4);
  preParent.classList.add('flashing');
  setTimeout(() => {
    preParent.classList.remove('flashing');
  }, 300);
}

function showResponse(response) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  response.json().then(data => {
    showObject({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      status: response.status,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      statusText: response.statusText
    });
  });
}

/**
 * IT IS UNLIKELY THAT YOU WILL WANT TO EDIT THE CODE ABOVE.
 * EDIT THE CODE BELOW TO SEND REQUESTS TO YOUR API.
 *
 * Native browser Fetch API documentation to fetch resources: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 */

// Map form (by id) to the function that should be called on submit
const formsAndHandlers = {
  'create-user': createUser,
  'delete-user': deleteUser,
  'change-username': changeUsername,
  'change-password': changePassword,
  'sign-in': signIn,
  'sign-out': signOut,
  'view-all-freets': viewAllFreets,
  'view-freets-by-author': viewFreetsByAuthor,
  'create-freet': createFreet,
  'edit-freet': editFreet,
  'delete-freet': deleteFreet,
  'create-example-freet': createExampleFreet,
  'delete-example-freet': deleteExampleFreet,
  'view-example-freets-by-author': viewExampleFreetsByAuthor,
  'add-user-relationship-status': createUserRelationship,
  'update-user-relationship-status': updateUserRelationship,
  'view-user-relationship-status': getUserRelationship,
  'add-user-enemies': createUserEnemies,
  'update-user-enemies': updateUserEnemies,
  'view-user-enemies': getUserEnemies,
  'init-hof': initHOF,
  'toggle-freets-hof': toggleHOFFreets,
  'view-user-hof': viewHallOfFameByUser,
  'update-user-credibility': updateCredibilityCredits,
  'view-credibility-credits': getUserCredibility,
  'add-user-following': createUserFollowing,
  'update-user-following': updateUserFollowing,
  'view-user-following': getUserFollowing,
  'update-personal-corporate': updateTimeline,
  'view-personal-corporate': getTimelineByUser
};

// Attach handlers to forms
function init() {
  Object.entries(formsAndHandlers).forEach(([formID, handler]) => {
    const form = document.getElementById(formID);
    form.onsubmit = e => {
      e.preventDefault();
      const formData = new FormData(form);
      handler(Object.fromEntries(formData.entries()));
      return false; // Don't reload page
    };
  });
}

// Attach handlers once DOM is ready
window.onload = init;
