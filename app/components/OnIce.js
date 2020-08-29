import React from 'react'
import TriggerTest from './TriggerTest'
import PlayerCard from './PlayerCard'
import ReactHover, { Trigger, Hover } from 'react-hover'

const optionsCursorTrueWithMargin = {
      followCursor:true,
      shiftX: 0,
      shiftY: -200
}

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
		console.log(onIce)
		
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
					<ul className='flex-center'>
					{onIce
						? onIce[teamUp][0].map((player) => (
								<li key={player}>
									{player[0]}
									<ReactHover options={optionsCursorTrueWithMargin}>
									<Trigger type="trigger">
										<button
											className='btn-clear onIce-link'
											style={player[1] === selectedPlayer ? { color: 'rgb(187, 46, 31)' } : null}
											onClick={() => this.updatePlayer(player[1])}>
											{player[1]}
										</button>	
									</Trigger>
								 <Hover type="hover">
                  <PlayerCard 
                  	selectedPlayer={player[1]}
                  />
                </Hover>
									</ReactHover>	
								{player[2]}{player[3]}	
								</li>
							))
						: null}
						</ul>
					<br/>
			</React.Fragment>
		)
	}
}
