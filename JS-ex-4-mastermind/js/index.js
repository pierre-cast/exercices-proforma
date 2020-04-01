let secret;
let level = 1;
let step = 0;
let nbColor;
const oKey = document.getElementById('keyboard');
if (level === 1) {
	// niv 1 on supprime le bouton vide
	let oEmpty = document.getElementById('button0');
	oKey.removeChild(oEmpty);
}

 // placement des écouteurs sur chaque bouton du clavier

const oColors = oKey.getElementsByTagName('button');
for (let i = 0 ; i < oColors.length; i++) {
	oButton = oColors[i];
	if (!oButton.disabled) {
		oButton.addEventListener('click', function() {
			insert(Number(this.getAttribute('data-number')));
		});
	}
}


// placement des écouteurs des boutons submit et clear
document.getElementById('clear').addEventListener('click', clear);
document.getElementById('submit').addEventListener('click', submit);

startGame();

function startGame() {
	nbColor = countColor();
	secret = generateSecret();
	step = 0;
	disableButton(true, 'submit');
}


// retourne le nombre de couleurs dans la sequence
function countColor() {
	return document.getElementById('keyboard').getElementsByTagName('button').length;
}


// création du code secret
function generateSecret() {
	let arr = []; 
	while (arr.length < 4) {
		let num = Math.floor(Math.random()*nbColor)+1;
		if (level !== 1 || arr.indexOf(num) === -1) {
			arr.push(num);
		}
	}
	return arr;
}

let test = [];

// on insère la couleur dans la sequence
function insert(color) {
	let seqLength = getSequencyLength();
	if (seqLength < 4) {
		let oDiv = document.createElement('div');
		oDiv.setAttribute('class', 'color'+color);
		let oSeq = document.getElementById('newSeq');
		oSeq.appendChild(oDiv);
		test.push(color);

		if (level === 1) {
			document.getElementById('button'+color).disabled = true;
		}

		if (seqLength === 3) {
			disableAllButtons(true);
			disableButton(false, 'submit');
		}
	} 
}


// retourne le nombre de couleurs dans la sequence
function getSequencyLength() {
	return document.getElementById('newSeq').getElementsByTagName('div').length;
}

// efface la sequence
function clear() {
	document.getElementById('newSeq').innerHTML = '';
	disableAllButtons(false);
	disableButton(true, 'submit');
	test = [];
}

// active/Desactive un bouton
function disableButton(action, button) {
	let oButton = document.getElementById(button);
	if (action) {
		oButton.disabled = true;
		oButton.classList.add("disabled");
	} else {
		oButton.disabled = false;
		oButton.classList.remove("disabled");
	}
}

// active ou desactive tous les boutons
function disableAllButtons(action) {
	for (let i = 0 ; i < oColors.length; i++) {
		disableButton(action, oColors[i].id);
	}
}

function submit() {
	step++;
	let oTr = document.getElementById('step'+step);
	oTr.getElementsByClassName('seq')[0].innerHTML = document.getElementById('newSeq').innerHTML;

	checkBlack();
	clear();
}

function checkBlack() {
	let notBlack = [];
	
	for (let i=0 ; i<secret.length; i++) {
		if (secret[i] === test[i]) {
			addResult('Black');
		} else {
			notBlack.push(secret[i]);
		}
	}

	if (notBlack.length === 0) {
		end(true);
	} else {
		checkWhite(notBlack);
	}
}

function checkWhite(notBlack) {
	for (let i=0 ; i<test.length; i++) {
		let position = notBlack.indexOf(test[i]);
		if (position !== -1) {
			addResult('White');
			notBlack.splice(position, 1);
		}
	}

	if (step === 10 && notBlack !== []) {
		end(false);
	}
}

function end(end) {
	// affiche secret !!!!
	showSecret(secret);

	let msg = (end) ? 'Bravo ! Vous avez trouvé le code secret' : 'Vous avez perdu ! Vous n\'avez plus d\'essai';
	alert (msg);
	if (window.confirm('Voulez-vous rejouer ?')) {
		restartAll();
	} else {
		alert ('Aurevoir !');
	}
}

function addResult(result) {
	let oDiv = document.createElement('div');
	oDiv.setAttribute('class', 'color'+result);
	let oResult = document.getElementById('step'+step).getElementsByClassName('result')[0];
	oResult.appendChild(oDiv);
}


function restartAll() {
	for (let i=1; i<= 10; i++) {
		let oTr = document.getElementById('step'+i);	
		oTr.getElementsByClassName('seq')[0].innerHTML ='';
		oTr.getElementsByClassName('result')[0].innerHTML ='';
	}

	document.getElementById('secret').innerHTML = '';
	document.getElementById('newSeq').innerHTML = '';
	disableAllButtons(false);
	startGame(); 
}

function showSecret(secret) {
	let oSecret = document.getElementById('secret');
	oSecret.innerHTML = '';

	for (i = 0; i<secret.length; i++) {
		let oDiv = document.createElement('div');
		oDiv.setAttribute('class', 'color'+secret[i]);
		oSecret.appendChild(oDiv);
	}
}