import React from 'react'
import { FaTimesCircle } from 'react-icons/fa'

export default class GameFlow extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			selectedSitch: [0, "all"],
			selectedStat: [0, 'cfdiff'],
		}

		this.updateSituation = this.updateSituation.bind(this)

	}

	updateSituation (selectedSitch) {
		this.setState({
			selectedSitch,
			error: null,
		})
	}

	updateStat (selectedStat) {
		this.setState({
			selectedStat,
			error: null,
		})
	}

	render(){
		const { gameID } = this.props;
		const asURL = `http://www.naturalstattrick.com/graphs/20192020-${gameID.toString().substring(5, 10)}-${this.state.selectedStat[1]}-${this.state.selectedSitch[1]}.png`
		const scURL = `https://www.naturalstattrick.com/shiftcharts/games/20192020/20192020-${gameID.toString().substring(5, 10)}-shiftchart.png`
		const { selectedSitch, selectedStat } = this.state;
		const statArray = [['Corsi', 'cfdiff'], ['xG', 'xgdiff'], ['Shift Chart', 'shiftchart']];
		const situationsArray = [['All','all'], ['EV', 'ev'], ['5v5', '5v5'], ['5v5 SVA', 'sva']];
		return (
		<React.Fragment>
			<table width="100%" border='0'>
				<tr>
					<td>
						<ul className='flex-center'>
							{statArray.map((stat, index) => (
								<li key={stat}>
									<button 
										className='btn-clear nav-link'
										style={index === selectedStat[0] ? { color: 'rgb(187, 46, 31)' } : null}
										onClick={() => this.updateStat([index, stat[1]])}>
										{stat[0]}
									</button>
								</li>
							))}
							</ul>
							<ul className='flex-center'>
							{selectedStat[0] === 0 || selectedStat[0] === 1
								? situationsArray.map((situation, index) => (
								<li key={situation}>
									<button 
										className='btn-clear nav-link'
										style={index === selectedSitch[0] ? { color: 'rgb(187, 46, 31)' } : null}
										onClick={() => this.updateSituation([index, situation[1]])}>
										{situation[0]}
									</button>
								</li>
								))
								: null}
						</ul>
					</td>
				</tr>
				<tr>
					<td>
						<center>
						<img src={ selectedStat[0] !== 2? asURL : scURL } />
						</center>
					</td>
				</tr>
			</table>
		</React.Fragment>
		)
	}
}