import React from 'react'
import TriggerTest from './TriggerTest'
import PlayerCard from './PlayerCard'
import { fetchStats } from '../utils/api'
import ReactHover, { Trigger, Hover } from 'react-hover'

const optionsCursorTrueWithMargin = {
      followCursor:true,
      shiftX: 20,
      shiftY: -170
}

export default class OnIce extends React.Component {
	constructor(props){
		super(props)

		this.updatePlayer = this.updatePlayer.bind(this)
	}

	// parsePlayer(playerID){
	// 	console.log(fetchPlayerCard(playerID))
	// }

	updatePlayer(newPlayer, newPlayerId){
			this.props.onPlayerChange({
			selectedPlayer: newPlayer,
			selectedPlayerID: newPlayerId,
		})
	}

	render(){
		const { teamUp, teamLow, teams, allData, onIce, selectedPlayer, tri, stats } = this.props
		const onPP = allData ? allData.liveData.linescore.teams[teamLow].powerPlay : null;
		const en = allData ? allData && allData.liveData.linescore.teams[teamLow].goaliePulled : null;

		return(
			<React.Fragment>
				<br/><br/><br/><br/>

				{onIce && onIce[teamUp][0].length > 1
					? <h3>On Ice {teams 
												? teams[[tri]]
												: null} 
												{onPP 
													? ' (PP)' 
													: null}
												{en 
													? ' (EN)' 
													: null}</h3>
					: null}
					{onIce
						? onIce[teamUp][0].map((player) => (
								<li key={player}>
								 <div style={{ display: "flex" }}>
									{player[1]}
									<ReactHover options={optionsCursorTrueWithMargin}>
									<Trigger type="trigger">
										<button
											className='btn-clear onIce-link'
											style={player[2] === selectedPlayer ? { color: 'rgb(187, 46, 31)' } : null}
											// onMouseOver={() => this.parsePlayer(player[0])}
											onClick={() => this.updatePlayer(player[2], player[0])}>
											{player[2]}
										</button>	
									</Trigger>
								 <Hover type="hover">
                  <PlayerCard 
                  	selectedPlayer={player[2]}
                  	selectedPlayerID={player[0]}
                  	stats={fetchStats(allData, player[2])}
                  	where={'OnIce'}
                  />
                </Hover>
									</ReactHover>	
								{player[3]}{player[4]}	
								</div>
								</li>
							))
						: null}

					<br/>
			</React.Fragment>
		)
	}
}
