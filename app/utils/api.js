export function fetchAllData (gameID) {
	return fetch(`https://statsapi.web.nhl.com/api/v1/game/${gameID}/feed/live`)
		.then((res) => res.json())
		.then((allData) => {
			if (!allData.gameData) {
				throw new Error('Error all data')
			}

			return allData;
		})
}

export function fetchPlayerCard (playerID) {
	return fetch(`https://statsapi.web.nhl.com/api/v1/people/${playerID}`)
		.then((res) => res.json())
		.then((playerData) => {
			if(!playerData.copyright) {
				throw new Error('Error fetching player card')
			}
			return playerData;
		})
}

export function fetchContent (gameID) {
	return fetch(`https://statsapi.web.nhl.com/api/v1/game/${gameID}/content`)
		.then((res) => res.json())
		.then((contentData) => {
			if (!contentData.copyright) {
				throw new Error('Error fetching content data')
			}

			return contentData;
		})
}

export function fetchSchedule (increment) {

	var date = new Date();
	const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + increment}`;

	const endpoint = window.encodeURI(`https://statsapi.web.nhl.com/api/v1/schedule?date=`+dateString);
	// const endpoint = window.encodeURI(`https://statsapi.web.nhl.com/api/v1/schedule?date=2020-08-30`);

	return fetch(endpoint)
		.then((res) => res.json())
		.then((schedule) => {
			if (!schedule.dates) {
				throw new Error('Error fetching schedule data')
			}

			return schedule;
		})
}

export function fetchTeams (allData) {
			
			const teams = [];
			teams.push(allData.gameData.teams.away.triCode);
			teams.push(allData.gameData.teams.home.triCode);

			const dataArray = [];
			const keys = Object.keys(allData);
			keys.forEach(key => dataArray.push(allData[key]));

			const playerArray = [];
			const playerKeys = Object.keys(dataArray[4].players);
			playerKeys.forEach(key => playerArray.push(dataArray[4].players[key]));

			const scratchedIDs = [];
			scratchedIDs.push(allData.liveData.boxscore.teams.away.scratches, allData.liveData.boxscore.teams.home.scratches);

			const playerNamesAway = [];
			const awayRoster = playerArray.filter(player => player.currentTeam.triCode == allData.gameData.teams.away.triCode && !scratchedIDs[0].includes(player.id));
			awayRoster.forEach(function(team) {
				if(team.alternateCaptain === true) {
					playerNamesAway.push([team.id, team.primaryNumber, team.fullName, ' (A) '])
				} else if(team.captain === true) {
					playerNamesAway.push([team.id, team.primaryNumber, team.fullName, ' (C) '])
				} else {
					playerNamesAway.push([team.id, team.primaryNumber, team.fullName])
				}
				});
			teams.push(playerNamesAway);

			const playerNamesHome = [];
			const homeRoster = playerArray.filter(player => player.currentTeam.triCode == allData.gameData.teams.home.triCode && !scratchedIDs[1].includes(player.id));
			homeRoster.forEach(function(team) { 
				if(team.alternateCaptain === true) {
					playerNamesHome.push([team.id, team.primaryNumber, team.fullName, ' (A) '])
				} else if(team.captain === true){
					playerNamesHome.push([team.id, team.primaryNumber, team.fullName, ' (C) '])
				} else {
					playerNamesHome.push([team.id, team.primaryNumber, team.fullName])
				}
			});
			teams.push(playerNamesHome);

			const scratchesAway = [];
			playerArray.filter(player => player.currentTeam.triCode == allData.gameData.teams.away.triCode && scratchedIDs[0].includes(player.id)).forEach(function(team) {
				if(team.alternateCaptain === true) {
					scratchesAway.push([team.primaryNumber, team.fullName, ' (A) '])
				} else if(team.captain === true) {
					scratchesAway.push([team.primaryNumber, team.fullName, ' (C) '])
				} else {
					scratchesAway.push([team.primaryNumber, team.fullName])
				}
				});
			teams.push(scratchesAway);

			const scratchesHome = [];
			playerArray.filter(player => player.currentTeam.triCode == allData.gameData.teams.home.triCode && scratchedIDs[1].includes(player.id)).forEach(function(team) {
				if(team.alternateCaptain === true) {
					scratchesHome.push([team.primaryNumber, team.fullName, ' (A) '])
				} else if(team.captain === true) {
					scratchesHome.push([team.primaryNumber, team.fullName, ' (C) '])
				} else {
					scratchesHome.push([team.primaryNumber, team.fullName])
				}
				});
			teams.push(scratchesHome);
			
			return teams;
}

