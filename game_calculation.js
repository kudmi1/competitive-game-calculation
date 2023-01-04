let firstWinChance;
let secondWinChance;
let winnerGoals;
let looserGoals;
let won;
let lost;
let teams = [];
let teamsWinners = [];
let matchNumber = 1;
let round = 1;
let champion;
let topThree = [];
let firstTeamName;
let secondTeamName;
let counter = 1;

//СОЗДАНИЕ КОМАНД
function createTeams() {
	for (let i = 0; i < 16; i++) {
		teams[i] = {
			name: `Команда ${i + 1}`,
			number: i + 1,
			goals: 0,
			power: Math.floor(Math.random() * 91) + 10,
		};
	}
	console.log(`Команды: `);
	console.log(teams);
}

//ПЕРЕТАСОВКА КОМАНД
function shuffleTeams(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

//ПРЕДВАРИТЕЛЬНЫЙ ШАНС НА ПОБЕДУ КОМАНД
function firstWR(team1, team2) {
	return team1 / (team1 + team2);
}

function secondWR(team1, team2) {
	return team2 / (team1 + team2);
}

// ОБЩЕЕ КОЛ-ВО ГОЛОВ ЗА МАТЧ
function totalGoals() {
	return winnerGoals + looserGoals;
}

//СОРТИРОВКА ПО ГОЛАМ
function sortinGoals(array) {
	array.sort((x, y) => (x.goals < y.goals ? 1 : -1));
}

//ВСТРЕЧА ДВУХ КОМАНД
function competition(team1, team2, chance1, chance2) {
	let random = Math.random() * 100;
	function winFirst() {
		return (
			(won = firstTeamName),
			(lost = secondTeamName),
			(team1.goals += winnerGoals),
			(team2.goals += looserGoals)
		);
	}

	function winSecond() {
		return (
			(lost = firstTeamName),
			(won = secondTeamName),
			(team1.goals += looserGoals),
			(team2.goals += winnerGoals)
		);
	}
	chance1 > chance2 //83% & 17%
		? random < chance1
			? (winFirst(), teamsWinners.push(team1))
			: (winSecond(), teamsWinners.push(team2))
		: chance1 < chance2 //35% & 65%
		? random < chance2
			? (winSecond(), teamsWinners.push(team2))
			: (winFirst(), teamsWinners.push(team1))
		: random < chance1 //50 & 50
		? (winFirst(), teamsWinners.push(team1))
		: (winSecond(), teamsWinners.push(team2));
}
//ТОП ТРИ ПО ОЧКАМ
function topThreeTeams(array) {
	if(counter > 3) {
		return;
	}

	console.log(`Топ ${counter}: `);
	topThree.push(...array.filter( e => e.goals === array[0].goals ));
	console.log(topThree);
	teams.splice(0, topThree.length);
	topThree = [];
	counter += 1;
	topThreeTeams(teams);	
}


//ИГРА
function match(array) {
	let firstTeam;
	let secondTeam;
	let firstTeamPower;
	let secondTeamPower;

	teamsWinners = [];
	console.log(`РАУНД ${round}:`);
	round++;

	function matchStats() {
		let goals = totalGoals();
		console.log(
			`Результат матча: \nВсего голов: ${goals}\n${won} [${winnerGoals} : ${looserGoals}] ${lost}
			\nПОБЕДИТЕЛЬ: ${won}`
		);
	}

	for (let i = 0; i < array.length; i += 2) {
		firstTeam = array[i];
		secondTeam = array[i + 1];
		firstTeamPower = array[i].power;
		secondTeamPower = array[i + 1].power;
		firstTeamName = array[i].name;
		secondTeamName = array[i + 1].name;
		firstWinChance = Math.round(firstWR(firstTeamPower, secondTeamPower) * 100);
		secondWinChance = Math.round(
			secondWR(firstTeamPower, secondTeamPower) * 100
		);
		winnerGoals = Math.floor(Math.random() * 6) + 1;
		looserGoals = Math.floor(Math.random() * winnerGoals); //во избежание ничьи

		console.log(`*Матч №${matchNumber}`);
		matchNumber++;

		console.log(
			`${firstTeamName}: ${firstTeamPower} силы (Винрейт: ${firstWinChance}%)`
		);
		console.log(
			`${secondTeamName}: ${secondTeamPower} силы (Винрейт: ${secondWinChance}%)`
		);
		competition(firstTeam, secondTeam, firstWinChance, secondWinChance);
		matchStats();
	}
	if (teamsWinners.length <= 1) {
		winner = teamsWinners[0].name;
		return console.log(`Чемпион турнира - ${winner}`);
	}
	console.log(`Список команд в раунде ${round}: `);
	sortinGoals(teamsWinners);
	console.log(teamsWinners);
	match(teamsWinners);
}

createTeams();
shuffleTeams(teams);
match(teams);
sortinGoals(teams);
console.log("Топ три по очкам: ");
topThreeTeams(teams);
// console.log(topThree)
