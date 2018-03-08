class DataStore {
	storeData(name,data) {
		localStorage.setItem(name,JSON.stringify(data));
	}

	getData(name){
		let data =  localStorage.getItem(name);
		return data != null ? JSON.parse(data) : null;
	}

	storeSessionData(name,data) {
		sessionStorage.setItem(name, JSON.stringify(data));
	}

	getSessionData(name) {
		let data = sessionStorage.getItem(name);
		return data != null ? JSON.parse(data) : null;
	}

	removeSessionData(name) {
		sessionStorage.removeItem(name);
	}
}

export default new DataStore();