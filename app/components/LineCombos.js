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
								{teams[2].map(player => {
									if(player[2] == names[0]){
										return <React.Fragment>
														{player[1]} 
														<button
															onClick={() => this.updatePlayer(names[0], player[0])}
															className='line-link btn-clear'>
																{names[0]}
														</button>
														</React.Fragment>} 
									})}
							</td>
							<td>
								{teams[2].map(player => {
									if(player[2] == names[1]){
										return <React.Fragment>
														{player[1]} 
														<button
															onClick={() => this.updatePlayer(names[1], player[0])}
															className='line-link btn-clear'>
																{names[1]}
														</button>
														</React.Fragment>} 
									})}
							</td>
							<td>
								{teams[2].map(player => {
									if(player[2] == names[2]){
										return <React.Fragment>
														{player[1]} 
														<button
															onClick={() => this.updatePlayer(names[2], player[0])}
															className='line-link btn-clear'>
																{names[2]}
														</button>
														</React.Fragment>} 
									})}
							</td>
						</tr>
						<tr>
							<td>
								{teams[2].map(player => {
									if(player[2] == names[3]){
										return <React.Fragment>
														{player[1]} 
														<button
															onClick={() => this.updatePlayer(names[3], player[0])}
															className='line-link btn-clear'>
																{names[3]}
														</button>
														</React.Fragment>} 
									})}
							</td>
							<td>
								{teams[2].map(player => {
									if(player[2] == names[4]){
										return <React.Fragment>
														{player[1]} 
														<button
															onClick={() => this.updatePlayer(names[4], player[0])}
															className='line-link btn-clear'>
																{names[4]}
														</button>
														</React.Fragment>} 
									})}
							</td>
							<td>
								{teams[2].map(player => {
									if(player[2] == names[5]){
										return <React.Fragment>
														{player[1]} 
														<button
															onClick={() => this.updatePlayer(names[5], player[0])}
															className='line-link btn-clear'>
																{names[5]}
														</button>
														</React.Fragment>} 
									})}
							</td>
						</tr>
						<tr>
							<td>
								{teams[2].map(player => {
									if(player[2] == names[6]){
										return <React.Fragment>
														{player[1]} 
														<button
															onClick={() => this.updatePlayer(names[6], player[0])}
															className='line-link btn-clear'>
																{names[6]}
														</button>
														</React.Fragment>
									}
									})}
							</td>
							<td>
								{teams[2].map(player => {
									if(player[2] == names[7]){
										return <React.Fragment>
														{player[1]} 
														<button
															onClick={() => this.updatePlayer(names[7], player[0])}
															className='line-link btn-clear'>
																{names[7]}
														</button>
														</React.Fragment>} 
									})}
							</td>
							<td>
								{teams[2].map(player => {
									if(player[2] == names[8]){
										return <React.Fragment>
														{player[1]} 
														<button
															onClick={() => this.updatePlayer(names[8], player[0])}
															className='line-link btn-clear'>
																{names[8]}
														</button>
														</React.Fragment>} 
									})}
							</td>
						</tr>
						<tr>
							<td>
								{teams[2].map(player => {
									if(player[2].substr(player[2].length - 5) == names[9].substr(names[9].length - 5)){
										return <React.Fragment>
														{player[1]} 
														<button
															onClick={() => this.updatePlayer(player[2], player[0])}
															className='line-link btn-clear'>
																{player[2]}
														</button>
														</React.Fragment>
									}
									})}
							</td>
							<td>
								{teams[2].map(player => {
									if(player[2] == names[10]){
										return <React.Fragment>
														{player[1]} 
														<button
															onClick={() => this.updatePlayer(names[10], player[0])}
															className='line-link btn-clear'>
																{names[10]}
														</button>
														</React.Fragment>} 
									})}
							</td>
							<td>
								{teams[2].map(player => {
									if(player[2] == names[11]){
										return <React.Fragment>
														{player[1]} 
														<button
															onClick={() => this.updatePlayer(names[11], player[0])}
															className='line-link btn-clear'>
																{names[11]}
														</button>
														</React.Fragment>} 
									})}
							</td>
						</tr>
						</table>
						<br/>
						<center>
						<table border='0' width="70%">
						<tr>
							<td>
								{teams[2].map(player => {
									if(player[2] == names[12]){
										return <React.Fragment>
														{player[1]} 
														<button
															onClick={() => this.updatePlayer(names[12], player[0])}
															className='line-link btn-clear'>
																{names[12]}
														</button>
														</React.Fragment>} 
									})}
							</td>
							<td>
								{teams[2].map(player => {
									if(player[2] == names[13]){
										return <React.Fragment>
														{player[1]} 
														<button
															onClick={() => this.updatePlayer(names[13], player[0])}
															className='line-link btn-clear'>
																{names[13]}
														</button>
														</React.Fragment>} 
									})}				
							</td>
						</tr>																
						<tr>
							<td>
								{teams[2].map(player => {
									if(player[2] == names[14]){
										return <React.Fragment>
														{player[1]} 
														<button
															onClick={() => this.updatePlayer(names[14], player[0])}
															className='line-link btn-clear'>
																{names[14]}
														</button>
														</React.Fragment>} 
									})}
							</td>
							<td>
								{teams[2].map(player => {
									if(player[2] == names[15]){
										return <React.Fragment>
														{player[1]} 
														<button
															onClick={() => this.updatePlayer(names[15], player[0])}
															className='line-link btn-clear'>
																{names[15]}
														</button>
														</React.Fragment>} 
									})}				
							</td>
						</tr>	
						<tr>
							<td>
								{teams[2].map(player => {
									if(player[2] == names[16]){
										return <React.Fragment>
														{player[1]} 
														<button
															onClick={() => this.updatePlayer(names[16], player[0])}
															className='line-link btn-clear'>
																{names[16]}
														</button>
														</React.Fragment>} 
									})}
							</td>
							<td>
								{teams[2].map(player => {
									if(player[2] == names[17]){
										return <React.Fragment>
														{player[1]} 
														<button
															onClick={() => this.updatePlayer(names[17], player[0])}
															className='line-link btn-clear'>
																{names[17]}
														</button>
														</React.Fragment>} 
									})}				
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