import React from 'react'
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
		this.props.closeVid();

		if(gameID != 'Waiting'){
			this.interval = setInterval(() => {
				this.props.onSubmit(gameID)
			}, 5000)
		}
	}

	componentDidMount(){
		this.props.fetchSchedule();

		this.schedInterval = setInterval(() => {
			this.props.fetchSchedule();
		}, 10000)
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
			if(this.props.schedule.dates[0]) {
				return new Date(this.props.schedule.dates[0].date).toUTCString().substring(0, 11);
			} else {
			return new Date().toUTCString().substring(0, 11)
		}
	}

	handleIncrement() {
		this.props.incrementFunc();
	}

	handleDecrement() {
		this.props.decrementFunc();
	}

	render(){
		const { schedule, incrementFunc, decrementFunc, currentGameID } = this.props
		return(
			<React.Fragment>
						<div class='schedule'>
							{schedule && schedule.dates[0]
								? schedule.dates[0].games.map((game) => (
										<li key={game}>
											<button
												id='gameID'
												className='btn-clear onIce-link'
												style={currentGameID === game.gamePk ? { color: 'rgb(187, 46, 31)' } : null}
												onClick={currentGameID === game.gamePk ? () => this.handleSubmit('Waiting') : () => this.handleSubmit(game.gamePk)}>
												{game.teams.away.team.name}<br/>
												{game.teams.home.team.name}<br/>
												{game.status.detailedState === "Scheduled" ? this.convertTime(game.gameDate)
													: game.status.detailedState === "Final"
														? game.teams.away.score + " - " + game.teams.home.score + " Final"
													: game.teams.away.score + " - " + game.teams.home.score}
											</button>
										</li>
									))
								: schedule !== null ? <p>No games today, spend some time outside</p>
								: null}
							</div>
			<table border='0' width='100%'>
				<tr>
					<td width='37%'>
					</td>
					<td width='26%'>
						<div class='dates'>
						<button
							className='btn-clear'
							onClick={this.handleDecrement}>
							<FaAngleDoubleLeft size={20}/>
						</button>
						{schedule
							? <h3>{this.addDate()}</h3>
							: null}
						<button
							className='btn-clear'
							onClick={this.handleIncrement}>
							<FaAngleDoubleRight size={20}/>
						</button>
						</div>
					</td>
					<td width='37%'>
					</td>
				</tr>
			</table>
			</React.Fragment>
		)
	}
}