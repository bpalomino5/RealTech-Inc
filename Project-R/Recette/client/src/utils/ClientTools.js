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

  createUser(data){
    return this.rawPostRequest('/createUser',data);
  }

  addRecipe(data){
    return this.rawPostRequest('/addRecipe',data);
  }

  addIngredient(data){
    return this.rawPostRequest('/addIngredient', data);
  }

  addFavorite(data){
    return this.rawPostRequest('/addFavorite',data);
  }
  
  login(data){
    return this.rawPostRequest('/login',data);   
  }

  logout(data){
    return this.rawPostRequest('/logout',data);
  }

  getUserData(data){
    return this.rawPostRequest('/getUserData',data);
  }

  getPublicUserData(data){
    return this.rawPostRequest('/getPublicUserData',data);
  }

  addComment(data){
    return this.rawPostRequest('/addComment',data);
  }

  updateBio(data){
    return this.rawPostRequest('/updateBio',data);
  }

  getRecipesByIngredient(id){
    return fetch(`/getRecipesByIngredient?id=${encodeURIComponent(id)}`, {
      accept: "application/json"
    })
    .then(this.checkStatus)
    .then(this.parseJSON);
  }

  getRecipesByStyle(id){
    return fetch(`/getRecipesByStyle?id=${encodeURIComponent(id)}`, {
      accept: "application/json"
    })
    .then(this.checkStatus)
    .then(this.parseJSON);
  }

  getUnits(){
    return fetch('/getUnits', {
      accept: "application/json"
    })
      .then(this.checkStatus)
      .then(this.parseJSON);
  }

  getIngredients(){
    return fetch('/getIngredients', {
      accept: "application/json"
    })
      .then(this.checkStatus)
      .then(this.parseJSON);
  }

  getStyles(){
    return fetch('/getStyles', {
      accept: 'application/json'
    })
      .then(this.checkStatus)
      .then(this.parseJSON);
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

  getComments(recipe_id){
    return fetch(`/getComments?recipe_id=${encodeURIComponent(recipe_id)}`, {
      accept: 'application/json'
    })
      .then(this.checkStatus)
      .then(this.parseJSON)
  }

  getFavorites(user_id){
    return fetch(`/getFavorites?user_id=${encodeURIComponent(user_id)}`, {
      accept: 'application/json'
    })
      .then(this.checkStatus)
      .then(this.parseJSON)
  }

  getPreferences(user_id){
    return fetch(`/getPreferences?user_id=${encodeURIComponent(user_id)}`, {
      accept: 'application/json'
    })
      .then(this.checkStatus)
      .then(this.parseJSON)
  }


  getActivity(user_id){
    return fetch(`/getActivity?user_id=${encodeURIComponent(user_id)}`, {
      accept: 'application/json'
    })
      .then(this.checkStatus)
      .then(this.parseJSON)
  }

  getDataVersion(){
    return fetch('/getDataVersion',{
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