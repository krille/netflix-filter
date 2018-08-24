import React, { Component } from 'react'
import styled from 'styled-components';
import { Transition, animated, config } from 'react-spring'

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
		const { movie, filter, toggle, updateModalContent } = this.props

		return (
			<Transition
				native
				config={{ ...config.default, friction: 15, overshootClamping: true }}
				from={{ opacity: 0, maxHeight: 0 }}
				enter={{ opacity: 1, maxHeight: 200 }}
				leave={{ opacity: 0, maxHeight: 0 }}>
				{
					(movie.score >= filter.min && movie.score <= filter.max) && (
						styles => (
							<StyledGridItem style={{...styles}} onClick={() => {
								updateModalContent(movie)
								toggle()
							}}>
								<h2>{movie.title}</h2>
							</StyledGridItem>
						)
					)
				}
			</Transition>
		)
	}
}

export default class Movies extends Component {

	render() {
		const { movies, filter, toggle, updateModalContent } = this.props

		return (
			<StyledGrid>
				{movies.map((movie, index) => (
					<Movie movie={movie} filter={filter} key={index} toggle={toggle} updateModalContent={updateModalContent} />
				))}
			</StyledGrid>
		)
	}
}
