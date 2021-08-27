import { useState, useRef } from 'react';
import debounce from '../utils/debounce';
import MovieCard from './MovieCard';

export default function Autocomplete() {
	const [value, setValue] = useState('');
	const [items, setItems] = useState([]);

	// actual fetching function
	const fetchMovies = async (q) => {
		const response = await fetch(`https://www.omdbapi.com/?s=${q}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`);
		const data = await response.json();
		if (data.Response !== 'False') {
			setItems(data.Search.slice(0, 5));
		} else {
			setItems([{ Title: data.Error }]);
		}
	};

	// will be created only once initially
	const debouncedFetch = useRef(
		debounce((query) => fetchMovies(query), 300),
		[]
	).current;

	// onclick handler function
	const handleChange = (event) => {
		const { value: newValue } = event.target;
		setValue(newValue);
		if (newValue.length > 3) {
			debouncedFetch(newValue);
		}

		if (newValue.length < 4) {
			setItems([]);
		}
	};

	return (
		<div className="autocomplete">
			<label htmlFor="search">Search for Movies</label>
			<input
				type="search"
				name="search"
				placeholder="type a movie name to get information"
				onChange={handleChange}
				value={value}
				autocomplete="off"
			/>
			{items.length > 0 && (
				<ul className="result-list shadow-lg" id="result-list">
					{items.map((item, index) => (
						<MovieCard key={index} movie={item} />
					))}
				</ul>
			)}
		</div>
	);
}
