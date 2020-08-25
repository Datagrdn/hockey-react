import React from 'react'
import { Timeline } from 'react-twitter-widgets'
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaWindowMaximize } from 'react-icons/fa'

export default class Twidget extends React.Component {
	constructor(props){
		super(props)
	}

	toggleTwitMain(){
		this.props.toggleTwitMain()
	}

	decrementTwitterAccount(){
		this.props.decrementTwitterAccount()
	}
	
	incrementTwitterAccount(){
		this.props.incrementTwitterAccount()
	}
	
	shouldComponentUpdate(nextProps, nextState) {
    if (this.props.handle === nextProps.handle) {
      return false;
    } else {
      return true;
    }
	}

	render(){
		const {	handleLengthInfo,
						handle,
						height,
						width,
						selectedTeam } = this.props
		return(
			<div class='twidget'>
				<center>
					<button
					onClick={() => this.toggleTwitMain()}
						className='btn-clear nav-link'>
					<FaWindowMaximize/>
					</button>
					<br/>
					{handleLengthInfo && handleLengthInfo[0] > 0
						? <button
								onClick={() => this.decrementTwitterAccount()}
								className='btn-clear nav-link'>
							<FaAngleDoubleLeft size='14'/>
							</button>
						: <button
								className='btn-clear nav-link'>
							<FaAngleDoubleLeft size='14' color='grey'/>
							</button>}
					{selectedTeam[1]} Twitter
					{handleLengthInfo && handleLengthInfo[0] < handleLengthInfo[1]
						? <button
								onClick={() => this.incrementTwitterAccount()}
								className='btn-clear nav-link'>
							<FaAngleDoubleRight size='14'/>
							</button>
						: <button
								className='btn-clear nav-link'>
							<FaAngleDoubleRight size='14' color='grey'/>
							</button>}
					</center>
				<Timeline
			  dataSource={{
			    sourceType: 'profile',
			    screenName: handle
			  }}
			  options={{
			    height: height,
			    width: width
			  }}
			/>
			</div>
		)
	}
}