import React, { Component, Fragment } from 'react'
import Modal from './Modal'
import InputRange from 'react-input-range'
import styled from 'styled-components';
import { Transition } from 'react-spring'
import StarIcon from '@material-ui/icons/Star';
import CloseIcon from '@material-ui/icons/Close';
// import InfiniteScroll from 'react-infinite-scroller'

import './App.css';
import 'react-input-range/lib/css/index.css'

/*
const API = 'http://www.omdbapi.com/?apikey=99464486&';
const DEFAULT_QUERY = 's=batman';
*/

const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
  color: red;
`

const SubTitle = styled.h2`
	margin-bottom: 1rem;
	font-size: 1rem;
	text-align: center;
	color: #333;
`

const Grid = styled.ul`
	margin: auto;
	padding: 1rem;
	max-width: 1400px;
	list-style-type: none;
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	grid-gap: 1rem;
	align-items: stretch;

	@media (min-width: 500px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (min-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
	}

	@media (min-width: 1024px) {
		grid-template-columns: repeat(4, 1fr);
	}
`

const GridItem = styled.li`
	padding: 1rem;
	text-align: center;
	background-color: #fafafa;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
	transition: background-color, transform 200ms ease;
	overflow: hidden;
	cursor: pointer;

	&:hover {
		background-color: #f0f0f0;
		transform: scale(1.02);
	}
`

const FilterWrapper = styled.div`
	margin: 0 auto 3rem;
	padding: 0 2rem;
	text-align: center;
	max-width: 500px;
`

const StyledModalBackDrop = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.8);
	z-index: 1000;
`


const StyledModal = styled.div`
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

const StyledModalHeader = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;

	> h1 {
		margin: 0;
	}
`

const StyledModalScore = styled.span`
	display: flex;
	align-items: center;

	> :first-child {
		margin-right: 0.2em;
	}
`






class Header extends Component {
	render() {
		return (
			<header>
				<Title>Netflix filter</Title>
			</header>
		)
	}
}

class Filter extends Component {
	render() {
		let { interval, update } = this.props

		return (
			<FilterWrapper>
				<SubTitle>imdb score</SubTitle>
				<InputRange
					step={0.1}
					maxValue={10}
					minValue={0}
					value={interval}
					onChange={newInterval => update(newInterval)} />
			</FilterWrapper>
		)
	}
}

class Movies extends Component {
	render() {
		const { movies, filter, showmodal } = this.props

		return (
			<Grid>
				{
					movies.map( (movie, index) => (
						<Movie filter={filter} movieData={movie} key={index} showmodal={showmodal} />
					))
				}
			</Grid>
		)
	}
}

class Movie extends Component {

	render() {
		const { filter, movieData, showmodal } = this.props
		const { title, score } = movieData

		return (
			<Transition from={{ opacity: 0, maxHeight: 0 }} enter={{ opacity: 1, maxHeight: 200 }} leave={{ opacity: 0, maxHeight: 0 }}>
				{(score >= filter.min && score <= filter.max) && (
					styles => (
						<GridItem onClick={() => showmodal(movieData)} style={{...styles}}>
							<h2>{title}</h2>
						</GridItem>
					)
				)}
			</Transition>
		)
	}
}

class MovieDetails extends Component {
	render() {
		const { title, score, plot } = this.props.modalData

		return (
			<Fragment>
				<StyledModalHeader>
					<h1>{title}</h1>
					<StyledModalScore><StarIcon titleAccess="Score:" /> {score}</StyledModalScore>
				</StyledModalHeader>
				<p>{plot}</p>
			</Fragment>
		)
	}
}

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
					<Transition from={{ opacity: 0, transform: 'translate(-50%, -400%)' }} enter={{ opacity: 1, transform: 'translate(-50%, -50%)' }} leave={{ opacity: 0, transform: 'translate(-50%, 200%)' }}>
						{showModal && (
							styles => (
								<StyledModal style={{...styles}}>
									<MovieDetails modalData={this.modal} />
									<StyledModalCloseButton onClick={this.hideModal}><CloseIcon titleAccess="Close" /></StyledModalCloseButton>
								</StyledModal>
							)
						)}
					</Transition>
					<Transition from={{ opacity: 0 }} enter={{ opacity: 1 }} leave={{ opacity: 0 }}>
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
