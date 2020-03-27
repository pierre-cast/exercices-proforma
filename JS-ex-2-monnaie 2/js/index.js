document.getElementById('submit').addEventListener('click', function () {
	submitSum();
});

// récupère la some et véerifie la validité
function submitSum(){
	let sum = Number(document.getElementById("sum").value)*100;

	if (Number.isInteger(sum) && sum>0) {
		let stock = generateStock();
		calculate(stock, sum);
	} else {
		alert("Veuillez entrer un nombre positif avec maximum 2 décimales. ex: 745.23");
	}
}

//chargement du stock 
function generateStock() {
	let stock = [
		{	value : 50000, 	name : 'Euro500'},
		{	value : 20000, 	name : 'Euro200'},
		{	value : 10000, 	name : 'Euro100'},
		{	value : 5000, 	name : 'Euro50'},
		{	value : 2000, 	name : 'Euro20'},
		{	value : 1000, 	name : 'Euro10'},
		{	value : 500, 	name : 'Euro5'},
		{	value : 200, 	name : 'Euro2'},
		{	value : 100, 	name : 'Euro1'},
		{	value : 50, 	name : 'Cent50'},
		{	value : 20, 	name : 'Cent20'},
		{	value : 10, 	name : 'Cent10'},
		{	value : 5, 		name : 'Cent5'},
		{	value : 2, 		name : 'Cent2'},
		{	value : 1, 		name : 'Cent1'},
	];

	for (let i = 0; i < stock.length; i++) {
		let item = stock[i];
		let stockValue = Number(document.getElementById("stock"+item.name).innerHTML);
		item.stockValue = stockValue;
	}

	return stock;
}

// Décompose la somme et affiche le résultat
function calculate(stock, sum) {
	let text = '';
	for (let i = 0; i < stock.length ; i++) {
		let item = stock[i];
		let quantity = Math.floor(sum / item.value);

		if (item.stockValue > quantity) {
			item.quantity = quantity;
		} else {
			item.quantity = item.stockValue;
		}
		sum -= item.quantity*item.value;
		document.getElementById("result"+item.name).innerHTML = item.quantity ;
		if (item.quantity > 0) {
			text = text.concat(document.getElementById("name"+item.name).innerHTML+" : " + item.quantity +"<br>");
		}
	}	

	if (sum > 0) {
		document.getElementById("finalResult").innerHTML = "Il n'y a pas assez d'argent dans le stock !";
	} else {
		document.getElementById("finalResult").innerHTML = text +" <br> Reste  : "+(sum/100);
	}
}
