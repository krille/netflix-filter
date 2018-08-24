import styled from 'styled-components';
import { colors, elevation, transition } from 'Utilities';

export const Card = styled.div`
	box-sizing: border-box;
	background-color: white;
	border-radius: 5px;
	padding: 2rem;
	max-width: 320px;
	margin: 0 auto;
	color: ${colors.black};

	${elevation[4]};

	${transition({
		property: 'box-shadow'
	})};

	&:hover {
		${elevation[5]};
	}
`;
