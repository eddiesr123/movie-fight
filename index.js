import { createAutoComplete } from './autocomplete.js';
import { movieTemplate } from './movietemplate.js';

const autoCompleteConfig = {
	renderOption : (movie) => {
		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
		return `
			<img src="${imgSrc}" />
			${movie.Title} (${movie.Year})
		`;
	},
	inputValue   : (movie) => movie.Title,
	fetchData    : async (searchTerm) => {
		const response = await axios.get('http://www.omdbapi.com/', {
			params : { apikey: '71b08367', s: searchTerm }
		});
		if (response.data.Error) return [];
		return response.data.Search;
	}
};

createAutoComplete({
	...autoCompleteConfig,
	root           : document.querySelector('#left-autocomplete'),
	onOptionSelect : (movie) => {
		document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#left-summary'));
	}
});
createAutoComplete({
	...autoCompleteConfig,
	root           : document.querySelector('#right-autocomplete'),
	onOptionSelect : (movie) => {
		document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#right-summary'));
	}
});

const onMovieSelect = async (movie, summaryElement) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params : {
			apikey : '71b08367',
			i      : movie.imdbID
		}
	});
	summaryElement.innerHTML = movieTemplate(response.data);
};
