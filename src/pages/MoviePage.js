import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function MovieFull() {
	const [movie, setMovie] = useState({ matches: [] });
	const [errorText, setErrorText] = useState('Loading');
	const { imdbId } = useParams();

	useEffect(() => {
		const fetchMovie = async () => {
			const response = await fetch(
				`https://www.omdbapi.com/?i=${imdbId}&plot=full&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
			);
			const data = await response.json();

			if (data.Response !== 'False') {
				setMovie(data);
			} else {
				setErrorText(data.Error);
			}
		};

		fetchMovie();
	}, [imdbId]);

	if (!movie || !movie.Title) {
		return <h2>{errorText}</h2>;
	}

	return (
		<>
			<div className="bg-white navbar flex">
				<Link to="/">
					<strong>Home</strong>
				</Link>
			</div>
			<div className="bg-white movie-card shadow-md">
				<div className="flex">
					<img src={movie.Poster} className="poster" alt={movie.Title} />
					<div>
						<p className="movie-title">{movie.Title}</p>
						<p className="movie-plot">{movie.Plot}</p>
						<br />
						<p>Production : {movie.Production}</p>
						<br />
						<p>Director : {movie.Director}</p>
					</div>
				</div>
				<br />
				<p>Writer : {movie.Writer}</p>
				<br />
				<p>Actors : {movie.Actors}</p>
				<br />
				<p>Genre : {movie.Genre}</p>
				<br />
				<p>Language : {movie.Language}</p>
				<br />
				<p>Rated : {movie.Rated}</p>
				<br />
				<p>Released : {movie.Released}</p>
				<br />
				<p>imdbRating : {movie.imdbRating}</p>
				<br />
			</div>
		</>
	);
}
