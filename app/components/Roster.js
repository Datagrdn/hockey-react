import React from 'react'
import PropTypes from 'prop-types'
import Score from './Score'
import { fetchStats } from '../utils/api'
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';


function RenderStats( {selectedStat, stats} ){
	
	if(stats){
		const filteredStats = selectedStat[0] === 0 ? stats : stats.filter(play => play[0] === selectedStat[1]);

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

RenderStats.propTypes = {
	selectedStat: PropTypes.array.isRequired,
	stats: PropTypes.array.isRequired
}


export default class Roster extends React.Component {
	constructor(props) {
		super(props)

		this.updatePlayer = this.updatePlayer.bind(this)
		this.updateTeam = this.updateTeam.bind(this)
	}

	updatePlayer(newPlayer){
			this.props.onPlayerChange({
			selectedPlayer: newPlayer
		})
	}
	
	updateTeam(newTeam){
		this.props.onTeamChange({
			selectedTeam: newTeam
		})
	}

	componentDidUpdate(prevProps) {
		// if(this.props.selectedPlayer !== prevProps.selectedPlayer) {
		// 	this.updatePlayer(this.props.selectedPlayer)
		// }

		if(this.props.selectedTeam !== prevProps.selectedTeam) {
			this.updateTeam(this.props.selectedTeam)
		}

		if(this.props.gameID !== prevProps.gameID) {
			this.props.onGameChange()
		}

	}

	render(){
		const { teams, 
			selectedStat, 
			selectedPlayer, 
			rosterAway, 
			rosterHome, 
			selectedTeam, 
			stats, 
			rosterDisplay, 
			scratchesDisplay, 
			allData, 
			scoringPlays,
			content,
			onVidClose,
			onUpdateVid,
			vidVis,
			vidUrl } = this.props

		const rosterDisplayStat = [];
		rosterDisplay.forEach(player => {

			const fetchedStats = fetchStats(allData, player[1]);
			const statNumbers = selectedStat[0] === 0 
				? fetchedStats.length 
				: fetchedStats.filter(play => play[0] === selectedStat[1]).length;

			rosterDisplayStat.push([statNumbers, player[0], player[1], player[2]])
		});

		rosterDisplayStat.sort((a,b)=>b[0]-a[0]);

		return(
					<table width="100%" border="0">
						<tr>
							<td width="25%">
								{teams.map((team, index) =>(
									<li key={team}>
										<button
										className='btn-clear nav-link'
										style={selectedTeam && team === selectedTeam[1] ? { color: 'rgb(187, 46, 31)' } : null}
										onClick={() => this.updateTeam([index, team])}>
										{team}
										</button>
									</li>
								))}
								<br/>
								{rosterDisplayStat.map((playerId) => (
									<li key={playerId}>
										{playerId[1]}
										<button
										className='btn-clear nav-link'
										style={playerId[2] === selectedPlayer ? { color: 'rgb(187, 46, 31)' } : null}
										onClick={() => this.updatePlayer(playerId[2])}>
										{playerId[3] 
											? playerId[2] + playerId[3]
											: playerId[2]}
										</button>
									</li>
								))}
								{scratchesDisplay && scratchesDisplay.length > 0
									? <p>Scratches</p>
									: null}
								{scratchesDisplay
									? scratchesDisplay.map((playerId) => (
									<li key={playerId}>
										{playerId[0]}&nbsp;
										<b>{playerId[2] 
											? playerId[1] + playerId[2]
											: playerId[1]}</b>
									</li>
								))
									: null}								
								<br/>
							</td>
							<td>
								{stats === null
									?	
									<center>
										<Score
									  		allData={allData}
									  		scoringPlays={scoringPlays}
									  		gameID={gameID}
									  		content={content}
									  		onVidClose={onVidClose}
									  		onUpdateVid={onUpdateVid}
									  		vidVis={vidVis}
									  		vidUrl={vidUrl}
									  		width={803}
									  		height={430}
									  	/>
								  	</center>

									: <RenderStats 
												selectedStat={selectedStat}
												stats={stats}
												rosterDisplay={rosterDisplay}
											/>}
							</td>
							<td width="15%">
								 <TwitterTimelineEmbed
								  sourceType="profile"
								  screenName="charlieo_conn"
								  options={{height: 700}}
								/>
							</td>
						</tr>
					</table>
		)
	}
}