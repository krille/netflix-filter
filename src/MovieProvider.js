import React, { Component } from 'react';
import { MovieContext } from './MovieContext';

export default class MovieProvider extends Component {
	state = {
		title: '',
		score: '',
		plot: ''
	}

	movies = [
		{ title: 'Thor: Ragnarok', score: 8.6, plot: 'Appropriately fabricate functional bandwidth after prospective opportunities. Holisticly repurpose cross-unit vortals with multimedia based intellectual capital. Continually productize client-based.' },
		{ title: 'Thor: Dark World', score: 7.1, plot: 'Appropriately fabricate functional bandwidth after prospective opportunities. Holisticly repurpose cross-unit vortals with multimedia based intellectual capital. Continually productize client-based.' },
		{ title: 'Captain America: The First Avenger', score: 7.6, plot: 'Appropriately fabricate functional bandwidth after prospective opportunities. Holisticly repurpose cross-unit vortals with multimedia based intellectual capital. Continually productize client-based.' },
		{ title: 'Captain America: Civil War', score: 7.6, plot: 'Appropriately fabricate functional bandwidth after prospective opportunities. Holisticly repurpose cross-unit vortals with multimedia based intellectual capital. Continually productize client-based.' },
		{ title: 'Iron Man', score: 8.3, plot: 'Appropriately fabricate functional bandwidth after prospective opportunities. Holisticly repurpose cross-unit vortals with multimedia based intellectual capital. Continually productize client-based.' },
		{ title: 'Sharknado', score: 3.4, plot: 'Appropriately fabricate functional bandwidth after prospective opportunities. Holisticly repurpose cross-unit vortals with multimedia based intellectual capital. Continually productize client-based.' },
		{ title: 'Sharknado 2', score: 2.1, plot: 'Appropriately fabricate functional bandwidth after prospective opportunities. Holisticly repurpose cross-unit vortals with multimedia based intellectual capital. Continually productize client-based.' },
		{ title: 'Sharknado 3', score: 3.1, plot: 'Appropriately fabricate functional bandwidth after prospective opportunities. Holisticly repurpose cross-unit vortals with multimedia based intellectual capital. Continually productize client-based.' },
		{ title: 'Sharknado 4', score: 1.1, plot: 'Appropriately fabricate functional bandwidth after prospective opportunities. Holisticly repurpose cross-unit vortals with multimedia based intellectual capital. Continually productize client-based.' },
		{ title: 'Sharknado 5', score: 1.5, plot: 'Appropriately fabricate functional bandwidth after prospective opportunities. Holisticly repurpose cross-unit vortals with multimedia based intellectual capital. Continually productize client-based.' },
		{ title: 'Captain Fantastic', score: 7.9, plot: 'Appropriately fabricate functional bandwidth after prospective opportunities. Holisticly repurpose cross-unit vortals with multimedia based intellectual capital. Continually productize client-based.' },
		{ title: 'The Fault In Our Stars', score: 7.8, plot: 'Appropriately fabricate functional bandwidth after prospective opportunities. Holisticly repurpose cross-unit vortals with multimedia based intellectual capital. Continually productize client-based.' },
		{ title: 'The Shawshank Redemption', score: 9.2, plot: 'Appropriately fabricate functional bandwidth after prospective opportunities. Holisticly repurpose cross-unit vortals with multimedia based intellectual capital. Continually productize client-based.' },
		{ title: 'Schindler`s List', score: 8.9, plot: 'Appropriately fabricate functional bandwidth after prospective opportunities. Holisticly repurpose cross-unit vortals with multimedia based intellectual capital. Continually productize client-based.' },
		{ title: 'Forrest Gump', score: 8.7, plot: 'Appropriately fabricate functional bandwidth after prospective opportunities. Holisticly repurpose cross-unit vortals with multimedia based intellectual capital. Continually productize client-based.' },
		{ title: 'The Matrix', score: 8.6, plot: 'Appropriately fabricate functional bandwidth after prospective opportunities. Holisticly repurpose cross-unit vortals with multimedia based intellectual capital. Continually productize client-based.' },
		{ title: 'Léon: The Professional', score: 8.5, plot: 'Appropriately fabricate functional bandwidth after prospective opportunities. Holisticly repurpose cross-unit vortals with multimedia based intellectual capital. Continually productize client-based.' },
		{ title: 'Interstellar', score: 8.5, plot: 'Appropriately fabricate functional bandwidth after prospective opportunities. Holisticly repurpose cross-unit vortals with multimedia based intellectual capital. Continually productize client-based.' },
		{ title: 'Alien', score: 8.4, plot: 'Appropriately fabricate functional bandwidth after prospective opportunities. Holisticly repurpose cross-unit vortals with multimedia based intellectual capital. Continually productize client-based.' },
		{ title: 'Amadeus', score: 8.3, plot: 'Appropriately fabricate functional bandwidth after prospective opportunities. Holisticly repurpose cross-unit vortals with multimedia based intellectual capital. Continually productize client-based.' }
	]

	updateMovieModal = (movie) => {
		this.setState({
			title: movie.title,
			score: movie.score,
			plot: movie.plot
		})
	}

	componentWillMount() {
		this.movies.sort((a, b) => {
			return b.score - a.score
		})
	}

	render() {
		return (
			<MovieContext.Provider
				value={{
					movies: this.movies,
					movie: this.state,
					updateMovieModal: this.updateMovieModal
				}}
			>
				{this.props.children}
			</MovieContext.Provider>
		)
	}
}
