import React, { Component, Fragment } from 'react'
import styled from 'styled-components';

import { SideBySide } from 'Elements'
import { MovieContext } from '../MovieContext'

import StarIcon from '@material-ui/icons/Star';

const Score = styled.span`
	display: flex;
	align-items: center;

	> :first-child {
		margin-right: 0.2em;
	}
`

export default class MovieModalContent extends Component {
	render() {
		return (
			<MovieContext.Consumer>
				{context => (
					<Fragment>
						<SideBySide>
							<h1 style={{margin: 0}}>{context.movie.title}</h1>
							<Score><StarIcon titleAccess="Score:" /> {context.movie.score}</Score>
						</SideBySide>
						<p>{context.movie.plot}</p>
					</Fragment>
				)}
			</MovieContext.Consumer>
		)
	}
}
