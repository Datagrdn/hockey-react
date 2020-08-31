import React from 'react'
import { fetchPlayerCard } from '../utils/api'

export default class PlayerCard extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			cardInfo: null
		}
	}

	  shouldComponentUpdate(nextProps, nextState) {
    if (this.state === nextState) {
      return false;
    } else {
      return true;
    }
  }

	render(){
		// console.log("PlayerCard rendered from " + this.props.where)
		const { selectedPlayer, selectedPlayerID } = this.props;
		const { cardInfo } = this.state;
		const allPlayer = fetchPlayerCard(selectedPlayerID)
		.then(playerData => {
			this.setState({
				cardInfo: playerData.people[0]
			});
		});
		// console.log(cardInfo ? cardInfo.fullName : null)
		return(

			<div className="hover">
			<table border='0'>
			<tr>
			<td className='player-card'>
			{selectedPlayerID
				?		<b>								
							{selectedPlayer}
						</b>
				: null}
			</td>
			</tr>
			<tr>
			<td className='player-card'>
			{selectedPlayerID
				?	<p>
						Age: {cardInfo != null ? cardInfo.currentAge : null}<br/>								
						Height: {cardInfo != null ? cardInfo.height : null}<br/>
						Weight: {cardInfo != null ? cardInfo.weight : null} lbs<br/>
						Shoots: {cardInfo != null ? cardInfo.shootsCatches : null}<br/>
						Nationality: {cardInfo != null ? cardInfo.birthCountry : null}<br/>									
					</p>
				: null}
			</td>
			</tr>
			</table>
			</div>

		)
	}
}