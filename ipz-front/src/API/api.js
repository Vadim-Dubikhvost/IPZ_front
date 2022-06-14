import axios from "axios";

const instance = axios.create({
	baseURL: 'https://localhost:5000/',
	headers: {
				"Content-Type": "application/json",
	},
});

export const authAPI = {
	registerUser(userData){
		return instance.post(`api/User/RegisterUser`,  userData )
			.then(response => response.data);
	}
}