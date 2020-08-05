import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Game from './components/Game'


export default class App extends React.Component {
	render() {
	  return(
	  	<div className='container'>
	  		<Game />
	  	</div>
	  )
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)