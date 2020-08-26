import React from 'react'
import Twidget from './Twidget'

function RenderTwitterOptions( {selected, onUpdateTwitter} ){
	const twitterArray = [['NHL'], ['Stats']]

	return(
		<ul>
			{twitterArray.map((twitter, index) => (
				<li key={twitter[0]}>
					<button
						className='btn-clear nav-link'
						style={twitter[0] === selected[0] ? { color: 'rgb(187, 46, 31)' } : null}
						onClick={() => onUpdateTwitter([3, twitter])}>
							{twitter[0]}
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

	updateTwitter(currentTwitter){
		this.props.onUpdateTwitter({selectedTeam: currentTwitter})
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
			<table border='0' width='100%'>
			<tr>
			<td width='5%'>
				<RenderTwitterOptions 
					selected={selectedTeam[1]}
					onUpdateTwitter={this.updateTwitter}
				/>
			</td>
			<td>
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
			</tr>
			</table>
			</React.Fragment>
		)
	}
}