import React, { Component, Fragment } from 'react'
import styled from 'styled-components';
import StarIcon from '@material-ui/icons/Star';

import { Toggle } from 'Utilities'
import { Header, Filter, Modal, Movies, SideBySide } from 'Elements'

import './App.css';
import 'react-input-range/lib/css/index.css'

class App extends Component {

	state = {
		interval: {
			min: 0,
			max: 3.1
		}
	}

	modal = {
		title: null,
		score: null,
		plot: null
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

	updateInterval = (interval) => {
		this.setState({ interval: {
			min: Math.round(interval.min * 10) / 10,
			max: Math.round(interval.max * 10) / 10
		} })
	}

	updateModalContent = (movie) => {
		this.modal.title = movie.title
		this.modal.score = movie.score
		this.modal.plot = movie.plot
	}

	componentWillMount() {
		this.movies.sort((a, b) => {
			return b.score - a.score
		})
	}

	render() {
		const { interval } = this.state

		return (
			<Fragment>
				<Header />
				<Filter updateInterval={this.updateInterval} interval={interval} />
				<Toggle>
				{({ on, toggle }) => (
					<Fragment>
						<Movies movies={this.movies} filter={interval} toggle={toggle} updateModalContent={this.updateModalContent} />
						<Modal on={on} toggle={toggle}>
							<SideBySide>
								<h1 style={{margin: 0}}>{this.modal.title}</h1>
								<StyledModalScore><StarIcon titleAccess="Score:" /> {this.modal.score}</StyledModalScore>
							</SideBySide>
							<p>{this.modal.plot}</p>
						</Modal>
					</Fragment>
				)}
				</Toggle>
			</Fragment>
		)
	}
}

const StyledModalScore = styled.span`
	display: flex;
	align-items: center;

	> :first-child {
		margin-right: 0.2em;
	}
`

export default App;
