import React, { Component, Fragment } from 'react'

import MovieProvider from './MovieProvider'
import { Toggle } from 'Utilities'
import { Header, Filter, Modal, MovieModalContent, Movies } from 'Elements'

import './App.css';
import 'react-input-range/lib/css/index.css'

class App extends Component {

	state = {
		interval: {
			min: 0,
			max: 3.1
		}
	}

	updateInterval = (interval) => {
		this.setState({ interval: {
			min: Math.round(interval.min * 10) / 10,
			max: Math.round(interval.max * 10) / 10
		} })
	}

	render() {
		const { interval } = this.state

		return (
			<Fragment>
				<Header />
				<Filter updateInterval={this.updateInterval} interval={interval} />
				<Toggle>
				{({ on, toggle }) => (
					<MovieProvider>
						<Movies interval={interval} toggle={toggle} />
						<Modal on={on} toggle={toggle}>
							<MovieModalContent />
						</Modal>
					</MovieProvider>
				)}
				</Toggle>
			</Fragment>
		)
	}
}

export default App;
