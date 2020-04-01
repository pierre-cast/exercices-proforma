let list = [];

document.getElementById('reset').addEventListener('click', reset);
document.getElementById('submit').addEventListener('click', function(e) {
	e.preventDefault();
	submitNum();
	return false;
});

// récupère la valeur et vérifie sa validité
function submitNum() {
	let num = document.getElementById('num').value; 

	if (num !== '' && Number.isInteger(Number(num))) {
		list.push(Number(num));
		calculate(num);
	} else {
		alert('Le valeur entrée n\'est pas un nombre entier');
	}
}

// calcul et affiche les résultats
function calculate(num) {
	// déclaration
	let indexSeq = 0;		// index de la séquence en cours
	let lengthSeq = 0;		// longueur de la séquence en cours
	let indexSeqMax = 0;	// index de la séquence la plus longue
	let lengthSeqMax = 0;	// longueur de la séquence la plus longue
	let sum = 0;

	//calcul
	for (let i = 0 ; i < list.length; i++) {
		let lastValue = (i == 0) ? null : list[i-1];
		
		sum += list[i];

		if (lastValue == null || lastValue <= list[i]) {
			// on insère le nombre dans la séquence en cours 
			lengthSeq++;

			if (lengthSeq >= lengthSeqMax) {
				// la séquence en cours devient le séquence max
				indexSeqMax = indexSeq;
				lengthSeqMax = lengthSeq;
			}
		} else {
			// la séquence en cours s'arrête, une nouvelle commence !
			indexSeq = i;
			lengthSeq = 1;
		}
	}

	let result = [ 
		list.length, 
		sum, 
		Math.max(...list),  
		Math.min(...list), 
		Math.round(100*sum/list.length)/100, 
		list.join(', '), 
		getSequency(list, indexSeqMax, lengthSeqMax).join(', '),
	];

	showResult(result);
}

// récupération de la séquence la plus longue
function getSequency(arr, index, length) {
	return arr.slice(index, index+length);
}

// réinitialisation
function reset() {
	let result = new Array(7).fill(0);
	showResult(result);
}

//affichage des résultats
function showResult(result) {
	let names = ['quantity', 'sum', 'max', 'min', 'average', 'list', 'sequency'];
	document.getElementById('num').value = '';
	names.forEach(function(name, index) {
		document.getElementById(name).innerHTML = result[index];
	}); 
}
