const input = document.getElementById('input');
const submit = document.getElementById('submit');
const list = document.getElementById('toDoList');
const itemsLeft = document.getElementById('itemsLeft');
const filters =  document.getElementsByClassName('filter');

let listArr = getStorage(); 
let freeId = 0; 
showInitialList();

/*  -- event -- */
submit.addEventListener('click', function(e) {
	if (input.value !== '') {
		createItem();
	} else {
		alert ('Veuillez insérer un libellé dans le champ');
	}
	e.preventDefault();
}); 

for (let i = 0; i < filters.length; i++ ) {
	filters[i].addEventListener('click', function (){
		filterList(this.id);
	})
}

clearComplete.addEventListener('click', clearAction);

/*  -- functions-- */
function createItem() {
	let newId = SearchFreeId();
	let todo = {
		done: false, 
		libelle: input.value,
		id: newId,
	}
	input.value = '';
	listArr.push(todo);
	addItem(todo);
	SetStorage();
}

function SearchFreeId() {
	let id = 'item_'.concat(freeId);
	freeId++;

	return id;
}

// genère la liste de départ !
function showInitialList() {
	// parcours listArr
	if (listArr.length !== 0) {
		for (let i = 0; i < listArr.length ; i++) {
			addItem(listArr[i]);
			let getNumberFromId = (listArr[i].id).substring(5);
			freeId = Math.max(freeId, Number(getNumberFromId));

			if (listArr[i].done) {
				document.getElementById(listArr[i].id).setAttribute('data-source', 'done');
			}
		}
		freeId++;
	}
}

function addItem(todo) {
	let item = document.createElement('li');
	item.id = todo.id;
	item.setAttribute('data-status', (todo.done)? 'done' : 'undone');
	if (checkFilterActive() === 'complete') {
		item.classList.add('hide');
	}

	item.appendChild(createButtonDone());
	item.appendChild(createInput(todo));
	item.appendChild(createButtonRemove());

	list.appendChild(item);
	updateTotal();
	SetStorage();
}

// mise à jour du nombre total d'élément
function updateTotal() {
	document.getElementById('itemsLeft').innerHTML = list.children.length +" élément"+((list.children.length<=1 ) ? '': 's')+" dans la liste";
}

// génération du button Remove
function createButtonRemove() {
	let remove = document.createElement('button');
	let removeText = document.createTextNode('X');
	remove.appendChild(removeText);
	remove.addEventListener('click', function () {
		removeAction(this.parentNode);
	});

	return remove;
}

// génération du button done
function createButtonDone() {
	let done = document.createElement('button');
	done.addEventListener('click', function () {
		doneAction(this.parentNode);
	});

	return done;
}

// génération de l'input
function createInput(todo) {
	let input = document.createElement('input');
	input.setAttribute('type', 'text');
	input.value = todo.libelle;
	input.addEventListener('change', function () {
		modifyAction(this.parentNode);
	});

	return input;
}

// suppression d'un élément unique (X)
function removeAction(item) {
	// modifie le DOM
	list.removeChild(item);

	// modifie la liste
	listArr = listArr.filter(x => x.id !== item.id);
	updateTotal();
	SetStorage();
}

// modification du status (done/undone)
function doneAction(item) {
	// modifie le DOM
	let status = item.getAttribute('data-status');
	if (status === 'done') {
		item.setAttribute('data-status', 'undone');
		item.done = false;
	} else {
		item.setAttribute('data-status', 'done');
		item.done = true;
	}

	// modifie la liste
	listArr.forEach(x => {
		if (x.id === item.id) {
			x.done = (status === 'done') ? false : true;
		}
	});

	SetStorage();
}

// modification du libellé
function modifyAction(item) {
	// modifie la liste
	listArr.forEach(x => {
		if (x.id === item.id) {
			x.libelle = item.children[1].value; 
		}
	});

	// modifie le stockage
	SetStorage();
}

// suppression des todo realisé
function clearAction() {
	
	// modifie le DOM
	listArr = listArr.filter(x => x.done === false);
	
	// modifie la liste
	for (let i = list.children.length-1; i >=0 ; i--) {
		if (list.children[i].getAttribute('data-status') === 'done') {
			list.removeChild(list.children[i]);	
		}
	}
	
	updateTotal();
	SetStorage();
}

// indique quel filtre est actif
function checkFilterActive() {
	for (let filter of filters) {
		if (filter.classList.contains('active')) {
			
			return filter.id;
		}
	}

	return false;
}

// filtrage de la liste
function filterList(what) {
	// modifier le filter actif
	for (let i = 0; i < 3; i++) {
		filters[i].classList.remove('active');
	}
	switch (what) {
		case 'complete':
			filters[2].classList.add('active');
			break;
		case 'active':
			filters[1].classList.add('active');
			break;
		default: 
			filters[0].classList.add('active');
			break;
	}

	// modifier la liste
	let status;
	for (let item of list.children) {
		status = item.getAttribute('data-status');
		
		switch (what) {
			case 'complete':
				if (status === 'done') {
					item.classList.remove('hide');
				} else {
					item.classList.add('hide');
				}
				break;
			case 'active':
				if (status === 'undone') {
					item.classList.remove('hide');
				} else {
					item.classList.add('hide');
				}
				break;
			default: 
			item.classList.remove('hide');
				break;
		}
	}
}

// mise à jour du stockage
function SetStorage() {
	window.localStorage.setItem('todolist', JSON.stringify(listArr));
}

// récupère le stockage
function getStorage() {
	let storage;
	if (window.localStorage.getItem('todolist') && window.localStorage.getItem('todolist') !== undefined) {
		storage = JSON.parse(window.localStorage.getItem('todolist'));
	} else {
		storage = [];
		window.localStorage.setItem('todolist', JSON.stringify([]));
	}

	return storage;
}
