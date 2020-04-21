const input = document.getElementById('input');
const submit = document.getElementById('submit');
const list = document.getElementById("toDoList");
const itemsLeft = document.getElementById("itemsLeft");
const filters =  document.getElementsByClassName("filter");

let listArr = [];
let freeId = 0;

/*  -- event -- */
submit.addEventListener('click', function(e) {
	if (input.value !== undefined) {
		createItem();
	} else {
		alert ('Veuillez insérer un libellé dans le champ');
	}
	e.preventDefault();
});
console.log(filters);
for (let i = 0; i< filters.length; i++ ) {
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
	
	addItem(todo);
}

function SearchFreeId() {
	let id = 'item_'.concat(freeId);
	freeId++;

	return id;
}

function addItem(todo) {
	listArr.push(todo);

	let item = document.createElement('li');
	item.id = todo.id;
	item.setAttribute('data-status', 'undone');

	item.appendChild(createButtonDone());
	item.appendChild(createInput(todo));
	item.appendChild(createButtonRemove());

	list.appendChild(item);
	updateTotal();
}

function updateTotal() {
	document.getElementById('itemsLeft').innerHTML = list.children.length;
}

function createButtonRemove() {
	let remove = document.createElement('button');
	let removeText = document.createTextNode("X");
	remove.appendChild(removeText);
	remove.addEventListener('click', function () {
		removeAction(this.parentNode);
	});
	return remove;
}

function createButtonDone() {
	let done = document.createElement('button');
	let doneText = document.createTextNode("O");
	done.appendChild(doneText);
	done.addEventListener('click', function () {
		doneAction(this.parentNode);
	});
	return done;
}

function createInput(todo) {
	let input = document.createElement('input');
	input.setAttribute('type', 'text');
	input.value = todo.libelle;
	input.addEventListener('change', function () {
		modifyAction(this.parentNode);
	});
	return input;
}

function removeAction(item) {
	// modifie le DOM
	list.removeChild(item);

	// modifie la liste
	listArr = listArr.filter(x => x.id !== item.id);
	updateTotal();

}

function doneAction(item) {
	// modifie le DOM
	item.setAttribute('data-status', 'done');
	item.done = true;

	// modifie la liste
	listArr.forEach(x => {
		if (x.id === item.id) {
			x.done = true;
		}
	});
}

function modifyAction(item) {
	// modifie la liste
	listArr.forEach(x => {
		if (x.id === item.id) {
			x.libelle = item.children[1].value; 
		}
	});
}

function clearAction() {	
	// modifie le DOM
	listArr = listArr.filter(x => x.done === false);
	
	// modifie la liste
	for (let item of list.children) {
		console.log(item);
		if (item.getAttribute('data-status') === 'done') {
			list.removeChild(item); 
		}
	}
	updateTotal();
}

function filterList(what) {
	let status;
	
	for (let item of list.children) {
		status = item.getAttribute('data-status');
		switch (what) {
			case 'complete':
				if (status === 'done') {
					item.style.display = 'block';
				} else {
					item.style.display = 'none';
				}
				break;
			case 'active':

				if (status === 'undone') {
					item.style.display = 'block';
				} else {
					item.style.display = 'none';
				}
				break;
			default: 
				item.style.display = 'block';
				break;
		}
	}
}
