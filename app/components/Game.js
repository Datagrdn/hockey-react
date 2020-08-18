import React from 'react'
import PropTypes from 'prop-types'
import Roster from './Roster'
import Score from './Score'
import Schedule from './Schedule'
import OnIce from './OnIce'
import { FaTimesCircle } from 'react-icons/fa'
import { setURL, fetchTeams, fetchScoreboard, fetchSchedule, fetchContent, fetchStats, fetchAllData, onIce, shots } from '../utils/api'

function RenderStatBar ({ selected, onUpdateStat}) {
	const statArrays = [['All', 'All'], ['Goal', 'GOAL'], ['Assist', 'GOAL'], ['Hit', 'HIT'], ['Penalty', 'PENALTY'], ['Shot', 'SHOT'], ['Blocked Shot', 'BLOCKED_SHOT'], ['Missed Shot', 'MISSED_SHOT'], ['Giveaway', 'GIVEAWAY'], ['Takeaway', 'TAKEAWAY'], ['Faceoff', 'FACEOFF']]
	return (
		<ul className='flex-center'>
			{statArrays.map((stat, index) => (
				<li key={stat}>
					<button 
						className='btn-clear nav-link'
						style={index === selected[0] ? { color: 'rgb(187, 46, 31)' } : null}
						onClick={() => onUpdateStat([index, stat[1]])}>
						{stat[0]}
					</button>
				</li>
				))}
		</ul>
	)
}


RenderStatBar.propTypes = {
	selected: PropTypes.array.isRequired,
	onUpdateStat: PropTypes.func.isRequired
}

