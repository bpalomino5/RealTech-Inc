var axios = require('axios');

const url = "http://localhost:3000/";

axios.get(url)
	.then(response => console.log(response.data))
	.catch(error => console.log(error));