import React from 'react'
import PropTypes from 'prop-types'
import Roster from './Roster'
import Score from './Score'
import Schedule from './Schedule'
import OnIce from './OnIce'
import GameFlow from './GameFlow'
import Twidget from './Twidget'
import Scoreboard from './Scoreboard'
import NHLNews from './NHLNews'
import { setURL, 
				fetchTeams, 
				fetchScoreboard, 
				fetchSchedule, 
				fetchContent, 
				fetchStats, 
				fetchAllData, 
				onIce, 
				shots, 
				hits, 
				fos,
				gva,
				tka, 
				coaches } from '../utils/api'

function RenderStatBar ({ selected, onUpdateStat}) {
	const statArrays = [['All', 'All'], ['Goal', 'GOAL'], ['Assist', 'ASSIST'], ['Hit', 'HIT'], ['Penalty', 'PENALTY'], ['Shot', 'SHOT'], ['Blocked Shot', 'BLOCKED_SHOT'], ['Missed Shot', 'MISSED_SHOT'], ['Giveaway', 'GIVEAWAY'], ['Takeaway', 'TAKEAWAY'], ['Faceoff', 'FACEOFF']]
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
			showLines: false
		}

		this.updateStat = this.updateStat.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.playerChanged = this.playerChanged.bind(this)
		this.teamChanged = this.teamChanged.bind(this)
		this.clearStats = this.clearStats.bind(this)
		this.setTeams = this.setTeams.bind(this)
		this.scheduleState = this.scheduleState.bind(this)
		this.incrementDate = this.incrementDate.bind(this)
		this.decrementDate = this.decrementDate.bind(this)
		this.updateGF = this.updateGF.bind(this)
		this.updateVid = this.updateVid.bind(this)
		this.vidClose = this.vidClose.bind(this)
		this.incrementTwitterAccount = this.incrementTwitterAccount.bind(this)
		this.decrementTwitterAccount = this.decrementTwitterAccount.bind(this)
		this.toggleTwitMain = this.toggleTwitMain.bind(this)
		this.toggleShowLines = this.toggleShowLines.bind(this)
		this.makeTwitMain = this.makeTwitMain.bind(this)
		this.clearTwitMain = this.clearTwitMain.bind(this)
	}


	incrementTwitterAccount(){
		const { handleArray, twitterIDCount } = this.state

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

	toggleTwitMain(){
		this.setState(prevState => {
			const newState = {};
			if(prevState.twitMain != true){
				newState.twitMain = true
			} else {
				newState.twitMain = false
			}
			return newState
		})
	}

	toggleShowLines(){
		this.setState(prevState => {
			const newState = {};
			if(prevState.showLines != true){
				newState.showLines = true
			} else {
				newState.showLines = false
			}
			return newState
		})
	}

	makeTwitMain(){
		this.setState({
			twitMain: true
		})
	}

	clearTwitMain(){
		this.setState({
			twitMain: false
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
				newState.selectedPlayerID = newPlayer.selectedPlayerID;
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
		const handles = {
			PHItwitter: [
			 'BroadStHockey',
			 'charlieo_conn',
			 'jasonmyrt',
			 'TimRiday',
			 'AnthonyMingioni',
			 'BILLadelphia1',
			 '2Murphy8',
			 'JHallNBCS',
			 'brad_keffer',
			 'Kurt_BSH',
			 'BroadStBull',
			 'ronlextall'],
			NYItwitter: [
			 'LHHockey',
			 'stapeathletic',
			 'AndyGraz_WFAN',
			 'cultureoflosing',
			 'Shannon_Hogan',
			 'BComptonNHL',
			 'IslesBlog',
			 'IslesTerritory',
			 'IslesWhiteSUV',			 
			 'NYIslesNation',
			 'islandermania'],
			WSHtwitter: ['JapersRink', 'Tarik_ElBashir'],
			DALtwitter: [
			 'DefendingBigD',
			 'seanshapiro',
			 'Matthew_N_Day',
			 'MikeHeika',
			 'OwenNewkirk',
			 'StarsNationDAL',
			 'StarsAsylum'],
			CGYtwitter: ['MatchsticksCGY', 'ByCruickshank'],
			MTLtwitter: ['HabsEOTP', 'ArponBasu', 'EricEngels', 'RinksideView', 'jaredbook', 'AZadarski'],
			COLtwitter: [
			 'MileHighHockey',
			 'adater',
			 'ColHockeyNow',
			 '0ffScottFree',
			 'RTSmithSports',
			 'AshGloverHockey',
			 'GeorgeTalksAvs',
			 'hoosierjm26'],
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
			VGKtwitter: ['knightsonice', 'SinBinVegas'],
			CHItwitter: ['2ndCityHockey'],
			TORtwitter: ['PPPLeafs'],
			NHLtwitter: ['JShannonhl', 'DarrenDreger', 'hockeynight', 'rayferrarotsn', 'mike_p_johnson', '10PSharp'],
			Statstwitter: ['EvolvingHockey', 'FauxCentre', 'MoneyPuckdotcom', 'NatStatTrick', 'CapFriendly', 'JFreshHockey']
		};

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
		} else if(this.state.selectedTeam[0] === 3){
			this.setState({
				twitterIDCount: 0,
			})
		}

		const handleArray = newTeam.selectedTeam ? handles[`${newTeam.selectedTeam[1]}twitter`] : handles[`${selectedTeam[1]}twitter`];

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

handleSubmit(gameID) {
	// console.log('Refresh')
	this.setState(prevState => {
		const newState = {}
			newState.gameID = gameID;
			newState.gameIDP = prevState.gameID;
			if(gameID != prevState.gameID){
				newState.twitterIDCount = 0;
				newState.twitMain = false;
				newState.showLines = false;
			}
			if(gameID == 'Waiting'){
				this.setState({
					selectedTeam: [3, "NHL"]
				}, () => this.teamChanged(this.state.selectedTeam))
			}
			return newState
		}, () => this.apiCall())
	}

	apiCall() {
		fetchAllData(this.state.gameID)
				.then((allData) => this.setState(prevState => {
					const newState = {}
					newState.allData = allData;
					newState.scoringPlays = allData.liveData.plays.scoringPlays;
					newState.gameState = allData.gameData.status.abstractGameState;
					newState.erorr = null;
					newState.scoreBoard = fetchScoreboard(allData, allData.gameData.status.abstractGameState);
					newState.shots = shots(allData);
					newState.hits = hits(allData);
					newState.fos = fos(allData);
					newState.tka = tka(allData);
					newState.gva = gva(allData);
					newState.coaches = coaches(allData);
					newState.onIce = onIce(allData);
					return newState;
				}, () => this.setTeams(this.state.gameID)))
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
			this.setState(prevState => {
				const newState = {}
					newState.teams = teams;
					newState.selectedTeam = [0,teams[0]];
					newState.rendered = true;
					newState.erorr = null;
					return newState;
			}, () =>  this.teamChanged([0,teams[0]]))
		} else if(this.state.gameID !== this.state.gameIDP) {
			this.setState(prevState => {
				const newState = {}
					newState.teams = teams;
					newState.selectedTeam = [0, teams[0]];
					newState.erorr = null;
					newState.gfVis = false;
					return newState;
			}, () => this.teamChanged([0, teams[0]]))
		}
	}

	updateStat (selectedStat) {
		this.setState({
			selectedStat,
			error: null,
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
		const { allData, 
			gameState, 
			selectedStat, 
			teams, 
			scoreBoard, 
			gameID, 
			selectedPlayer, 
			selectedPlayerID,
			selectedTeam, 
			rosterDisplay, 
			scratchesDisplay, 
			stats, 
			error, 
			scoringPlays, 
			onIce, 
			shots,
			hits,
			fos,
			tka,
			gva,
			coaches, 
			schedule, 
			content, 
			increment, 
			gfVis,
			vidVis,
			handleArray,
			twitMain,
			showLines } = this.state

			if(gameID == null){
				this.setState({
					gameID: 'Waiting',
					selectedTeam: [3, "NHL"]
				}, () => this.teamChanged(this.state.selectedTeam))
			}

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
			{gameID != 'Waiting'
				? <Scoreboard 
						teams={teams}
						onIce={onIce}
						allData={allData}
						selectedPlayer={selectedPlayer}
						selectedPlayerID={selectedPlayerID}
						playerChanged={this.playerChanged}
						shots={shots}
						hits={hits}
						fos={fos}
						tka={tka}
						gva={gva}
						stats={stats}
						gameState={gameState}
						scoreBoard={scoreBoard}
						gameID={gameID}
						updateGF={this.updateGF}
						gfVis={gfVis}
					/>
				: <NHLNews
						handleLengthInfo={handleArray != null ? [this.state.twitterIDCount, handleArray.length - 1] : null}
						toggleTwitMain={this.toggleTwitMain}
						incrementTwitterAccount={this.incrementTwitterAccount}
						decrementTwitterAccount={this.decrementTwitterAccount}
						handle={handleArray != null ? handleArray[this.state.twitterIDCount] : null}
				  	phandle={this.state.phandle != null ? this.state.phandleArray[this.state.twitterIDCount] : null}
						onUpdateTwitter={this.teamChanged}
						selectedTeam={selectedTeam}
						height={850}
						width={650}
					/>}
				<br/>
				{gameID != 'Waiting'
				? <RenderStatBar 
						selected={selectedStat}
						onUpdateStat={this.updateStat}
					/>
				: null}
				<table width='100%' border='0'>
				<tr>
				<td>
				{gameID != "Waiting"
					?	<Roster 
				  		teams={teams ? [teams[0], teams[1]] : []}
				  		teamsFull={teams ? [teams[6], teams[7], rosterDisplay] : []}
				  		rosterDisplay={rosterDisplay}
				  		scratchesDisplay={scratchesDisplay}		  		
				  		allData={allData}
				  		selectedTeam={selectedTeam}
				  		onTeamChange={this.teamChanged} 
				  		selectedStat={selectedStat}
				  		onGameChange={this.clearStats}
				  		stats={stats}
				  		gameID={gameID}
				  		gameState={gameState}
				  		selectedPlayer={selectedPlayer}
				  		selectedPlayerID={selectedPlayerID ? selectedPlayerID : null}
				  		onPlayerChange={this.playerChanged}
				  		scoringPlays={scoringPlays}
							content={content}
							coaches={coaches}
				  		onVidClose={this.vidClose}
				  		onUpdateVid={this.updateVid}
				  		vidVis={vidVis}
				  		vidUrl={this.state.vidUrl}
				  		handle={handleArray != null ? handleArray[this.state.twitterIDCount] : null}
				  		phandle={this.state.phandle != null ? this.state.phandleArray[this.state.twitterIDCount] : null}
				  		incrementTwitterAccount={this.incrementTwitterAccount}
				  		decrementTwitterAccount={this.decrementTwitterAccount}
				  		toggleTwitMain={this.toggleTwitMain}
				  		toggleShowLines={this.toggleShowLines}
				  		showLines={showLines}
				  		makeTwitMain={this.makeTwitMain}
				  		clearTwitMain={this.clearTwitMain}		  		
				  		twitMain={twitMain}
				  		handleLengthInfo={handleArray != null ? [this.state.twitterIDCount, handleArray.length - 1] : null}
		  			/>
		  		: null}
		  	{stats != null && gameID != "Waiting"
		  		? <center>
			  		<Score
				  		allData={allData}
				  		scoringPlays={scoringPlays}
				  		gameID={gameID}
				  		content={content}
				  		onVidClose={this.vidClose}
				  		onUpdateVid={this.updateVid}
				  		vidVis={vidVis}
				  		vidUrl={this.state.vidUrl}
				  		width={1003}
				  		height={630}
			  		/>
			  		</center>
		  		: null}
				{error && <p>{error}</p>}
				</td>
				</tr>
				</table>
				</center>
			</React.Fragment>
		)
	}
}