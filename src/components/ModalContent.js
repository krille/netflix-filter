import React, { Component, Fragment } from 'react'
import StarIcon from '@material-ui/icons/Star';
import styled from 'styled-components';

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

export default class ModalContent extends Component {
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
