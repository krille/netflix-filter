export const absolute = ({ y = 'top', x = 'left' }) => `
	position: absolute;
	${y}: 0;
	${x}: 0;
`;

export const fixed = ({ y = 'top', x = 'left' }) => `
	position: fixed;
	${y}: 0;
	${x}: 0;
`;
