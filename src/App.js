import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import MoviePage from './pages/MoviePage';

function App() {
	return (
		<div className="App flex flex-column align-center justify-center">
			<Router>
				<Switch>
					<Route path="/movies/:imdbId">
						<MoviePage />
					</Route>
					<Route path="/">
						<IndexPage />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
