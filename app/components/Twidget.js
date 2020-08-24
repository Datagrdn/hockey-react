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
	</div>
	<Timeline
  dataSource={{
    sourceType: 'profile',
    screenName: handle
  }}
  options={{
    height: '800',
    width: '550'
  }}
/>