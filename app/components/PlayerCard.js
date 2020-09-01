import React from 'react'
import { fetchPlayerCard } from '../utils/api'

export default class PlayerCard extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			cardInfo: null,
			fetched: false
		}
	}

	 //  shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state === nextState) {
  //     return false;
  //   } else {
  //     return true;
  //   }

  //   if (this.props === nextProps) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  shouldComponentUpdate(prevProps){
  	if(this.props !== prevProps){
  		fetchPlayerCard(this.props.selectedPlayerID)
				.then(playerData => {
					this.setState({
						cardInfo: playerData.people[0],
						fetched: false
					})
				})
			}
  }

	render(){
		// console.log("PlayerCard rendered from " + this.props.where)
		const { selectedPlayer, selectedPlayerID, stats, where, playerCard } = this.props;
		const { cardInfo } = this.state;
		
			// fetchPlayerCard(selectedPlayerID)
			// 	.then(playerData => {
			// 		this.setState({
			// 			cardInfo: playerData.people[0],
			// 			fetched: true
			// 		})
			// 	})

		// console.log(cardInfoParsed);


		// if(this.state.fetched != true){
		// 	const allPlayer = fetchPlayerCard(selectedPlayerID)
		// 	.then(playerData => {
		// 		this.setState({
		// 			cardInfo: playerData.people[0],
		// 			fetched: true
		// 		});
		// 	});
		// }

		const hsURL = `https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${selectedPlayerID}.jpg`;
		const shots = stats ? stats.filter(play => play[0] === "SHOT") : null;
		const tka = stats ? stats.filter(play => play[0] === "TAKEAWAY") : null;
		const gva = stats ? stats.filter(play => play[0] === "GIVEAWAY") : null;
		const hits = stats ? stats.filter(play => play[0] === "HIT") : null;
		const filtHits = [];
		hits != null ? hits.filter(hit => {
			if(hit[1].substring(0, hit[1].indexOf('hit')).includes(selectedPlayer)){
				filtHits.push(hit)
			}
			}) : null;


		return(

			<div className="hover">
			<table border='0'>
			<tr>
			<td className='player-card'>
			{selectedPlayerID
				?		<center>
						<b>								
							{selectedPlayer}
						</b>
						</center>
				: null}
			</td>
			</tr>
			<tr>
			<td className='player-card'>
			{selectedPlayerID
				?	<React.Fragment>
					<table border='0' width='100%'>
					<tr>
					<td>
						<center>
						<img src={hsURL} height='90' width='90'/>
						</center>
					</td>
					</tr>
					</table>
					<table border='0'>
					<tr>
					<td>
					<p>
						Age: {cardInfo != null ? cardInfo.currentAge : null}<br/>								
						Height: {cardInfo != null ? cardInfo.height : null}<br/>
						Weight: {cardInfo != null ? cardInfo.weight : null} lbs<br/>
						Shoots: {cardInfo != null ? cardInfo.shootsCatches : null}<br/>
						Nationality: {cardInfo != null ? cardInfo.birthCountry : null}<br/>								
					</p>
					</td>
					<td>
						<p>
							Shots: {shots != null ? shots.length : null}<br/>	
							Takeaways: {shots != null ? tka.length : null}<br/>
							Giveaways: {shots != null ? gva.length : null}<br/>
							Hits: {shots != null ? filtHits.length : null}<br/>																							
						</p>
					</td>
					</tr>
					</table>
					</React.Fragment>
				: null}
			</td>
			</tr>
			</table>
			</div>

		)
	}
}