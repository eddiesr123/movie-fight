export const movieTemplate = (movieDetail) => {
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
