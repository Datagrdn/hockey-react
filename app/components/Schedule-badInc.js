import React from 'react'
import { scheduleApi } from '../utils/api'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'


export default class Schedule extends React.Component {
	constructor(props){
		super(props)

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleIncrement = this.handleIncrement.bind(this)
		this.handleDecrement = this.handleDecrement.bind(this)
	}

	handleSubmit(gameID) {
		clearInterval(this.interval);
		this.props.onSubmit(gameID);

		this.interval = setInterval(() => {
			this.props.onSubmit(gameID)
		}, 10000)
	}

	handleIncrement() {
		this.props.incrementFunc();
	}

	handleDecrement() {
		this.props.decrementFunc();
	}

	componentDidMount(){
		this.props.fetchSchedule();
	}

	convertTime(date) {
		const { schedule } = this.props;
			const d = new Date(date);
			var hh = d.getHours();
		  var m = d.getMinutes();
		  var s = d.getSeconds();
		  var dd = "AM";
		  var h = hh;
		  if (h >= 12) {
		    h = hh - 12;
		    dd = "PM";
		  }
		  if (h == 0) {
		    h = 12;
		  }
		  m = m < 10 ? "0" + m : m;

		  s = s < 10 ? "0" + s : s;

		  var pattern = new RegExp("0?" + hh + ":" + m + ":" + s);

		  var replacement = h + ":" + m;
		  replacement += " " + dd;

		const time = replacement;
		
		return time;
	}

	addDate(){

			return new Date(this.props.schedule.dates[0].date).toUTCString().substring(0, 11);
	}

	render(){
		const { schedule, incrementFunc, decrementFunc } = this.props
		return(
			<React.Fragment>
			<div class="schedule">
				<button
				className='btn-clear'
				onClick={this.handleDecrement}>
				<FaAngleDoubleLeft size={30}/>
			</button>
			{schedule
				? schedule.dates[0].games.map((game) => (
						<li key={game}>
							<button
								className='btn-clear onIce-link'
								onClick={() => this.handleSubmit(game.gamePk)}>
								{game.teams.away.team.score}<br/>{game.teams.away.team.name}<br/>{game.teams.home.team.name}<br/>{this.convertTime(game.gameDate)}
							</button>
						</li>
					))
				: null}
				<button
				className='btn-clear'
				onClick={this.handleIncrement}>
				<FaAngleDoubleRight size={30}/>
			</button>
			</div>
			<br/>
			<center>
			{schedule
				? <h3>{this.addDate()}</h3>
				: null}
			</center>
			</React.Fragment>
		)
	}
}