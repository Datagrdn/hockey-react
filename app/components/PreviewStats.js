import React from 'react'

export default class PreviewStats extends React.Component {
	constructor(props){
		super(props)

	}


	render(){
		const { gameID } = this.props;
		console.log(gameID);
		const url = `https://www.naturalstattrick.com/graphs/teams/20192020-${gameID.toString().substring(5, 10)}-po-cfdiff-5v5.png`;
		console.log(url);
		return(
			<img src={url}/>
		)
	}
}
