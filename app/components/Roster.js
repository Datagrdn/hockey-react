import React from 'react'
import PropTypes from 'prop-types'
import Score from './Score'
import PreviewStats from './PreviewStats'
import PlayerCard from './PlayerCard'
import LineCombos from './LineCombos'
import { fetchStats, fetchPlayerCard } from '../utils/api'
import Twidget from './Twidget'
import { Timeline } from 'react-twitter-widgets'
import rp from "request-promise";
import cheerio from "cheerio"
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaWindowMaximize } from 'react-icons/fa'



function RenderStats( {selectedStat, stats} ){
	
	if(stats){
		const filteredStats = selectedStat[0] === 0 ? stats.filter(play => play[0] != "FACEOFF") : stats.filter(play => play[0] === selectedStat[1]);

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

		const period5PlaysReturn = period5PlaysFormatted.length !== 0 ? [<h2>OT 2</h2>, <p>{period5PlaysFormatted}</p>] : null;
		
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

		this.state = {
			twitterIDCount: 0,
		}

		this.updatePlayer = this.updatePlayer.bind(this)
		this.updateTeam = this.updateTeam.bind(this)
		this.incrementTwitterAccount = this.incrementTwitterAccount.bind(this)
		this.decrementTwitterAccount = this.decrementTwitterAccount.bind(this)
		this.toggleTwitMain = this.toggleTwitMain.bind(this)
		this.toggleShowLines = this.toggleShowLines.bind(this)
		this.makeTwitMain = this.makeTwitMain.bind(this)
		// this.clearTwitMain = this.clearTwitMain.bind(this)

	}

	updatePlayer(newPlayer, newPlayerID){
		// console.log(newPlayerID)
			this.props.onPlayerChange({
			selectedPlayer: newPlayer,
			selectedPlayerID: newPlayerID
		})
			this.props.clearTwitMain()
	}
	
	updateTeam(newTeam){
		this.props.onTeamChange({
			selectedTeam: newTeam
		})
	}

	toggleTwitMain(){
		this.props.toggleTwitMain()
	}

	toggleShowLines(){
		this.props.toggleShowLines()
	}

	closeLines(){
		this.props.closeLines()
	}

	makeTwitMain(){
		this.props.makeTwitMain()
	}

	incrementTwitterAccount(){
		this.props.incrementTwitterAccount()
	}

	decrementTwitterAccount(){
		this.props.decrementTwitterAccount()
	}

	componentDidUpdate(prevProps) {
		if(this.props.selectedTeam !== prevProps.selectedTeam) {
			this.updateTeam(this.props.selectedTeam)
		}

		if(this.props.gameID !== prevProps.gameID) {
			this.props.onGameChange()
		}
	}

	render(){
		const { teams,
			teamsFull, 
			selectedStat, 
			selectedPlayer, 
			selectedPlayerID,
			rosterAway, 
			rosterHome, 
			selectedTeam, 
			stats, 
			rosterDisplay, 
			scratchesDisplay, 
			allData,
			gameState,
			gameID,
			coaches, 
			scoringPlays,
			content,
			onVidClose,
			onUpdateVid,
			vidVis,
			vidUrl,
			handle,
			phandle,
			incrementTwitterAccount,
			decrementTwitterAccount,
			handleLengthInfo,
			twitMain,
			showLines } = this.props;

		const rosterDisplayStat = [];
		rosterDisplay.forEach(player => {
			const fetchedStats = fetchStats(allData, player[2]);
			const statNumbers = selectedStat[0] === 0 
				? fetchedStats.length 
				: fetchedStats.filter(play => play[0] === selectedStat[1]).length;

			rosterDisplayStat.push([statNumbers, player[0], player[1], player[2], player[3] != null ? player[3] : null])
		});

		rosterDisplayStat.sort((a,b)=>b[0]-a[0]);

		return(
			<table width="100%" border="0" bgcolor="#eeeeee">
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
						<button
							className='btn-clear nav-link'
							style={showLines == true ? { color: 'rgb(187, 46, 31)' } : null}
							onClick={() => this.toggleShowLines()}>
							Show Lines
						</button>
						{coaches && coaches.length > 0
							? <React.Fragment>
									<p>HC 
										<b className='nav-link'> {coaches[selectedTeam[0]]}</b>
									</p>
								</React.Fragment>
							: null}					
							{rosterDisplayStat.map((playerId) => (
								<li key={playerId}>
									{playerId[2]}
									<button
										className='btn-clear nav-link'
										style={playerId[3] === selectedPlayer ? { color: 'rgb(187, 46, 31)' } : null}
										onClick={() => this.updatePlayer(playerId[3], playerId[1])}>
										{playerId[4] 
											? playerId[3] + playerId[4]
											: playerId[3]}
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
						{showLines == true
							? <React.Fragment>
								<center>
									<LineCombos 
										teams={teamsFull}
										selectedTeam={selectedTeam}
										toggleShowLines={this.toggleShowLines}
										updatePlayer={this.updatePlayer}
									/>
								<br/>
								</center>	
								</React.Fragment>
							: null}
						{stats == null && twitMain == false && gameState != 'Preview'
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
							  		width={843}
							  		height={470}
							  	/>
						  	</center>
							: gameState == 'Preview' && twitMain != true
								?	<center>
									<h2>Game Preview</h2>
										<PreviewStats
							  			gameID={gameID}
							  			makeTwitMain={this.makeTwitMain}							  			
							  		/>
									</center>
							: twitMain == true
								?<Twidget 
									handleLengthInfo={handleLengthInfo}
									toggleTwitMain={this.toggleTwitMain}
									incrementTwitterAccount={this.incrementTwitterAccount}
									decrementTwitterAccount={this.decrementTwitterAccount}
									handle={handle}
									moveButton={true}
									selectedTeam={selectedTeam}
									height={800}
									width={550}
								/>
							:	<React.Fragment>
									<center>
									<PlayerCard 
										selectedPlayer={selectedPlayer}
										selectedPlayerID={selectedPlayerID}
										where={'Roster'}
                  	stats={allData ? fetchStats(allData, selectedPlayer) : null}
									/>
									</center>
									<RenderStats 
										selectedStat={selectedStat}
										stats={stats}
										rosterDisplay={rosterDisplay}
									/>
								</React.Fragment>
						}
						
					</td>
					<td width="20%">
						{handle != phandle && handle != null && twitMain != true && vidVis != true && gameID != 'Waiting'
							? <Twidget 
										handleLengthInfo={handleLengthInfo}
										toggleTwitMain={this.toggleTwitMain}
										incrementTwitterAccount={this.incrementTwitterAccount}
										decrementTwitterAccount={this.decrementTwitterAccount}									
										handle={handle}
										moveButton={true}
										selectedTeam={selectedTeam}
										height={800}
										width={550}
									/>
							: null}
					</td>
				</tr>
			</table>
		)
	}
}