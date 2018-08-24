import React, { Component } from 'react'
import styled from 'styled-components';
import { MovieContext } from '../MovieContext'
import { Transition, animated } from 'react-spring'

const StyledGrid = styled.ul`
	box-sizing: border-box;
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

const StyledGridItem = styled(animated.li)`
	box-sizing: border-box;
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

class Movie extends Component {
	render() {
		const { movie, interval, toggle } = this.props

		return (
			<Transition
				native
				config={{ overshootClamping: true }}
				from={{ opacity: 0, maxHeight: 0 }}
				enter={{ opacity: 1, maxHeight: 200 }}
				leave={{ opacity: 0, maxHeight: 0 }}>
				{
					(movie.score >= interval.min && movie.score <= interval.max) && (
						styles => (
							<MovieContext.Consumer>
								{context => (
									<StyledGridItem
										style={{...styles}}
										onMouseDown={() => {context.updateMovieModal(movie)}}
										onClick={toggle}
									>
										<h2>{movie.title}</h2>
									</StyledGridItem>
								)}
							</MovieContext.Consumer>
						)
					)
				}
			</Transition>
		)
	}
}

export default class Movies extends Component {

	render() {
		const { interval, toggle } = this.props

		return (
			<MovieContext.Consumer>
				{context =>(
					<StyledGrid>
						{context.movies.map((movie, index) => (
							<Movie movie={movie} interval={interval} key={index} toggle={toggle} />
						))}
					</StyledGrid>
				)}
			</MovieContext.Consumer>
		)
	}
}
