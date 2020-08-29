import React from 'react'

export default class PlayerCard extends React.Component {
	constructor(props){
		super(props)
	}

	render(){
		const { selectedPlayer, selectedPlayerID } = this.props;
		return(
			<div className="hover">
			{selectedPlayer
				? <React.Fragment><br/><h3><center>{selectedPlayer} {selectedPlayerID ? selectedPlayerID : "ID will go here"}</center></h3></React.Fragment>
				:null}
			</div>
		)
	}
}