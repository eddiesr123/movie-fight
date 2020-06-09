export const movieTemplate = (movieDetail) => {
	const { Poster, Title, Genre, Plot, Awards, BoxOffice, Metascore, imdbRating, imdbVotes } = movieDetail;

	const dollars = BoxOffice === 'N/A' ? 0 : parseInt(BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
	const metascore = Metascore === 'N/A' ? 0 : parseInt(Metascore);
	const rating = imdbRating === 'N/A' ? 0 : parseFloat(imdbRating);
	const votes = imdbVotes === 'N/A' ? 0 : parseInt(imdbVotes.replace(/,/g, ''));
	const awards =
		Awards === 'N/A'
			? 0
			: Awards.split(' ').filter((ele) => !isNaN(ele)).reduce((total, num) => total + parseInt(num), 0);

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
		<article data-value=${awards} class="notification is-primary">
			<p class="title">${Awards}</p>
			<p class="subtitle">Awards</p>
		</article>
		<article data-value=${dollars} class="notification is-primary">
			<p class="title">${BoxOffice}</p>
			<p class="subtitle">Box Office</p>
		</article>
		<article data-value=${metascore} class="notification is-primary">
			<p class="title">${Metascore}</p>
			<p class="subtitle">Metascore</p>
		</article>
		<article data-value=${rating} class="notification is-primary">
			<p class="title">${imdbRating}</p>
			<p class="subtitle">IMDB Rating</p>
		</article>
		<article data-value=${votes} class="notification is-primary">
			<p class="title">${imdbVotes}</p>
			<p class="subtitle">IMDB Votes</p>
		</article>
	`;
};
