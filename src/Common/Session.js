import {
	AsyncStorage
} from 'react-native';

export function serializeKey(data) {
	var formBody = [];
	for (var property in data) {
	  var encodedKey = encodeURIComponent(property);
	  var encodedValue = encodeURIComponent(data[property]);
	  formBody.push(encodedKey + "=" + encodedValue);
	}
	formBody = formBody.join("&");
	return formBody;
}

export function getNameFromEmail(users, email) {
	let name = '';
	users.forEach((user) => {
		if (user.email === email || user.tag === email) {
		  name = user.name;
		}
	});

	return name;
}

export async function getLogin() {
	var session = await AsyncStorage.getItem("session_login");
	if (session != null)
		return session;
	return '';
}

export async function delLogin() {
	await AsyncStorage.removeItem("session_login");
}

export async function setSessionLogin(ticket) {
	AsyncStorage.setItem("session_login", ticket);
}

export async function getCariId() {
	var session = await AsyncStorage.getItem("session_cariid");
	if (session != null)
		return session;
	return "";
}

export async function getCariName() {
	var session = await AsyncStorage.getItem("session_cariname");
	if (session != null)
		return session;
	return "";
}

export async function setSessionCariId(id) {
	AsyncStorage.setItem("session_cariid", id);
}

export async function setSessionCariName(cari) {
	AsyncStorage.setItem("session_cariname", cari);
}


export async function delCariId() {
	await AsyncStorage.removeItem("session_cariid");
}

export async function delCariName() {
	await AsyncStorage.removeItem("session_cariname");
}
