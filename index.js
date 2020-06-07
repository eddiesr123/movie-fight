import { debounce } from './utils.js';

const fetchData = async (searchTerm) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params : {
			apikey : '71b08367',
			s      : searchTerm
		}
	});

	if (response.data.Error) return [];

	return response.data.Search;
};

const root = document.querySelector('.autocomplete');
root.innerHTML = `
	<label><strong>Search For a Movie</strong></label>
	<input class="input" />
	<div class="dropdown">
		<div class="dropdown-menu">
			<div class="dropdown-content results"></div>
		</div>
	</div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

const onInput = async (event) => {
	const movies = await fetchData(event.target.value);

	if (!movies.length) {
		dropdown.classList.remove('is-active');
		return;
	}

	resultsWrapper.innerHTML = '';
	dropdown.classList.add('is-active');
	movies.forEach((movie) => {
		const option = document.createElement('a');
		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
		option.classList.add('dropdown-item');
		option.innerHTML = `
			<img src="${imgSrc}" />
			${movie.Title}
			`;

		option.addEventListener('click', () => {
			input.value = movie.Title;
			dropdown.classList.remove('is-active');
			onMovieSelect(movie);
		});
		resultsWrapper.appendChild(option);
	});
};

input.addEventListener('input', debounce(onInput, 500));
document.addEventListener('click', (event) => {
	if (!root.contains(event.target)) {
		dropdown.classList.remove('is-active');
	}
});

const onMovieSelect = async ({ imdbID }) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params : {
			apikey : '71b08367',
			i      : imdbID
		}
	});

	const div = document.querySelector('#summary');
	div.innerHTML = movieTemplate(response.data);
};

const movieTemplate = (movieDetail) => {
	const { Poster, Title, Genre, Plot, Awards, BoxOffice, Metascore, imdbRating, imdbVotes } = movieDetail;
	return `
		<article class="media">
			<figure class="media-left">
				<p class="image">
					<img src="${Poster}" />
				</p>
			</figure>
			<div class="media-content">
				<div class="content">
					<h1>${Title}</h1>
					<h4>${Genre}</h4>
					<p>${Plot}</p>
				</div>
			</div>
		</article>
		<article class="notification is-primary">
			<p class="title">${Awards}</p>
			<p class="subtitle">Awards</p>
		</article>
		<article class="notification is-primary">
			<p class="title">${BoxOffice}</p>
			<p class="subtitle">Box Office</p>
		</article>
		<article class="notification is-primary">
			<p class="title">${Metascore}</p>
			<p class="subtitle">Metascore</p>
		</article>
		<article class="notification is-primary">
			<p class="title">${imdbRating}</p>
			<p class="subtitle">IMDB Rating</p>
		</article>
		<article class="notification is-primary">
			<p class="title">${imdbVotes}</p>
			<p class="subtitle">IMDB Votes</p>
		</article>
	`;
};