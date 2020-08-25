import React from 'react'

export default class PlayerCard extends React.Component {
	constructor(props){
		super(props)
	}

	render(){
		const { selectedPlayer } = this.props;
		return(
			<div>
			{selectedPlayer
				? <React.Fragment><br/><h3><center>{selectedPlayer}</center></h3></React.Fragment>
				:null}
			</div>
		)
	}
}