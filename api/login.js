import {
	fetch
} from "../utils/request.js"



export const authorizedLogin = (data) => {
	return fetch({
		url: 'auth/api/grant/login',
		method: 'POST',
		data: data
	})
}
