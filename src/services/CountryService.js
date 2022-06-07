export const countryService = (function makeCountryService() {
	const API_URL = 'https://restcountries.com/v3.1/all';

	console.log('CountryService.init()');

	function findAll() {
		try {
			return fetch(`${API_URL}`)
				.then(res => res.json())
				.then(jsonObj => jsonObj);
		} catch (err) {
			console.log('fetchCountries() ERROR: ', err);
		}
	}

	return {
		findAll
	};

})();