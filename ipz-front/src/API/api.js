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
			.then(response =>{ return response});
	},
	loginUser(userData){
		return instance.post(`/api/User/LoginUser`,  userData )
			.then(response => { return response});
	}
}

export const createEditEventAPI = {
	createEvent(eventData){
		return instance.post(`/api/Poster/PostPoster`,  eventData,{headers:{
			Authorization:`Bearer ${window.localStorage.getItem("token")}`//"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InZhZGljaGthIiwiZW1haWwiOiJ2YWRpY2hrYUBnbWFpbC5jb20iLCJuYmYiOjE2NTYxNTA4OTMsImV4cCI6MTY1Njc1NTY5MywiaWF0IjoxNjU2MTUwODkzfQ.8AgacekACEbFvvHAD5hwPtMqoBnGJmLhvAnWpneWUC4"`Bearer ${window.localStorage.getItem("token")}`
		}} )
			.then(response =>{return response});
	},

	getPosterData(uuid){
		return instance.get(`/api/Poster/GetPoster?guid=${uuid}`, {headers:{
			Authorization:`Bearer ${window.localStorage.getItem("token")}`//"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InZhZGljaGthIiwiZW1haWwiOiJ2YWRpY2hrYUBnbWFpbC5jb20iLCJuYmYiOjE2NTYxNTA4OTMsImV4cCI6MTY1Njc1NTY5MywiaWF0IjoxNjU2MTUwODkzfQ.8AgacekACEbFvvHAD5hwPtMqoBnGJmLhvAnWpneWUC4"//`${window.localStorage.getItem("login")} ${window.localStorage.getItem("token")}`
		}}).then(response => response.data);
	},

	editEvent(eventData, uuid){
		return instance.put(`/api/Poster/UpdatePoster?posterId=${uuid}`,  eventData, {headers:{
			Authorization:`Bearer ${window.localStorage.getItem("token")}`//"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InZhZGljaGthIiwiZW1haWwiOiJ2YWRpY2hrYUBnbWFpbC5jb20iLCJuYmYiOjE2NTYxNTA4OTMsImV4cCI6MTY1Njc1NTY5MywiaWF0IjoxNjU2MTUwODkzfQ.8AgacekACEbFvvHAD5hwPtMqoBnGJmLhvAnWpneWUC4"//`Bearer ${window.localStorage.getItem("token")}`
		}} )
			.then(response =>{return response});
	}
}

export const EventPageAPI = {
	getPosters(page){
		return instance.get(`/api/Poster/GetPostersPage?pageNum=${page}&posterCount=5`, {headers:{
			Authorization:`Bearer ${window.localStorage.getItem("token")}`//"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InZhZGljaGthIiwiZW1haWwiOiJ2YWRpY2hrYUBnbWFpbC5jb20iLCJuYmYiOjE2NTYxNTA4OTMsImV4cCI6MTY1Njc1NTY5MywiaWF0IjoxNjU2MTUwODkzfQ.8AgacekACEbFvvHAD5hwPtMqoBnGJmLhvAnWpneWUC4"//`${window.localStorage.getItem("login")} ${window.localStorage.getItem("token")}`
		}}).then(response => response.data);
	},
	getMyPosters(){
		return instance.get(`/api/Poster/GetMyPosters?isSorted=true&isDesc=true`, {headers:{
			Authorization:`Bearer ${window.localStorage.getItem("token")}`//"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InZhZGljaGthIiwiZW1haWwiOiJ2YWRpY2hrYUBnbWFpbC5jb20iLCJuYmYiOjE2NTYxNTA4OTMsImV4cCI6MTY1Njc1NTY5MywiaWF0IjoxNjU2MTUwODkzfQ.8AgacekACEbFvvHAD5hwPtMqoBnGJmLhvAnWpneWUC4"//`${window.localStorage.getItem("login")} ${window.localStorage.getItem("token")}`
		}}).then(response => response.data);
	},
	getPostersSearch(text){
		return instance.get(`/api/Poster/GetPostersSearch?searchingText=${text}`, {headers:{
			Authorization:`Bearer ${window.localStorage.getItem("token")}`//"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InZhZGljaGthIiwiZW1haWwiOiJ2YWRpY2hrYUBnbWFpbC5jb20iLCJuYmYiOjE2NTYxNTA4OTMsImV4cCI6MTY1Njc1NTY5MywiaWF0IjoxNjU2MTUwODkzfQ.8AgacekACEbFvvHAD5hwPtMqoBnGJmLhvAnWpneWUC4"//`${window.localStorage.getItem("login")} ${window.localStorage.getItem("token")}`
		}}).then(response => response.data);
	}
}