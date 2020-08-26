import React from 'react'
import Twidget from './Twidget'

function RenderTwitterOptions( {selected, onUpdateTwitter} ){
	const twitterArray = ['NHL', 'Stats']

	return(
		<ul className='flex-center'>
			{twitterArray.map((twitter) => (
				<li key={twitter}>
					<button
						style={twitter === selected ? { color: 'rgb(187, 46, 31)' } : null}
						className='btn-clear nav-link'
						onClick={() => onUpdateTwitter([3, twitter])}>
							{twitter}
					</button>
				</li>
			))}
		</ul>
	)
}

export default class NHLNews extends React.Component{
	constructor(props){
		super(props)

		this.updateTwitter = this.updateTwitter.bind(this)
	}

	updateTwitter(newTeam){
		this.props.onUpdateTwitter({
			selectedTeam: newTeam
		})
	}

	render(){

		const { 
			handleLengthInfo,
			toggleTwitMain,
			incrementTwitterAccount,
			decrementTwitterAccount,
			handle,
			selectedTeam,
			height,
			width } = this.props

		return(
			<React.Fragment>
			<table border='0' width='100%' bgcolor='#eeeeee'>
			<tr>
			<td width="25%">
			</td>
			<td>
				<RenderTwitterOptions 
					selected={selectedTeam[1]}
					onUpdateTwitter={this.updateTwitter}
				/>
			<Twidget
				handleLengthInfo={handleLengthInfo}
				toggleTwitMain={toggleTwitMain}
				incrementTwitterAccount={incrementTwitterAccount}
				decrementTwitterAccount={decrementTwitterAccount}
				handle={handle}
				selectedTeam={selectedTeam}
				height={height}
				width={width}
			/>
			</td>
			<td width="25%">
			</td>
			</tr>
			</table>
			</React.Fragment>
		)
	}
}