export default class Game extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			selectedStat: [0, "All"],
			selectedPlayer: null,
			gameID: null,
			teams: null,
			selectedTeam: [],
			rosterDisplay: [],
			scoreBoard: [],
			increment: 0,
			content: null,
			error: null,
			rendered: false,
			vidVis:false,
			vidUrl: null,
			gfVis: false,
			gfURL: null,
		}

		this.updateStat = this.updateStat.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		// this.gameChanged = this.gameChanged.bind(this)
		this.playerChanged = this.playerChanged.bind(this)
		this.teamChanged = this.teamChanged.bind(this)
		this.clearStats = this.clearStats.bind(this)
		this.setTeams = this.setTeams.bind(this)
		this.updatePlayer = this.updatePlayer.bind(this)
		this.scheduleState = this.scheduleState.bind(this)
		this.incrementDate = this.incrementDate.bind(this)
		this.decrementDate = this.decrementDate.bind(this)
		this.updateGF = this.updateGF.bind(this)
		this.updateVid = this.updateVid.bind(this)
		this.vidClose = this.vidClose.bind(this)
	}

	updateGF(gameID) {

		if(this.state.gfVis === false){
			this.setState({
				gfVis: true,
				gfURL: `https://embed.naturalstattrick.com/gameflow.php?season=20192020&game=${gameID.toString().substring(5, 10)}`
			})
		} else {
			this.setState({
				gfVis: false,
			})
		}
	}

	updateVid(vidUrl) {

		this.setState({
			vidUrl,
			vidVis: true,
		})
	}

	vidClose() {
		this.setState({
			vidVis: false
		})
	}

	// gameChanged(newGame) {
	// 	console.log(newGame)
	// 	this.setState({
	// 		newGame
	// 	})
	// }

	playerChanged(newPlayer) {
		const { allData, selectedPlayer } = this.state

		this.setState(
			newPlayer
		)
		this.setState({
			stats: fetchStats(allData, selectedPlayer)
		})
	}

	teamChanged(newTeam) {
		this.setState(
			newTeam,
		)

		if(this.state.selectedTeam[0] === 0){
			this.setState({
				rosterDisplay: this.state.rosterAway
			})
		} else if(this.state.selectedTeam[0] === 1) {
			this.setState({
				rosterDisplay: this.state.rosterHome
			})
		}
	}

	clearStats() {
	this.setState({
		stats: null,
	})
}

	apiCall() {
		fetchAllData(this.state.gameID)
				.then((allData) => this.setState({
					allData,
					scoringPlays: allData.liveData.plays.scoringPlays,
					gameState: allData.gameData.status.abstractGameState,
					erorr: null,
				}, () => this.setState({
					scoreBoard: fetchScoreboard(this.state.allData, this.state.gameState)
					}, this.setTeams(this.state.gameID))
				))
				.catch(() => {
					console.warn('Error fetching game data', error)
					this.setState({
						error: 'There was an error fetching the game data'
					})
				})
		fetchContent(this.state.gameID)
		.then((content) => this.setState({
			content
		}))
	}

	scheduleState() {
		fetchSchedule(this.state.increment)
		.then((schedule) => {
			this.setState({
			schedule
		})
			return schedule})
	}

	setTeams (newID) {
		const teams = fetchTeams(this.state.allData);
		if(this.state.rendered === false){
			this.setState({
				teams,
				selectedTeam: [0,teams[0]],
				rosterAway: teams[2],
				rosterHome: teams[3],
				rendered: true,
				erorr: null,
			}, () => this.setState({
				onIce: onIce(this.state.allData)}, () => this.setState({
					shots: shots(this.state.allData),
				})
			))
		} else if(this.state.gameID !== this.state.gameIDP) {
			this.setState({
					teams,
					rosterAway: teams[2],
					rosterHome: teams[3],
					selectedTeam: [0, teams[0]],
					erorr: null
				}, () => this.setState({
					onIce: onIce(this.state.allData)}, () => this.setState({
					shots: shots(this.state.allData),
					gfVis: false,
				})
			))
		}
	}

	updateStat (selectedStat) {
		this.setState({
			selectedStat,
			error: null,
		})
	}

	handleSubmit(gameID) {
		// console.log('Refresh')
		this.setState(prevState => {
			const newState = {}
				newState.gameID = gameID
				newState.gameIDP = prevState.gameID
				return newState
			}, () => this.apiCall())
	}

	updatePlayer(newPlayer){
		this.setState({
			selectedPlayer: newPlayer
		})
	}

	incrementDate(){
		this.setState({
			increment: this.state.increment + 1
		}, () => this.scheduleState())
	}

	decrementDate(){
		this.setState({
			increment: this.state.increment - 1
		}, () => this.scheduleState())
	}

	render(){
		const { allData, gameState, selectedStat, teams, scoreBoard, gameID, selectedPlayer, selectedTeam, rosterAway, rosterHome, rosterDisplay, stats, error, scoringPlays, onIce, shots, schedule, content, increment, gfVis, gfURL } = this.state

		return (
			<React.Fragment>
			<center>
			<table border='0'>
			<Schedule 
				fetchSchedule={this.scheduleState}
				schedule={schedule}
				onSubmit={(gameID) => this.handleSubmit(gameID)}
				currentGameID={this.state.gameID}
				increment={increment}
				incrementFunc={this.incrementDate}
				decrementFunc={this.decrementDate}
		  	closeVid={this.vidClose}				
			/>
			</table>
			<table border='0' width='100%'>
			<tr>
			<td width="20%">
			<center>
				<OnIce
					teamUp='Away'
					teamLow='away'
					teams={teams}
					onIce={onIce}
					allData={allData}
					selectedPlayer={selectedPlayer}
					onPlayerChange={this.playerChanged}
					tri='0'
				/>
						<br/>
					{shots && gameState !== "Preview"
						? <p>SOG {shots[0]}</p>
						: null}
			</center>
			</td>
			<td width="60%">
			<center>
				<h1>{scoreBoard[0]}</h1>
				<h2>{scoreBoard[1]}</h2>
				{scoreBoard[2]
					?<h4>{scoreBoard[2]} - {scoreBoard[3]}</h4>
					: null
				}
				{allData && gameState !== "Preview"
					? [<h3>Current Play</h3>, <p>{allData.liveData.plays.currentPlay.result.description}</p>]
					: allData && gameState === "Preview" ? [<h3>Current Play</h3>, <p>{gameState}</p>]
					: null }
				{scoreBoard.length !== 0 && gameState !== "Preview"
				? <button
						className='btn-clear nav-link'
						onClick={() => this.updateGF(gameID)}>
					{gfVis === false
						?<p>Corsi Graphs</p>
						:<p><FaTimesCircle /></p>}
					</button>
				: null }
				{gfVis === true
					?<div class="embed-container">
					<iframe frameBorder="0" src={gfURL}></iframe>
					</div>
					: null}
				</center>
				</td>
				<td width="20%">
				<center>
				<OnIce
					teamUp='Home'
					teamLow='home'
					teams={teams}
					onIce={onIce}
					allData={allData}
					selectedPlayer={selectedPlayer}
					onPlayerChange={this.playerChanged}
					tri='1'
				/>
						<br/>
						{shots && gameState !== "Preview"
							? <p>SOG {shots[1]}</p>
							: null}
				</center>
				</td>
				</tr>
				</table>
				<br/>
				<RenderStatBar 
					selected={selectedStat}
					onUpdateStat={this.updateStat}
				/>
				<GameInput
					label=''
					gameID={this.state.gameID}
					onGameChange={this.gameChanged}
					onSubmit={(gameID) => this.handleSubmit(gameID)}
					value={this.state.gameID}
					onChange={this.handleChange}
				/>
				<Roster 
		  		teams={teams ? [teams[0], teams[1]] : ["Away","Home"]}
		  		rosterAway={rosterAway}
		  		rosterHome={rosterHome}
		  		rosterDisplay={rosterDisplay}
		  		allData={allData}
		  		selectedTeam={selectedTeam}
		  		onTeamChange={this.teamChanged} 
		  		selectedStat={selectedStat}
		  		onGameChange={this.clearStats}
		  		stats={stats}
		  		gameID={gameID}
		  		selectedPlayer={selectedPlayer}
		  		onPlayerChange={this.playerChanged}
		  		/>
		  	<Score
		  		allData={allData}
		  		scoringPlays={scoringPlays}
		  		gameID={gameID}
		  		content={content}
		  		onVidClose={this.vidClose}
		  		onUpdateVid={this.updateVid}
		  		vidVis={this.state.vidVis}
		  		vidUrl={this.state.vidUrl}
		  	/>
				{error && <p>{error}</p>}
				</center>
			</React.Fragment>
		)
	}
}

class GameInput extends React.Component {
	constructor(props) {
		super(props)

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleSubmit(event) {
		event.preventDefault()

		this.props.onSubmit(this.props.gameID)
	}

	handleChange(event) {
		this.props.onGameChange({
			gameID: event.target.value
		})
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label htmlFor='gameID'>
					{this.props.label}
				</label>
				<div>
					<input
						type='text'
						id='gameID'
						placeholder='Enter Game ID Number'
						onChange={this.handleChange}
					/>
					<button
						type='submit'
						disabled={!this.props.gameID}
					>
						Refresh
					</button>
				</div>
			</form>
		)
	}
}

GameInput.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired
}