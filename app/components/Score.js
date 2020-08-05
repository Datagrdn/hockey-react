import React from 'react'
import PropTypes from 'prop-types'
import { FaPlayCircle } from 'react-icons/fa'


function RenderGoals( {allData, scoringPlays, content} ){
	if(allData && content){

		// const items = content.highlights.scoreboard.items;
		// const sortedReplays = items.sort((b, a) => {
		// 	return b.id - a.id;
		// });

		// console.log(sortedReplays);

		// console.log(content.media.milestones.items);

		// console.log(Object.entries(content.media.milestones))

		const milestones =[];
		Object.entries(content.media.milestones).length !== 0
			? content.media.milestones.items.forEach((play) => {
					if(play.title === "Goal"){
						milestones.push(play);
					}
				})
			: null

		console.log(milestones[0])

		// console.log(milestones);

		const scoringPlaysDescription = [];
		scoringPlays.forEach((play, index) => (
			scoringPlaysDescription.push({
				period: allData.liveData.plays.allPlays[play].about.period,
				description: allData.liveData.plays.allPlays[play].result.description,
				time: allData.liveData.plays.allPlays[play].about.periodTimeRemaining,
				highlight: Object.entries(milestones[index].highlight).length !== 0 ? milestones[index].highlight.playbacks[3].url : null
				})
		))
		
		// console.log(scoringPlaysDescription);

		const period1Goals = [];
		scoringPlaysDescription.forEach((play) => {
			if(play.period === 1){
				period1Goals.push(play)
			}
		})

		const period1GoalsFormatted = period1Goals.map((play) => (
			<li key={play}>
				{play.description}&nbsp;
				<a href={play.highlight}>
					<FaPlayCircle />
				</a>
			</li>
		))



		const period1GoalsReturn = period1GoalsFormatted.length !== 0 ? [<h3>Period 1</h3>, <p>{period1GoalsFormatted}</p>] : [<h3>Period 1</h3>, <p>No Goals</p>];

		const period2Goals = [];
		scoringPlaysDescription.forEach((play) => {
			if(play.period == 2){
				period2Goals.push(play)
			}
		})

		const period2GoalsFormatted = period2Goals.map((play) => (
			<li key={play}>
				{play.description}&nbsp;
				<a href={play.highlight}>
					<FaPlayCircle />
				</a>
			</li>
		))
		// console.log(period2GoalsFormatted)

		const period2GoalsReturn = period2GoalsFormatted.length !== 0 
			? [<h3>Period 2</h3>, 
				<p>{period2GoalsFormatted}</p>] 
			: [<h3>Period 2</h3>, 
				<p>No Goals</p>];

		// console.log(period2GoalsReturn);

		const period3Goals = [];
		scoringPlaysDescription.forEach((play) => {
			if(play.period == 3){
				period3Goals.push(play)
			}
		})

		const period3GoalsFormatted = period3Goals.map((play) => (
			<li key={play}>
				{play.description}&nbsp;
				<a href={play.highlight}>
					<FaPlayCircle />
				</a>
			</li>
		))

		const period3GoalsReturn = period3GoalsFormatted.length !== 0 ? [<h3>Period 3</h3>, <p>{period3GoalsFormatted}</p>] : [<h3>Period 3</h3>, <p>No Goals</p>];


		const period4Goals = [];
		scoringPlaysDescription.forEach((play) => {
			if(play.period == 4){
				period4Goals.push(play)
			}
		})

		const period4GoalsFormatted = period4Goals.map((play) => (
			<li key={play}>
				{play.description}&nbsp;
				<a href={play.highlight}>
					<FaPlayCircle />
				</a>
			</li>
		))

		const period4GoalsReturn = period4GoalsFormatted.length !== 0 ? [<h3>OT</h3>, <p>{period4GoalsFormatted}</p>] : null;

		const period5Goals = [];
		scoringPlaysDescription.forEach((play) => {
			if(play.period == 5){
				period5Goals.push(play)
			}
		})

		const period5GoalsFormatted = period5Goals.map((play) => (
			<li key={play}>
				{play.description}&nbsp;
				<a href={play.highlight}>
					<FaPlayCircle />
				</a>
			</li>
		))

		const period5GoalsReturn = period5GoalsFormatted.length !== 0 ? [<h3>Shootout</h3>, <p>{period5GoalsFormatted}</p>] : null;

		return [
			period1GoalsReturn,
			period2GoalsReturn,
			period3GoalsReturn,
			period4GoalsReturn,
			period5GoalsReturn
		]

		// return period2GoalsFormatted;
	} else {
		return null;
	}
}

export default class Score extends React.Component {
	constructor(props){
		super(props)
	}

	render(){
		const {allData, scoringPlays, content} = this.props
		return(
			<React.Fragment>
				{scoringPlays ? <h2>Scoring Summary</h2> : null}
				<RenderGoals
					allData={allData}
					scoringPlays={scoringPlays}
					content={content}
				/>
			</React.Fragment>
		)
	}
}