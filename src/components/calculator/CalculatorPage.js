import React, { Component } from 'react';

import './Calculator.scss';

class CalculatorPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			timed:true,
			resultsAvailable:false,

			lapTimeString:"",
			lapTimeValid:true,
			raceTimeValid: true,
			raceLapsValid: true,
			maxFuelValid: true,
			fuelUsageValid: true,

			raceTime:0,
			raceLaps:0,
			lapTime:0,
			lapsPerTank:0,
			totalFuel:0,
			maxFuel:0,
			numStops:0,
			lastStopFuel:0,
			fuelUsage:0,
		};
	}


	/**
	 * Check that the inputs are valid
	 */
	validateInputs = (callback) => {
		var lapTimeValid = true;
		var raceTimeValid = true;
		var raceLapsValid = true;

		var maxFuelValid = !!this.state.maxFuel;
		var fuelUsageValid = !!this.state.fuelUsage;
		
		var lapTime = 0;

		if(this.state.timed) {
			const re = new RegExp(/((\d|\d\d):)?((\d|\d\d).(\d|\d\d|\d\d\d))/);
			const match = this.state.lapTimeString.match(re);
			lapTimeValid = !!match;

			if(lapTimeValid) {
				lapTime = parseFloat(match[3]);
				if(match[2]) lapTime += parseInt(match[2])*60;
			}

			this.setState({lapTime});

			raceTimeValid = !!this.state.raceTime;
		} else {
			raceLapsValid = !!this.state.raceLaps;
		}
		

		var valid = lapTimeValid && raceTimeValid && raceLapsValid && maxFuelValid && fuelUsageValid;

		this.setState({
			lapTimeValid,
			raceTimeValid,
			raceLapsValid,
			maxFuelValid,
			fuelUsageValid
		}, valid ? callback : null);
		
		return valid;
	}


	/**
	 * Calculate the fuel requirements based on inputs
	 */
	doCalculation = () => {
		var raceTime = this.state.raceTime;
		var raceLaps = this.state.raceLaps;

		if(this.state.timed) {
			raceLaps = Math.ceil((raceTime * 60) / this.state.lapTime);
		} else {
			raceTime = (raceLaps * this.state.lapTime) / 60;
		}

		const lapsPerTank = this.state.maxFuel / this.state.fuelUsage;
		const totalFuel = this.state.fuelUsage * (raceLaps); // TODO: Add parameters
		const numStops = Math.ceil((totalFuel - this.state.maxFuel) / this.state.maxFuel);
		const lastStopFuel = numStops ? 
			totalFuel - numStops * this.state.maxFuel : 
			0;

		this.setState({
			raceTime,
			raceLaps,
			totalFuel,
			lapsPerTank,
			numStops,
			lastStopFuel,
			resultsAvailable:true
		});
	}


	/**
	 * Handle submitting the fuel calculator form and displaying results
	 */
	handleSubmit = (e) => {
		e.preventDefault();

		if(!this.validateInputs(this.doCalculation)) return;
	}




	/* Begin setters */

	inputHandler = (e) => this.setState({[e.target.id]:e.target.value});
	setTimed = (timed) => this.setState({timed});

	/* End setters */


	render() {


		const lapTimeFormatError = <p className="help-text error-text">Invalid format.</p>;
		const raceTimeInval = <p className="help-text error-text">Must have race time.</p>;
		const raceLapsInval = <p className="help-text error-text">Must have race laps.</p>;
		const maxFuelInval = <p className="help-text error-text">Must have max fuel.</p>;
		const fuelUsageInval = <p className="help-text error-text">Must have fuel usage.</p>;


		const timedFields = 
			<div>
				<label>Race Time in Minutes
					<input id="raceTime" type="number" value={this.state.raceTime} onChange={this.inputHandler} />
				</label>
				{ this.state.raceTimeValid ? null : raceTimeInval }
			</div>;


		const lapFields =
			<div>
				<label>Race Laps
					<input id="raceLaps" type="number" value={this.state.raceLaps} onChange={this.inputHandler} />
				</label>
				{ this.state.raceLapsValid ? null : raceLapsInval }
			</div>;


		const calcForm =
			<div className="calc-card">
				<div className="calc-title-container">
					<h5>Real Friends Fuel</h5>
				</div>

				<form onSubmit={this.handleSubmit} className="form-container">
					
					{this.state.timed ? timedFields : lapFields}

					<label>Lap Time in Format MM:SS.ms
						<input id="lapTimeString" type="text" value={this.state.lapTimeString} onChange={this.inputHandler} />
					</label>
					{ this.state.lapTimeValid ? null : lapTimeFormatError }

					<label>Maximum Fuel
						<input id="maxFuel" type="number" step="0.01" value={this.state.maxFuel} onChange={this.inputHandler} />
					</label>
					{ this.state.maxFuelValid ? null : maxFuelInval }

					<label>Fuel Usage
						<input id="fuelUsage" type="number" step="0.01" value={this.state.fuelUsage} onChange={this.inputHandler} />
					</label>
					{ this.state.fuelUsageValid ? null : fuelUsageInval }

					<input type="submit" onSubmit={this.handleSubmit} style={{"display":"none"}} />
					
					<div className="button-bar">
						<div className="button success go-button" onClick={this.handleSubmit}>
							Go
						</div>
					</div>
				</form>
			</div>


		const timedResults =
			<div className="cell result-card">
				<p className="result content-center">{this.state.raceLaps}</p>
				<p className="result-description content-center">Total Laps</p>
			</div>;


		const lapResults =
			<div className="cell result-card">
			</div>;


		const results = !this.state.resultsAvailable ? null :
			<div className="grid-container full">
				<div className="grid-x grid-margin-x grid-margin-y small-up-2 large-up-3">
					
					<div className="cell result-card">
						<p className="result content-center">{this.state.numStops}</p>
						<p className="result-description content-center">Pit Stops</p>
					</div>

					<div className="cell result-card">
						<p className="result content-center">{this.state.lastStopFuel.toFixed(2)}</p>
						<p className="result-description content-center">Fuel on Last Stop</p>
					</div>

					<div className="cell result-card">
						<p className="result content-center">{this.state.totalFuel.toFixed(2)}</p>
						<p className="result-description content-center">Total Fuel Usage</p>
					</div>

					<div className="cell result-card">
						<p className="result content-center">{Math.floor(this.state.lapsPerTank)}</p>
						<p className="result-description content-center">Laps Per Tank</p>
					</div>

					{this.state.timed ? timedResults : lapResults}
				</div>
			</div>;


		return (
			<div className="page-container grid-container">
				<div className={"grid-x grid-margin-x grid-margin-y " + (this.state.resultsAvailable ? "medium-up-2" : "")}>

					<div className="cell content-center">
						{ calcForm }
					</div>
					
					<div className="cell">
						{ results }	
					</div>
				
				</div>	
			</div>
		);
	}
}


export default CalculatorPage;