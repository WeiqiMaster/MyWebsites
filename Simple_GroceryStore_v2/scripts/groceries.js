	
// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products		 

var products = [
	{
		name: "broccoli",
		dairyFree: true,
		nutsFree: true,
		price: 1.99,
		organic: true
	},
	{
		name: "ginger",
		dairyFree: true,
		nutsFree: true,
		price: 2.11,
		organic: true
	},
	{
		name: "bread",
		dairyFree: true,
		nutsFree: true,
		price: 2.35,
		organic: false
	},
	{
		name: "cabbage",
		dairyFree: true,
		nutsFree: true,
		price: 3.33,
		organic: true
	},
	{
		name: "chocolate milk 2L",
		dairyFree: false,
		nutsFree: true,
		price: 4.00,
		organic: false
	},
	{
		name: "milk 2L",
		dairyFree: false,
		nutsFree: true,
		price: 4.33,
		organic: false
	},
	{
		name: "cereal",
		dairyFree: false,
		nutsFree: false,
		price: 5.00,
		organic: false
	},
	{
		name: "salmon",
		dairyFree: false,
		nutsFree: true,
		price: 10.00,
		organic: false
	},
	{
		name: "chicken legs 1kg",
		dairyFree: true,
		nutsFree: true,
		price: 10.33,
		organic: true
	},
	{
		name: "chicken breast  1kg",
		dairyFree: true,
		nutsFree: true,
		price: 11.00,
		organic: true
	},
	{
		name: "ground beef  1kg",
		dairyFree: true,
		nutsFree: true,
		price: 11.33,
		organic: false
	},
	{
		name: "pork back ribs  1kg",
		dairyFree: true,
		nutsFree: true,
		price: 12.00,
		organic: true
	},
	{
		name: "ground pork  1kg",
		dairyFree: true,
		nutsFree: true,
		price: 12.33,
		organic: false
	},
	{
		name: "AAA Angus Beef Steak 1kg",
		dairyFree: true,
		nutsFree: true,
		price: 17.00,
		organic: true
	}
];
	


// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function restrictListProducts(prods, preferDairyFree, preferNutsFree, preferOrganic) {
	let products_filtered = [];
	for (let i=0; i<prods.length; i+=1) {
		let shallAdd = true;
		if (preferDairyFree && (prods[i].dairyFree == false))
		{
			shallAdd = false;
		}
		if (preferNutsFree && !prods[i].nutsFree)
		{
			shallAdd = false;
		}
		if (preferOrganic && !prods[i].organic)
		{
			shallAdd = false;
		}

		if (shallAdd)
		{
			products_filtered.push(prods[i]);
		}
		// if ((prods[i].dairyFree == preferDairyFree) && (prods[i].nutsFree == preferNutsFree) && (prods[i].organic == preferOrganic)){
		// 	products_filtered.push(prods[i]);
		// }
		// else if ((restriction == "NutsFree") && (prods[i].nutsFree == true) && (prods[i].organic == preferOrganic)){
		// 	products_filtered.push(prods[i]);
		// }
		// else if ((restriction == "None")  && (prods[i].organic == preferOrganic)){
		// 	products_filtered.push(prods[i]);
		// }
	}
	return products_filtered;
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
	let totalPrice = 0;
	for (let i=0; i<products.length; i+=1) {
		if (chosenProducts.indexOf(products[i].name) > -1){
			totalPrice += products[i].price;
		}
	}
	totalPrice = totalPrice.toFixed(2);
	return totalPrice;
}
