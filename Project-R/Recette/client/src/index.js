import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "./semantic/dist/semantic.min.css";
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter } from 'react-router-dom';


// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>, document.getElementById('root'));
// registerServiceWorker();