export function onIce (allData) {

	const dataArray = [];
	const keys = Object.keys(allData);
	keys.forEach(key => dataArray.push(allData[key]));

	const playerArray = [];
	const playerKeys = Object.keys(dataArray[4].players);
	playerKeys.forEach(key => playerArray.push(dataArray[4].players[key]));

	const playersOnIceHome = allData.liveData.boxscore.teams.home.onIcePlus;
	const playersOnIceAway = allData.liveData.boxscore.teams.away.onIcePlus;

	const onIceHome = [];

	//adds home forwards
	for(let i = 0; i < playersOnIceHome.length; i++){
		for(let j = 0; j < playerArray.length; j++){
			const pAO = Object.entries(playerArray[j]);
			if(pAO[0].includes(playersOnIceHome[i].playerId)){
				if(pAO[pAO.length - 1][1].type === "Forward"){
					onIceHome.push([pAO[0][1], pAO[5][1], pAO[1][1], pAO[pAO.length - 1][1].code, ' - ' + playersOnIceHome[i].stamina]);
				}
			}
		}
	}

//adds home defense
for(let i = 0; i < playersOnIceHome.length; i++){
	for(let j = 0; j < playerArray.length; j++){
		const pAO = Object.entries(playerArray[j]);
		if(pAO[0].includes(playersOnIceHome[i].playerId)){
			if(pAO[pAO.length - 1][1].type === "Defenseman"){
				onIceHome.push([pAO[0][1], pAO[5][1], pAO[1][1], pAO[pAO.length - 1][1].code, ' - ' + playersOnIceHome[i].stamina]);
			}
		}
	}
}

//adds home goalie
for(let i = 0; i < playersOnIceHome.length; i++){
	for(let j = 0; j < playerArray.length; j++){
		const pAO = Object.entries(playerArray[j]);
		if(pAO[0].includes(playersOnIceHome[i].playerId)){
			if(pAO[pAO.length - 1][1].type === "Goalie"){
				onIceHome.push([pAO[0][1], pAO[5][1], pAO[1][1], pAO[pAO.length - 1][1].code, ' - ' + playersOnIceHome[i].stamina]);
			}
		}
	}
}

	const onIceAway =[];

	//adds away forwards
	for(let i = 0; i < playersOnIceAway.length; i++){
		for(let j = 0; j < playerArray.length; j++){
			const pAO = Object.entries(playerArray[j]);
			if(pAO[0].includes(playersOnIceAway[i].playerId)){
				if(pAO[pAO.length - 1][1].type === "Forward"){
					onIceAway.push([pAO[0][1], pAO[5][1], pAO[1][1], pAO[pAO.length - 1][1].code, ' - ' + playersOnIceAway[i].stamina]);
				}
			}
		}
	}

//adds away defense
for(let i = 0; i < playersOnIceAway.length; i++){
	for(let j = 0; j < playerArray.length; j++){
		const pAO = Object.entries(playerArray[j]);
		if(pAO[0].includes(playersOnIceAway[i].playerId)){
			if(pAO[pAO.length - 1][1].type === "Defenseman"){
				onIceAway.push([pAO[0][1], pAO[5][1], pAO[1][1], pAO[pAO.length - 1][1].code, ' - ' + playersOnIceAway[i].stamina]);
			}
		}
	}
}

//adds away goalie
for(let i = 0; i < playersOnIceAway.length; i++){
	for(let j = 0; j < playerArray.length; j++){
		const pAO = Object.entries(playerArray[j]);
		if(pAO[0].includes(playersOnIceAway[i].playerId)){
			if(pAO[pAO.length - 1][1].type === "Goalie"){
				onIceAway.push([pAO[0][1], pAO[5][1], pAO[1][1], pAO[pAO.length - 1][1].code, ' - ' + playersOnIceAway[i].stamina]);
			}
		}
	}
}
	return {'Home': [onIceHome], 'Away': [onIceAway]};
}

export function shots (allData) {
	// console.log("Logging shots")
	const shots = [];
	shots.push(allData.liveData.linescore.teams.away.shotsOnGoal, allData.liveData.linescore.teams.home.shotsOnGoal);
	return shots;
}

export function fetchScoreboard (allData, gameState) {

			const teamData = allData.gameData.teams;
			const away = teamData.away.name;
			const home = teamData.home.name;
			const opponents = away + " @ " + home;

			const d = new Date(allData.gameData.datetime.dateTime);

			const dateInfo = d.toString().substring(0, 10);

			const scoreInfo = allData.liveData.linescore.teams;
			const awayScore = scoreInfo.away.goals;
			const homeScore = scoreInfo.home.goals;
			const formattedScore = `${awayScore} - ${homeScore}`;

			const periodPath = gameState !== "Preview" ? allData.liveData.plays.currentPlay.about.period : null;
			const currentPeriod = periodPath === 1 || periodPath === 2 || periodPath === 3 ? "Period " + periodPath : periodPath === 4  ? "OT" : periodPath === 5  ? "Shootout" : null;
			const currentTime = gameState !== "Preview" ? allData.liveData.plays.currentPlay.about.periodTimeRemaining : null;

			const scoreBoard = [opponents, formattedScore, currentPeriod, currentTime];
			return scoreBoard;
}

export function fetchStats (allData, selectedPlayer) {

			const allPlays = allData.liveData.plays.allPlays;
			const justPlayers = [];

			allPlays.map(play => {
				if(play.players){
					var i;
					for (i = 0; i < play.players.length; i++) {
						justPlayers.push({
							"Players": play.players[i],
							"PlayerType": play.players[i].playerType,
							"TypeofPlay": play.result.event,
							"Description": play.result.description,
							"EventID": play.result.eventTypeId,
							"Coordinates": play.coordinates,
							"Period": play.about.period,
							"PTimeRemaining": play.about.periodTimeRemaining
						});
					}
				}
			});

		const results = []; 
			justPlayers.forEach(play => {
				if(play.Players.player.fullName === selectedPlayer){
					results.push(play);
				}
			});

			const allArrays = [];
			results.forEach(play => {
			// const firstShot = play.Description.indexOf('shot');
			// const secondShot = play.Description.indexOf('shot', firstShot + 1);
			allArrays.push([
				play.EventID,
				`Period ${play.Period} ${play.Description} @ ${play.PTimeRemaining}`
			])
			});

		return allArrays;
	}

