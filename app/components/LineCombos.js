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
		this.updatePlayer = this.updatePlayer.bind(this);
		this.renderLineButton = this.renderLineButton.bind(this);
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

	renderLineButton(teams, dfo){
		return teams.map(player => {
			if(player[2].substr(player[2].length - 5) == dfo.substr(dfo.length - 5)){
				return <React.Fragment>
					{player[1]} 
					<button
						onClick={() => this.updatePlayer(player[2], player[0])}
						style={player[2] === this.props.selectedPlayer ? { color: 'rgb(187, 46, 31)' } : null}						
						className='line-link btn-clear'>
							{player[2]}
					</button>
				</React.Fragment>
			}
		})
	}

	updatePlayer(name, id){
		this.props.updatePlayer(name, id)
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
	const { teams } = this.props;

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
			{names != null && teams[2] != null
			? <React.Fragment>
					<table border='0' width='100%'>	
						<tr>
							<td>
								{this.renderLineButton(teams[2], names[0])}
							</td>
							<td>
								{this.renderLineButton(teams[2], names[1])}
							</td>
							<td>
								{this.renderLineButton(teams[2], names[2])}
							</td>
						</tr>
						<tr>
							<td>
								{this.renderLineButton(teams[2], names[3])}
							</td>
							<td>
								{this.renderLineButton(teams[2], names[4])}
							</td>
							<td>
								{this.renderLineButton(teams[2], names[5])}
							</td>
						</tr>
						<tr>
							<td>
								{this.renderLineButton(teams[2], names[6])}
							</td>
							<td>
								{this.renderLineButton(teams[2], names[7])}							
							</td>
							<td>
								{this.renderLineButton(teams[2], names[8])}
							</td>
						</tr>
						<tr>
							<td>
								{this.renderLineButton(teams[2], names[9])}
							</td>
							<td>
								{this.renderLineButton(teams[2], names[10])}
							</td>
							<td>
								{this.renderLineButton(teams[2], names[11])}
							</td>
						</tr>
						</table>
						<br/>
						<center>
						<table border='0' width="70%">
						<tr>
							<td>
								{this.renderLineButton(teams[2], names[12])}
							</td>
							<td>
								{this.renderLineButton(teams[2], names[13])}			
							</td>
						</tr>																
						<tr>
							<td>
								{this.renderLineButton(teams[2], names[14])}
							</td>
							<td>
								{this.renderLineButton(teams[2], names[15])}		
							</td>
						</tr>	
						<tr>
							<td>
								{this.renderLineButton(teams[2], names[16])}
							</td>
							<td>
								{this.renderLineButton(teams[2], names[17])}	
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