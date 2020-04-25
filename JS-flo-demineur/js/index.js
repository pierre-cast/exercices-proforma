const boardHeight = 20;
const boardWidth = 20;
const nbBomb = 50;
let nbEssais = boardHeight*boardWidth - nbBomb;
document.getElementById('rest').innerHTML = nbEssais;
let board = [];
const oBoard = document.getElementById("boardgame");

startGame();
function startGame() {
	board = createBoard(boardWidth, boardHeight);
	createBomb(nbBomb);
}

function createBoard(x, y) {
	for (let i = 0; i < x; i++) {
		board.push([]);
		let oTr = document.createElement('tr');

		for (let j = 0; j < y; j++) {
			board[i].push(0);
			let oTd = document.createElement('td');
			oTd.setAttribute('data-x', i);
			oTd.setAttribute('data-y', j);
			oTd.id = "td_"+i+"_"+j;
			oTr.appendChild(oTd);
			oTd.addEventListener('click', (e) => {
				e.target.removeEventListener('click', (e) => {
					clickElement(e.target)}, false);

				clickElement(e.target);
			});
		}

		oBoard.appendChild(oTr);
	}
	return board;
}

function createBomb(nbBomb) {
	let placedBomb = 1;
	let x, y;
	while (placedBomb <= nbBomb) {
		x = Math.floor(Math.random()*boardWidth); 
		y = Math.floor(Math.random()*boardHeight); 
		
		if (board[x][y] === 0) {
			placedBomb++;
			board[x][y] = 1;
		}
	}
}

function clickElement(target) {
	let pos = {
		x : Number(target.getAttribute('data-x')),
		y : Number(target.getAttribute('data-y')),
	}

	if (board[pos.x][pos.y] === 1) {
		target.classList.add('boum');
		endGame(false);
	} else {
		nbEssais--;
		document.getElementById('rest').innerHTML = nbEssais;
		target.classList.add('empty');
		let status = calculAllStatus(pos);
		if (status !== 0) {
			target.innerHTML = status;
		} else {
			clickAllAround(target);
		}
		
		if (nbEssais <= 0) {
			endGame(true);
		}
	}
}

function calculAllStatus(pos) {
	let up = getStatus(pos.x, pos.y-1);
	let upRight = getStatus(pos.x+1, pos.y-1);
	let right = getStatus(pos.x+1, pos.y);
	let downRight = getStatus(pos.x+1, pos.y+1);
	let down = getStatus(pos.x, pos.y+1);
	let downLeft = getStatus(pos.x-1, pos.y+1);
	let left = getStatus(pos.x-1, pos.y);
	let upLeft = getStatus(pos.x-1, pos.y-1);

	return up+upRight+right+downRight+left+downLeft+down+upLeft;
}

function getStatus(x,y) {
	return (board[x] !== undefined && board[x][y] !== undefined) ? board[x][y] : 0;
}

function clickAllAround(target) {
	let x = Number(target.getAttribute('data-x'));
	let y = Number(target.getAttribute('data-y'));

	clickAround(x, y-1);
	clickAround(x+1, y-1);
	clickAround(x+1, y);
	clickAround(x+1, y+1);
	clickAround(x, y+1);
	clickAround(x-1, y+1);
	clickAround(x-1, y);
	clickAround(x-1, y-1);
}

function clickAround(x,y) {
	if (document.getElementById('td_'+x+'_'+y) 
			&& document.getElementById('td_'+x+'_'+y) !== undefined 
			&& !document.getElementById('td_'+x+'_'+y).classList.contains('empty')
		) {
		document.getElementById('td_'+x+'_'+y).click();
	} else {
		return false;
	}
}

function endGame(win) {
	// affiche toutes les bombes
	showBombs();
	if (win) {
		alert('Bravo');
	} else {
		alert('Perdu');
	}
}

// affiche toutes les bombes
function showBombs() {
	for (let i = 0; i < boardWidth; i++) {
		for (let j = 0; j < boardHeight; j++) {
			if (board[i][j] === 1) {
				document.getElementById("td_"+i+"_"+j).classList.add('bomb');
			}
		}
	}
}

// removeEventListener ????

// endGame => stop the game !!!!
