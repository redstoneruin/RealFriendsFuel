import React, { Component } from 'react';

import './Calculator.scss';

class CalculatorPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			timed:true,
			resultsAvailable:false
		};
	}


	/* Handle submitting the calculator form */
	handleSubmit = (e) => {
		e.preventDefault();
	}


	/* Begin setters */

	inputHandler = (e) => this.setState({[e.target.id]:e.target.value});
	setTimed = (timed) => this.setState({timed});

	/* End setters */


	render() {

		const timedFields = 
			<div>
				<label>Race Time in Minutes
					<input id="raceTime" type="number" value={this.state.raceTime} onChange={this.inputHandler} />
				</label>

			</div>;


		const lapFields =
			<div>
				<label>Race Laps
					<input id="raceLaps" type="number" value={this.state.raceTime} onChange={this.inputHandler} />
				</label>
			</div>;


		const calcForm =
			<div className="calc-card">
				<div className="calc-title-container">
					<h5>Real Friends Fuel</h5>
				</div>

				<form onSubmit={this.handleSubmit} className="form-container">
					
					{this.state.timed ? timedFields : lapFields}

					<label>Lap Time in Format MM:SS.ms
						<input id="lapTime" type="text" value={this.state.lapTime} onChange={this.inputHandler} />
					</label>

					<label>Maximum Fuel
						<input id="maxFuel" type="number" value={this.state.maxFuel} onChange={this.inputHandler} />
					</label>

					<label>Fuel Usage
						<input id="fuelUsage" type="number" value={this.state.fuelUsage} onChange={this.inputHandler} />
					</label>

					<input type="submit" onSubmit={this.handleSubmit} style={{"display":"none"}} />
					
					<div className="button-bar">
						<div className="button success go-button">
							Go
						</div>
					</div>
				</form>
			</div>


		const timedResults = !this.resultsAvailable ? null :
			<div>
			</div>;


		const lapResults = !this.resultsAvailable ? null :
			<div>
			</div>;

		return (
			<div className="page-container">
				{ calcForm }
				{ this.state.timed ? timedResults : lapResults }	
			</div>
		);
	}
}


export default CalculatorPage;