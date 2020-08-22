import React from 'react'
import PropTypes from 'prop-types'
import Roster from './Roster'
import Score from './Score'
import Schedule from './Schedule'
import OnIce from './OnIce'
import GameFlow from './GameFlow'
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
			twitterIDCount: 0,
		}

		this.updateStat = this.updateStat.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		// this.gameChanged = this.gameChanged.bind(this)
		this.playerChanged = this.playerChanged.bind(this)
		this.teamChanged = this.teamChanged.bind(this)
		this.clearStats = this.clearStats.bind(this)
		this.setTeams = this.setTeams.bind(this)
		// this.updatePlayer = this.updatePlayer.bind(this)
		this.scheduleState = this.scheduleState.bind(this)
		this.incrementDate = this.incrementDate.bind(this)
		this.decrementDate = this.decrementDate.bind(this)
		this.updateGF = this.updateGF.bind(this)
		this.updateVid = this.updateVid.bind(this)
		this.vidClose = this.vidClose.bind(this)
		this.incrementTwitterAccount = this.incrementTwitterAccount.bind(this)
		this.decrementTwitterAccount = this.decrementTwitterAccount.bind(this)
	}


	incrementTwitterAccount(){
		const { handleArray, twitterIDCount } = this.state
		console.log(twitterIDCount)

		this.setState({
			twitterIDCount: twitterIDCount + 1,
			currentHandle: handleArray[twitterIDCount],
		})
	}

	decrementTwitterAccount(){
		const { handleArray, twitterIDCount } = this.state

		this.setState({
			twitterIDCount: twitterIDCount - 1,
			// handle: handleArray[twitterIDCount],
		})
	}

	updateGF(gameID) {

		if(this.state.gfVis === false){
			this.setState({
				gfVis: true,
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

	playerChanged(newPlayer) {
		const { allData, selectedPlayer, selectedPlayerP } = this.state

		this.setState(prevState => {

			const newState = {};
			newState.vidVis = false;

			if(newPlayer.selectedPlayer != prevState.selectedPlayer){
				newState.selectedPlayer = newPlayer.selectedPlayer;
				newState.stats = fetchStats(allData, newPlayer.selectedPlayer);
			} else {
				newState.selectedPlayer = null;
				newState.stats = null;
			}

			return newState;
			}
		)
	}

	teamChanged(newTeam) {
		const { selectedTeam } = this.state

		this.setState(
			newTeam,
		)

		if(this.state.selectedTeam[0] === 0){
			this.setState({
				rosterDisplay: this.state.teams[2],
				scratchesDisplay: this.state.teams[4],
				twitterIDCount: 0,
			})
		} else if(this.state.selectedTeam[0] === 1) {
			this.setState({
				rosterDisplay: this.state.teams[3],
				scratchesDisplay: this.state.teams[5],
				twitterIDCount: 0,
			})
		}

		const handles = {
			PHItwitter: [
			 'BroadStHockey',
			 'charlieo_conn',
			 'TimRiday',
			 'BILLadelphia1',
			 '2Murphy8',
			 'JHallNBCS',
			 'brad_keffer',
			 'Kurt_BSH',
			 'BroadStBull'],
			NYItwitter: [
			 'LHHockey',
			 'stapeathletic',
			 'AndyGraz_WFAN',
			 'Shannon_Hogan',
			 'BComptonNHL',
			 'IslesBlog',
			 'IslesTerritory',
			 'IslesWhiteSUV',			 
			 'NYIslesNation',
			 'islandermania'],
			WSHtwitter: ['JapersRink', 'Tarik_ElBashir'],
			DALtwitter: ['DefendingBigD', 'seanshapiro'],
			CGYtwitter: ['MatchsticksCGY', 'ByCruickshank'],
			MTLtwitter: ['HabsEOTP', 'ArponBasu', 'EricEngels', 'RinksideView', 'jaredbook', 'AZadarski'],
			COLtwitter: ['MileHighHockey'],
			ARItwitter: ['Five4Howling'],
			BOStwitter: [
			 'cupofchowdah',
			 'BruinsDaily',
			 'FlutoShinzawa',
			 'HackswithHaggs',
			 'JoeyMacHockey',
			 'BlackAndGold277',
			 'ewalsh90'],
			TBLtwitter: [
				'RawCharge',
				'JoeSmithTB',
				'CaleyChelios',
				'BBurnsNHL',
				'Erik_Erlendsson',
				''],
			CARtwitter: 'CanesCountry',
			CBJtwitter: ['cbjcannon'],
			STLtwitter: ['StLouisGameTime', 'jprutherford'],
			VANtwitter: ['nucksmisconduct', 'ThomasDrance', 'patersonjeff', 'TrevBeggs', 'harmandayal2'],
			VGKtwitter: ['knightsonice'],
			CHItwitter: ['2ndCityHockey'],
			TORtwitter: ['PPPLeafs']
		};

		const handleArray = selectedTeam && selectedTeam.length == 2 ? handles[`${selectedTeam[1]}twitter`] : null;

		this.setState(prevState =>{
			const newState = {};

			if(handleArray != prevState.handleArray){
				newState.handleArray = handleArray;
				newState.phandleArray = prevState.handleArray;
			} else {
				newState.handleArray = null;
			}
			return newState;
		})

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
			content,
			shots: shots(this.state.allData)
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
				rendered: true,
				erorr: null,
			}, () => this.setState({
				onIce: onIce(this.state.allData)}
			))
			this.teamChanged([0,teams[0]])
		} else if(this.state.gameID !== this.state.gameIDP) {
			this.setState({
					teams,
					selectedTeam: [0, teams[0]],
					erorr: null
				}, () => this.setState({
					onIce: onIce(this.state.allData)}, () => this.setState({
					gfVis: false,
				})
			))
			this.teamChanged([0,teams[0]])
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
				if(gameID != prevState.gameID){
					newState.twitterIDCount = 0
				}
				return newState
			}, () => this.apiCall())
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
		const { allData, 
			gameState, 
			selectedStat, 
			teams, 
			scoreBoard, 
			gameID, 
			selectedPlayer, 
			selectedTeam, 
			rosterDisplay, 
			scratchesDisplay, 
			stats, 
			error, 
			scoringPlays, 
			onIce, 
			shots, 
			schedule, 
			content, 
			increment, 
			gfVis,
			handleArray } = this.state

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
						?<p>Advanced Stats</p>
						:<p><FaTimesCircle /></p>}
					</button>
				: null }
				{gfVis === true
					?<GameFlow
						gameID={gameID}
					/>
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
		  		teams={teams ? [teams[0], teams[1]] : []}
		  		rosterDisplay={rosterDisplay}
		  		scratchesDisplay={scratchesDisplay}		  		
		  		allData={allData}
		  		selectedTeam={selectedTeam}
		  		onTeamChange={this.teamChanged} 
		  		selectedStat={selectedStat}
		  		onGameChange={this.clearStats}
		  		stats={stats}
		  		gameID={gameID}
		  		selectedPlayer={selectedPlayer}
		  		onPlayerChange={this.playerChanged}
		  		scoringPlays={scoringPlays}
					content={content}
		  		onVidClose={this.vidClose}
		  		onUpdateVid={this.updateVid}
		  		vidVis={this.state.vidVis}
		  		vidUrl={this.state.vidUrl}
		  		handle={handleArray != null ? handleArray[this.state.twitterIDCount] : null}
		  		phandle={this.state.phandle != null ? this.state.phandleArray[this.state.twitterIDCount] : null}
		  		incrementTwitterAccount={this.incrementTwitterAccount}
		  		decrementTwitterAccount={this.decrementTwitterAccount}
		  		handleLengthInfo={handleArray != null ? [this.state.twitterIDCount, handleArray.length - 1] : null}
		  		/>
		  	{stats !== null
		  		? <Score
		  		allData={allData}
		  		scoringPlays={scoringPlays}
		  		gameID={gameID}
		  		content={content}
		  		onVidClose={this.vidClose}
		  		onUpdateVid={this.updateVid}
		  		vidVis={this.state.vidVis}
		  		vidUrl={this.state.vidUrl}
		  		width={1003}
		  		height={630}
		  	/>
		  		: null}
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