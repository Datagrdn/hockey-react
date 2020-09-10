import React from 'react';
import rp from "request-promise";
import cheerio from "cheerio";
import Loading from './Loading'
import { FaTimesCircle } from 'react-icons/fa'

export default class LineCombos extends React.Component {
	constructor(props){
		super(props)

		this.state = {}

		this.fetchLines = this.fetchLines.bind(this);
		this.toggleShowLines = this.toggleShowLines.bind(this);
	}

	fetchLines(){
		const { selectedTeam, teams } = this.props;
		console.log(selectedTeam[0]);

		const teamName = selectedTeam && teams && selectedTeam[0] === 0 ? teams[0] : teams[1];
		const URLname = teamName != null ? teamName.replace(/ /g, '-') : null;

		if(URLname != null) {
		rp(`https://guarded-fjord-78483.herokuapp.com/https://www.dailyfaceoff.com/teams/${URLname}/line-combinations/`)
			.then(html => {
				let names = [];
				let $ = cheerio.load(html);

				$('.player-name', '#f1').each(function(i, element) {
					let name = $(this)
						.prepend()
						.text();
					names.push(name);
				});

				$('.player-name', '#f2').each(function(i, element) {
					let name = $(this)
						.prepend()
						.text();
					names.push(name);
				});

				$('.player-name', '#f3').each(function(i, element) {
					let name = $(this)
						.prepend()
						.text();
					names.push(name);
				});

				$('.player-name', '#f4').each(function(i, element) {
					let name = $(this)
						.prepend()
						.text();
					names.push(name);
				});

				$('.player-name', '#d1').each(function(i, element) {
					let name = $(this)
						.prepend()
						.text();
					names.push(name);
				});				

				$('.player-name', '#d2').each(function(i, element) {
					let name = $(this)
						.prepend()
						.text();
					names.push(name);
				});	

				$('.player-name', '#d3').each(function(i, element) {
					let name = $(this)
						.prepend()
						.text();
					names.push(name);
				});	

				this.setState({ names })
			})

			.catch(function(err) {
				console.log("Crawl failed");
			});
		}
	}

	toggleShowLines(){
		this.props.toggleShowLines()
	}

	componentDidUpdate(prevProps) {
		if(this.props.selectedTeam !== prevProps.selectedTeam){
			this.fetchLines();
		}
	}

	componentDidMount() {
		this.fetchLines();
	}

	render(){

	const { names } = this.state;

		return(
			<React.Fragment>
			<center>
				<h2>
					Current Lines
					<button
						className='btn-clear'
						onClick={() => this.toggleShowLines()}>
							<FaTimesCircle />
					</button>
				</h2>
			</center>
			{names != null
			? <React.Fragment>
					<table border='0' width='80%'>	
						<tr>
							<td>
								{names ? names[0] : null}
							</td>
							<td>
								{names ? names[1] : null}
							</td>
							<td>
								{names ? names[2] : null}
							</td>
						</tr>
						<tr>
							<td>
								{names ? names[3] : null}
							</td>
							<td>
								{names ? names[4] : null}
							</td>
							<td>
								{names ? names[5] : null}
							</td>
						</tr>
						<tr>
							<td>
								{names ? names[6] : null}
							</td>
							<td>
								{names ? names[7] : null}
							</td>
							<td>
								{names ? names[8] : null}
							</td>
						</tr>
						<tr>
							<td>
								{names ? names[9] : null}
							</td>
							<td>
								{names ? names[10] : null}
							</td>
							<td>
								{names ? names[11] : null}
							</td>
						</tr>
						</table>
						<br/>
						<center>
						<table border='0' width="45%">
						<tr>
							<td>
								{names ? names[12] : null}
							</td>
							<td>
								{names ? names[13] : null}					
							</td>
						</tr>																
						<tr>
							<td>
								{names ? names[14] : null}
							</td>
							<td>
								{names ? names[15] : null}					
							</td>
						</tr>	
						<tr>
							<td>
								{names ? names[16] : null}
							</td>
							<td>
								{names ? names[17] : null}					
							</td>
						</tr>					
					</table>
					</center>
					</React.Fragment>
			: <Loading 
					text={'Fetching lines'}
				/>}
			</React.Fragment>
		)
	}
}