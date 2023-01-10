import axios from 'axios';

export const baseUrl = 'https://bayut.p.rapidapi.com'

export const fetchApi = async (url) => {
	const {data} = await axios.get((url), {
		headers: {
    		'X-RapidAPI-Key': '5c1ab0d80cmsh979afc396ac44ccp1c5a4cjsn70db3fa89b86',
    		'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
  		}
	});

	return data
  }