import React, { Component } from 'react'
import styled from 'styled-components';

const StyledTitle = styled.h1`
	font-size: 3rem;
	text-align: center;
	color: red;
`

export default class Header extends Component {
	render() {
		return (
			<header>
				<StyledTitle>Netflix filter</StyledTitle>
			</header>
		)
	}
}
