import styled from 'styled-components';
import { colors } from 'Utilities';

export const IconButton = styled.button`
	background: transparent;
	border: none;
	padding: 0;
	width: 2rem;
	height: 2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	color: ${colors.black}

	&:hover {
		color: ${colors.darkGrey}
	}
`
