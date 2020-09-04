import React from 'react'
import OnIce from './OnIce'
import { FaTimesCircle } from 'react-icons/fa'
import GameFlow from './GameFlow'


export default class Scoreboard extends React.Component {
	constructor(props){
		super(props)

		this.playerChanged = this.playerChanged.bind(this)
	}

	playerChanged(newPlayer){
		this.props.playerChanged(newPlayer)
	}

	updateGF(gameID){
		this.props.updateGF(gameID)
	}

	render(){

		const { teams,
						onIce,
						allData,
						selectedPlayer,
						selectedPlayerID,
						shots,
						hits,
						fos,
						stats,
						gameState,
						scoreBoard,
						gameID,
						gfVis } = this.props

		return(
			<React.Fragment>
			<table border='0' width='100%' bgcolor='#eeeeee'>
			<tr>
			<td width="25%" className='on-ice'>
			<center>
				<OnIce
					teamUp='Away'
					teamLow='away'
					teams={teams}
					onIce={onIce}
					stats={stats}
					allData={allData}
					selectedPlayer={selectedPlayer}
					onPlayerChange={this.playerChanged}
					tri='0'
				/>
			<br/>
				{shots && hits && fos && gameState !== "Preview"
					? <React.Fragment>
						<b>SOG</b> {shots[0]}<br/>
						<b>Hits</b> {hits[0]}<br/>
						<b>FO%</b> {fos[0]}<br/>
						</React.Fragment>
					: null}
			</center>					
			</td>
			<td width="50%">
			<center>
				<h1>{scoreBoard[0]}</h1>
				<h2>{scoreBoard[1]}</h2>
				{scoreBoard[2]
					?<h4>{scoreBoard[2]} - {scoreBoard[3]}</h4>
					: null}
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
				<td width="25%">
				<center>
				<OnIce
					teamUp='Home'
					teamLow='home'
					teams={teams}
					onIce={onIce}
					stats={stats}
					allData={allData}
					selectedPlayer={selectedPlayer}
					selectedPlayerID={selectedPlayerID}
					onPlayerChange={this.playerChanged}
					tri='1'
				/>
						<br/>
				{shots && hits && fos && gameState !== "Preview"
					? <React.Fragment>
						<b>SOG</b> {shots[1]}<br/>
						<b>Hits</b> {hits[1]}<br/>
						<b>FO%</b> {fos[1]}<br/>
						</React.Fragment>
					: null}
				</center>
					
				</td>
				</tr>
				</table>			
			</React.Fragment>		
		)
	}
}