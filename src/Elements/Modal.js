import React, { Component } from 'react'
import { Transition, animated } from 'react-spring'
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';

import { Portal, absolute, fixed } from 'Utilities'
import { Card } from './Cards'
import { IconButton } from './Buttons'

const ModalWrapper = styled.div`
	${fixed({})};
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
`

const Background = styled(animated.div)`
	${fixed({})};
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.8);
`

const AnimCard = Card.withComponent(animated.div);
const Window = AnimCard.extend`
	position: relative;
	max-width: 80vw;
	z-index: 1002;
`

const CloseButton = IconButton.extend`
	${absolute({
		x: 'right'
	})};
`

export default class Modal extends Component {
	render() {
		const { children, toggle, on } = this.props

		return (
			<Portal>
				<Transition
					native
					config={{ overshootClamping: true }}
					from={{ opacity: 0, bgOpacity: 0, y: '-50px' }}
					enter={{ opacity: 1, bgOpacity: 0.5, y: '-0' }}
					leave={{ opacity: 0, bgOpacity: 0, y: '75px' }}>
					{on && (styles => (
						<ModalWrapper>
							<Window style={{
								opacity: styles.opacity,
								transform: styles.y.interpolate(y => `translate3d(0, ${y}, 0)`),
							}}>
								{children}
								<CloseButton onClick={toggle}><CloseIcon titleAccess="Close" /></CloseButton>
							</Window>
							<Background onClick={toggle} style={{opacity: styles.opacity}} />
						</ModalWrapper>
					))}
				</Transition>
			</Portal>
		)
	}
}
