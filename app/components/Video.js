import React from 'react'
import ReactPlayer from 'react-player'
import { FaTimesCircle } from 'react-icons/fa'

export default class Video extends React.Component {
	constructor(props){
		super(props)

	}

	render(){
		const { url, closeVid } = this.props
		// console.log(url)

		return (
			<React.Fragment>
				<h2>Tape Cave
				<button
					className='btn-clear'
					onClick={() => closeVid()}>
						<FaTimesCircle/>
				</button>
				</h2>
				<ReactPlayer 
					url={url ? url : null} 
					controls={true}
					pip={true}
					playing={true}
					width='803'
					height='430'/>
		   </React.Fragment>
		)
	}
}