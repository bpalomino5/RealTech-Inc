/* eslint-disable no-undef */
// function search(query, cb) {
//   return fetch(`api/food?q=${query}`, {
//     accept: "application/json"
//   })
//     .then(checkStatus)
//     .then(parseJSON)
//     .then(cb);
// }

function getRecipeByID(id){
  return fetch(`/getRecipeByID?id=${encodeURIComponent(id)}`, {
    accept: 'application/json'
  })
    .then(checkStatus)
    .then(parseJSON);
}

function getRecipes(){
  return fetch('/getRecipes', {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const Client = { getRecipes, getRecipeByID };
export default Client;