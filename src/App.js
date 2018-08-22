import React, { Component, Fragment } from 'react'
import Modal from './components/Modal'
import ModalContent from './components/ModalContent'
import Header from './components/Header'
import Filter from './components/Filter'
import Movies from './components/Movies'
import styled from 'styled-components';
import { Transition, animated, config } from 'react-spring'
import CloseIcon from '@material-ui/icons/Close';

import './App.css';
import 'react-input-range/lib/css/index.css'

/*
const API = 'http://www.omdbapi.com/?apikey=99464486&';
const DEFAULT_QUERY = 's=batman';
*/

const StyledModalBackDrop = styled(animated.div)`
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.8);
	z-index: 1000;
`


const StyledModal = styled(animated.div)`
	box-sizing: border-box;
	position: fixed;
	top: 50%;
	left: 50%;
	max-width: 85%;
	width: 100%;
	transform: translate(-50%, -50%);
	padding: 2rem;
	background-color: #fafafa;
	border: 1px solid #f0f0f0;
	box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.2);
	z-index: 1001;

	@media (min-width: 768px) {
		max-width: 600px;
	}
`

const StyledModalCloseButton = styled.button`
	position: absolute;
    top: 0;
    right: 0;
    background: none;
    border: none;
    padding: 0;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
	justify-content: center;
	cursor: pointer;
`

/*
class Hits extends Component {
	render() {
		const { hits, isLoading, error } = this.props;
		const cssGrid = {
			margin: '0',
			padding: '0',
			listStyleType: 'none',
			display: 'grid',
			gridTemplateColumns: 'repeat(4, 1fr)'
		}
		const cssGridItem = {
			justifySelf: 'center',
			textAlign: 'center'
		}
		const imgStyle = {
			display: 'block',
			margin: '0 auto 1rem',
			width: '160px',
			height: '160px',
			objectFit: 'cover'
		}
		const headingStyle = {
			fontSize: '18px',
			fontWeight: 'normal'
		}

		if (isLoading) {
			return <p>Loading ...</p>
		}

		if (error) {
			return <p>{error.message}</p>
		}

		return (
			<ul style={cssGrid}>
				{hits.map(hit =>
					<li style={cssGridItem} key={hit.imdbID}>
						<img style={imgStyle} src={hit.Poster} alt="" />
						<h2 style={headingStyle}>{hit.Title}</h2>
					</li>
				)}
			</ul>
		)
	}
}
*/

class App extends Component {

	state = {
		hits: [],
		isLoading: false,
		error: null,
		interval: {
			min: 0,
			max: 3.1
		},
		showModal: false
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

	/*
	componentDidMount() {
		this.setState({ isLoading: true })
		const cachedHits = localStorage.getItem(DEFAULT_QUERY)

		if (cachedHits) {
			this.setState({
				hits: JSON.parse(cachedHits),
				isLoading: false
			})
		}
		else {
			fetch(API + DEFAULT_QUERY)
			.then(response => {
				if (response.ok) {
					return response.json()
				} else {
					throw new Error('Something went wrong ...')
				}
			})
			.then(data => {
				localStorage.setItem(DEFAULT_QUERY, JSON.stringify(data.Search));
				this.setState({
					hits: data.Search,
					isLoading: false
				})
			})
			.catch(error => this.setState({
				error,
				isLoading: false
			}))
		}
	}
	*/

	updateInterval = (interval) => {
		this.setState({ interval: {
			min: Math.round(interval.min * 10) / 10,
			max: Math.round(interval.max * 10) / 10
		} })
	}

	showModal = (movieData) => {
		const { title, score, plot } = movieData

		this.setState({
			showModal: true
		})

		this.modal.title = title
		this.modal.score = score
		this.modal.plot = plot
	}

	hideModal = () => {
		this.setState({
			showModal: false
		})
	}

	componentWillMount() {
		this.movies.sort((a, b) => {
			return b.score - a.score
		})
	}

	render() {
		const { interval, showModal } = this.state

		//<Hits hits={hits} isLoading={isLoading} error={error} />

		return (
			<Fragment>
				<Header />
				<Filter update={this.updateInterval} interval={interval} />
				<Movies movies={this.movies} filter={interval} showmodal={this.showModal} />
				<Modal>
					<Transition
						native
						from={{ opacity: 0, transform: 'translate(-50%, -400%)' }}
						enter={{ opacity: 1, transform: 'translate(-50%, -50%)' }}
						leave={{ opacity: 0, transform: 'translate(-50%, 200%)' }}>
						{showModal && (
							styles => (
								<StyledModal style={{...styles}}>
									<ModalContent modalData={this.modal} />
									<StyledModalCloseButton onClick={this.hideModal}><CloseIcon titleAccess="Close" /></StyledModalCloseButton>
								</StyledModal>
							)
						)}
					</Transition>
					<Transition
						native
						config={{ ...config.default, friction: 15, overshootClamping: true }}
						from={{ opacity: 0 }}
						enter={{ opacity: 1 }}
						leave={{ opacity: 0 }}>
						{showModal && (
							styles => (
								<StyledModalBackDrop onClick={this.hideModal} style={{...styles}} />
							)
						)}
					</Transition>
				</Modal>
			</Fragment>
		)
	}
}

export default App;
