import React from 'react'
import PropTypes from 'prop-types'
import Video from './Video'
import { FaPlayCircle } from 'react-icons/fa'


function RenderGoals( {allData, scoringPlays, content, updateVid} ){
	if(allData && content){

		const milestones =[];
		const otherstones = [];
		Object.entries(content.media.milestones).length !== 0
			? content.media.milestones.items.forEach((play) => {
					if(play.title === "Goal"){
						milestones.push(play);
					} else if (play.title !=="Goal" && play.highlight.playbacks){
						otherstones.push(play);
					}
				})
			: null

			console.log(otherstones);

		const scoringPlaysDescription = [];
		scoringPlays.forEach((play, index) => (
			scoringPlaysDescription.push({
				period: allData.liveData.plays.allPlays[play].about.period,
				description: allData.liveData.plays.allPlays[play].result.description + " @ " + allData.liveData.plays.allPlays[play].about.periodTimeRemaining,
				highlight: milestones[index] && milestones[index].highlight.playbacks ? milestones[index].highlight.playbacks[3].url : null
				})
		))

		const condensedGame = content.media.epg[2].items[0] && content.media.epg[2].items[0].playbacks
			? content.media.epg[2].items[0].playbacks[3].url
			: null

		console.log(condensedGame !== null);

		const condensedGameButton = condensedGame !== null
			?	<li key='condensedGame'><br/><h3>Condensed Game
				<button
					className='btn-clear'
					onClick={() => updateVid(condensedGame)}>
						<FaPlayCircle />
				</button>
				</h3>
				</li>
			: null;

		const period1Goals = [];
		scoringPlaysDescription.forEach((play) => {
			if(play.period === 1){
				period1Goals.push(play)
			}
		})

		const period1GoalsFormatted = period1Goals.map((play) => {
			if(play.highlight !== null) {
				return <li key={play}>
					{play.description}{' '}
					<button
						className='btn-clear'
						onClick={() => updateVid(play.highlight)}>
						<FaPlayCircle />
					</button>
				</li>
			} else {
			return <li key={play}>
				{play.description}
			</li>
			}
		})



		const period1GoalsReturn = period1GoalsFormatted.length !== 0 ? [<h3>Period 1</h3>, <p>{period1GoalsFormatted}</p>] : [<h3>Period 1</h3>, <p>No Goals</p>];

		const period2Goals = [];
		scoringPlaysDescription.forEach((play) => {
			if(play.period == 2){
				period2Goals.push(play)
			}
		})

		const period2GoalsFormatted = period2Goals.map((play) => {
			if(play.highlight !== null) {
				return <li key={play}>
					{play.description}{' '}
					<button
						className='btn-clear'
						onClick={() => updateVid(play.highlight)}>
						<FaPlayCircle />
					</button>
				</li>
			} else {
			return <li key={play}>
				{play.description}
			</li>
			}
		})

		const period2GoalsReturn = period2GoalsFormatted.length !== 0 
			? [<h3>Period 2</h3>, 
				<p>{period2GoalsFormatted}</p>] 
			: [<h3>Period 2</h3>, 
				<p>No Goals</p>];


		const period3Goals = [];
		scoringPlaysDescription.forEach((play) => {
			if(play.period == 3){
				period3Goals.push(play)
			}
		})

		const period3GoalsFormatted = period3Goals.map((play) => {
			if(play.highlight !== null) {
				return <li key={play}>
					{play.description}{' '}
					<button
						className='btn-clear'
						onClick={() => updateVid(play.highlight)}>
						<FaPlayCircle />
					</button>
				</li>
			}
		})

		const period3GoalsReturn = period3GoalsFormatted.length !== 0 ? [<h3>Period 3</h3>, <p>{period3GoalsFormatted}</p>] : [<h3>Period 3</h3>, <p>No Goals</p>];


		const period4Goals = [];
		scoringPlaysDescription.forEach((play) => {
			if(play.period == 4){
				period4Goals.push(play)
			}
		})

		const period4GoalsFormatted = period4Goals.map((play) => {
			if(play.highlight !== null) {
				return <li key={play}>
					{play.description}{' '}
					<button
						className='btn-clear'
						onClick={() => updateVid(play.highlight)}>
						<FaPlayCircle />
					</button>
				</li>
			}
		})

		const period4GoalsReturn = period4GoalsFormatted.length !== 0 ? [<h3>OT</h3>, <p>{period4GoalsFormatted}</p>] : null;

		const period5Goals = [];
		scoringPlaysDescription.forEach((play) => {
			if(play.period == 5){
				period5Goals.push(play)
			}
		})

		const period5GoalsFormatted = period5Goals.map((play) => {
			if(play.highlight !== null) {
				return <li key={play}>
					{play.description}{' '}
					<button
						className='btn-clear'
						onClick={() => updateVid(play.highlight)}>
						<FaPlayCircle />
					</button>
				</li>
			}
		})

		const period5GoalsReturn = period5GoalsFormatted.length !== 0 ? [<h3>Shootout</h3>, <p>{period5GoalsFormatted}</p>] : null;

		return [
			condensedGameButton,
			period1GoalsReturn,
			period2GoalsReturn,
			period3GoalsReturn,
			period4GoalsReturn,
			period5GoalsReturn
		]
	} else {
		return null;
	}
}

export default class Score extends React.Component {
	constructor(props){
		super(props)

			this.state = {
				url: null
			}

			this.updateVid = this.updateVid.bind(this)
		}

		updateVid(url) {
		this.setState({
			url
		})
	}

	render(){
		const {allData, scoringPlays, content} = this.props
		return(
			<React.Fragment>
				{scoringPlays ? <h2>Scoring Summary</h2> : null}
			{this.state.url
				?<Video url={this.state.url}/>
				: null}
				<RenderGoals
					allData={allData}
					scoringPlays={scoringPlays}
					content={content}
					updateVid={this.updateVid}
				/>
			</React.Fragment>
		)
	}
}