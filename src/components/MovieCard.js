import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
	return (
		<Link to={`/movies/${movie.imdbID}`} className="result-item flex movie">
			<img src={movie.Poster} width="40" alt={movie.Title} />
			<div className="flex flex-column" style={{ 'padding-left': '10px' }}>
				<p className="movie-title">{movie.Title}</p>
				<p className="movie-year">{movie.Year}</p>
			</div>
		</Link>
	);
}
