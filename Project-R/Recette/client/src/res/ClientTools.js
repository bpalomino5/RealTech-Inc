/* eslint-disable no-undef */
class ClientTools{
  rawPostRequest(call, data){
    return fetch(call, {
     method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(this.checkStatus)
    .then(this.parseJSON);
  }

  login(data){
    return this.rawPostRequest('/login',data);   
  }

  getRecipes(){
    return fetch('/getRecipes', {
      accept: "application/json"
    })
    .then(this.checkStatus)
    .then(this.parseJSON);
  }

  getRecipeByID(id){
    return fetch(`/getRecipeByID?id=${encodeURIComponent(id)}`, {
      accept: 'application/json'
    })
    .then(this.checkStatus)
    .then(this.parseJSON);
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
  }

  parseJSON(response) {
    return response.json();
  }
}


export default new ClientTools();