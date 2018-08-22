import React, { Component } from 'react'
import InputRange from 'react-input-range'
import styled from 'styled-components';

const StyledSubTitle = styled.h2`
	margin-bottom: 1rem;
	font-size: 1rem;
	text-align: center;
	color: #333;
`

const StyledFilterWrapper = styled.div`
	margin: 0 auto 3rem;
	padding: 0 2rem;
	text-align: center;
	max-width: 500px;
`

export default class Filter extends Component {
	render() {
		let { interval, update } = this.props

		return (
			<StyledFilterWrapper>
				<StyledSubTitle>imdb score</StyledSubTitle>
				<InputRange
					step={0.1}
					maxValue={10}
					minValue={0}
					value={interval}
					onChange={newInterval => update(newInterval)} />
			</StyledFilterWrapper>
		)
	}
}
