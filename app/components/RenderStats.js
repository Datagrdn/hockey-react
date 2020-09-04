import React from 'react'

function RenderStatFunction(selectedStat, stats) {
if(stats){
	const filteredStats = selectedStat[0] === 0 ? stats : stats.filter(play => play[0] === selectedStat[1]);
	console.log(filteredStats);

	const period1Plays = []
	filteredStats.forEach((play) => {
		if(play[1].includes("Period 1")){
			period1Plays.push(play[1].substring(9))
		}
	})
	if(period1Plays.length === 0 ){
		period1Plays.push("None")
	}

	const period1PlaysFormatted = period1Plays.map((play) => (
		<li key={play}>{play}</li>
		))

	const period2Plays = []
	filteredStats.forEach((play) => {
		if(play[1].includes("Period 2")){
			period2Plays.push(play[1].substring(9))
		}
		})
	if(period2Plays.length === 0 ){
		period2Plays.push("None")
	}

	const period2PlaysFormatted = period2Plays.map((play) => (
		<li key={play}>{play}</li>
		))

	const period3Plays = []
	filteredStats.forEach((play) => {
		if(play[1].includes("Period 3")){
			period3Plays.push(play[1].substring(9))
		}
		})
	if(period3Plays.length === 0 ){
		period3Plays.push("None")
	}

	const period3PlaysFormatted = period3Plays.map((play) => (
		<li key={play}>{play}</li>
		))

	const period4Plays = []
	filteredStats.forEach((play) => {
		if(play[1].includes("Period 4")){
			period4Plays.push(play[1].substring(9))
		}
		})


	const period4PlaysFormatted = period4Plays.map((play) => (
		<li key={play}>{play}</li>
		))

	const period4PlaysReturn = period4PlaysFormatted.length !== 0 ? [<h2>OT</h2>, <p>{period4PlaysFormatted}</p>] : null;

	const period5Plays = []
	filteredStats.forEach((play) => {
		if(play[1].includes("Period 5")){
			period5Plays.push(play[1].substring(9))
		}
		})


	const period5PlaysFormatted = period5Plays.map((play) => (
		<li key={play}>{play}</li>
		))

	const period5PlaysReturn = period5PlaysFormatted.length !== 0 ? [<h2>Shootout</h2>, <p>{period5PlaysFormatted}</p>] : null;
	
	return [
		<h2>Period 1</h2>,
		<p>{period1PlaysFormatted}</p>,
		<h2>Period 2</h2>,
		<p>{period2PlaysFormatted}</p>,
		<h2>Period 3</h2>,
		<p>{period3PlaysFormatted}</p>,
		<p>{period4PlaysReturn}</p>,
		<p>{period5PlaysReturn}</p>
		]

	} else {
		return null
	}
}

export default class RenderStats extends React.Component {
	constructor(props){
		super(props)
	}

	render(){		
		const { selectedStat, stats } = this.props;
		return(
			{selectedStat != null
			? <RenderStatFunction
				selectedStat={selectedStat}
				stats={stats}/>
			: null}
			)
		}
	}