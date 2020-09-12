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

		const teamName = selectedTeam && teams && selectedTeam[0] === 0 ? teams[0] : teams[1];
		const URLname = teamName != null ? teamName.replace(/ /g, '-') : null;

		if(URLname != null) {
		rp(`https://guarded-fjord-78483.herokuapp.com/https://www.dailyfaceoff.com/teams/${URLname}/line-combinations/`)
			.then(html => {
				let names = [];
				let ranks = [];
				let $ = cheerio.load(html);

				$('.player-name', '#f1').each(function(i, element) {
					let name = $(this)
						.prepend()
						.text();
					names.push(name);
				});

				$('.rating-rank', '#f1').each(function(i, element) {
					let rank = $(this)
						.prepend()
						.text();
					ranks.push(rank);
				});				

				$('.player-name', '#f2').each(function(i, element) {
					let name = $(this)
						.prepend()
						.text();
					names.push(name);
				});

				$('.rating-rank', '#f2').each(function(i, element) {
					let rank = $(this)
						.prepend()
						.text();
					ranks.push(rank);
				});				

				$('.player-name', '#f3').each(function(i, element) {
					let name = $(this)
						.prepend()
						.text();
					names.push(name);
				});

				$('.rating-rank', '#f3').each(function(i, element) {
					let rank = $(this)
						.prepend()
						.text();
					ranks.push(rank);
				});				

				$('.player-name', '#f4').each(function(i, element) {
					let name = $(this)
						.prepend()
						.text();
					names.push(name);
				});

				$('.rating-rank', '#f4').each(function(i, element) {
					let rank = $(this)
						.prepend()
						.text();
					if(rank.length > 2) {
						ranks.push(rank)
					} else{
					 ranks.push('N/A');
					}
				});

				$('.player-name', '#d1').each(function(i, element) {
					let name = $(this)
						.prepend()
						.text();
					names.push(name);
				});

				$('.rating-rank', '#d1').each(function(i, element) {
					let rank = $(this)
						.prepend()
						.text();
					ranks.push(rank);
				});								

				$('.player-name', '#d2').each(function(i, element) {
					let name = $(this)
						.prepend()
						.text();
					names.push(name);
				});

				$('.rating-rank', '#d2').each(function(i, element) {
					let rank = $(this)
						.prepend()
						.text();
					ranks.push(rank);
				});					

				$('.player-name', '#d3').each(function(i, element) {
					let name = $(this)
						.prepend()
						.text();
					names.push(name);
				});

				$('.rating-rank', '#d3').each(function(i, element) {
					let rank = $(this)
						.prepend()
						.text();
					ranks.push(rank);
				});					

				this.setState({ 
					names,
					ranks })
				})

			.catch(function(err) {
				console.log("Crawl failed");
			});
		}
	}

	toggleShowLines(){
		this.props.toggleShowLines()
	}

	renderLineButton(dfo, rank){
		const {teams, scratches } = this.props;
		const combined = [];


		combined.push(...teams[2]);
		combined.push(...scratches);

		return combined.map(player => {
			if(player[2].substr(player[2].length - 5) == dfo.substr(dfo.length - 5) && player[0].toString().charAt(0) != 's'){
				return <React.Fragment>
					<center>
					{player[1]} 
					<button
						onClick={() => this.updatePlayer(player[2], player[0])}
						style={player[2] === this.props.selectedPlayer ? { color: 'rgb(187, 46, 31)' } : null}						
						className='line-link btn-clear'>
							{player[2]}
					</button>
					<br/>
					<font size='2'>
						{rank}
					</font>
					<br/><br/>
					</center>
				</React.Fragment>
			} else if(player[2].substr(player[2].length - 5) == dfo.substr(dfo.length - 5)){
				return <React.Fragment>
					<center>
					{player[1]} 
					<button
						onClick={() => this.updatePlayer(player[2], player[0])}
						className='line-link scratch btn-clear'>
							{player[2]}
					</button>
					<br/>
					<font size='2'>
						{rank}
					</font>
					<br/><br/>
					</center>
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

	const { names, ranks } = this.state;
	const { teams, scratches } = this.props;

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
								{this.renderLineButton(names[0], ranks[0])}
							</td>
							<td>
								{this.renderLineButton(names[1], ranks[1])}
							</td>
							<td>
								{this.renderLineButton(names[2], ranks[2])}
							</td>
						</tr>
						<tr>
							<td>
								{this.renderLineButton(names[3], ranks[3])}
							</td>
							<td>
								{this.renderLineButton(names[4], ranks[4])}
							</td>
							<td>
								{this.renderLineButton(names[5], ranks[5])}
							</td>
						</tr>
						<tr>
							<td>
								{this.renderLineButton(names[6], ranks[6])}
							</td>
							<td>
								{this.renderLineButton(names[7], ranks[7])}							
							</td>
							<td>
								{this.renderLineButton(names[8], ranks[8])}
							</td>
						</tr>
						<tr>
							<td>
								{this.renderLineButton(names[9], ranks[9])}
							</td>
							<td>
								{this.renderLineButton(names[10], ranks[10])}
							</td>
							<td>
								{this.renderLineButton(names[11], ranks[11])}
							</td>
						</tr>
						</table>
						<br/>
						<center>
						<table border='0' width="70%">
						<tr>
							<td>
								{this.renderLineButton(names[12], ranks[12])}
							</td>
							<td>
								{this.renderLineButton(names[13], ranks[13])}			
							</td>
						</tr>																
						<tr>
							<td>
								{this.renderLineButton(names[14], ranks[14])}
							</td>
							<td>
								{this.renderLineButton(names[15], ranks[15])}		
							</td>
						</tr>	
						<tr>
							<td>
								{this.renderLineButton(names[16], ranks[16])}
							</td>
							<td>
								{this.renderLineButton(names[17], ranks[17])}	
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