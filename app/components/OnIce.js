import React from 'react'

export default class OnIce extends React.Component {
	constructor(props){
		super(props)

		this.updatePlayer = this.updatePlayer.bind(this)
	}

	updatePlayer(newPlayer){
			this.props.onPlayerChange({
			selectedPlayer: newPlayer
		})
	}

	render(){
		const { teamUp, teamLow, teams, allData, onIce, selectedPlayer, tri } = this.props

		return(
			<React.Fragment>
				<br/><br/><br/><br/>
				{onIce && onIce[teamUp][0].length > 1
					? <h3>On Ice {teams ? teams[[tri]] : null}</h3>
					: null}
					{allData && allData.liveData.linescore.teams[teamLow].powerPlay === true
						?<p>(PP)</p>
						: null}
					{allData && allData.liveData.linescore.teams[teamLow].goaliePulled === true
						?<p>(EN)</p>
						: null}
					{onIce
						? onIce[teamUp][0].map((player) => (
								<li key={player}>
									{player[0]}
										<button
											className='btn-clear onIce-link'
											style={player[1] === selectedPlayer ? { color: 'rgb(187, 46, 31)' } : null}
											onClick={() => this.updatePlayer(player[1])}>
											{player[1]}
										</button>
									{player[2]}{player[3]}
								</li>
							))
						: null}
			</React.Fragment>
		)
	}
}
