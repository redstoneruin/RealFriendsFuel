import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import './Menu.scss';

class Menu extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};
	}


	render() {
		return (
			<div className="top-bar">
				<div className="top-bar-left name-container">
					<div className="menu-text">
						<Link to="/" className="title-link">Real Friends Fuel</Link>
					</div>
				</div>

			</div>
		);
	}
}


export default Menu;
