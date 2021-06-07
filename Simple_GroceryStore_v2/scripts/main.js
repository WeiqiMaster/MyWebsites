

// This function is called when any of the tab is clicked
// It is adapted from https://www.w3schools.com/howto/howto_js_tabs.asp

function openInfo(id, tabName) {

	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
		if (tablinks[i].id == id && i != 0)
		{
			for (j = i + 1; j < tablinks.length; j++) 
			{
				tablinks[j].disabled = true;
			}
			tablinks[i - 1].disabled = false;
		}
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(tabName).style.display = "block";
	document.getElementById(id).className += " active";

}

function confirm(evt)
{
	var tab;
	console.log(evt.currentTarget.id);
	switch (evt.currentTarget.id)
	{
		case "confirm0":
			tab = document.getElementById('navPref');
			console.log(tab);
			break;
		case "confirm1":
			tab = document.getElementById('navPref');
			console.log(tab);
			break;
		case "confirm2":
			tab = document.getElementById('navSelectPro');
			break;
		case "confirm3":
			tab = document.getElementById('navReview');
			break;
		case "confirm4":
			tab = document.getElementById('navChooseDeliv');
			break;
		case "confirm5":
			console.log(evt.currentTarget.id);
			tab = document.getElementById('navCheckout');
			break;
	}
	console.log(tab);
	tab.disabled = false;
	tab.click();
	
}
	
// generate a checkbox list from a list of products
// it makes each product name as the label for the checkbos

function populateListProductChoices() {
    //var s1 = document.getElementById(slct1);
    var s2 = document.getElementById("displayProduct");
	
	// s2 represents the <div> in the Products tab, which shows the product list, so we first set it empty
    s2.innerHTML = "";
		
	let checkboxDairyFree = document.getElementById("DairyFree");
	let checkboxNutsFree = document.getElementById("NutsFree");
	let checkboxOrganic = document.getElementById("organic");
	//console.log(checkboxPref.checked);
	// obtain a reduced list of products based on restrictions
    var optionArray = restrictListProducts(products, checkboxDairyFree.checked, checkboxNutsFree.checked, checkboxOrganic.checked);
	// if (document.getElementById("showAll").checked)
	// {
	// 	optionArray = products;
	// }

	// for each item in the array, create a checkbox element, each containing information such as:
	// <input type="checkbox" name="product" value="Bread">
	// <label for="Bread">Bread/label><br>

	// var productTable = document.getElementById("productTable1");
	// console.log(productTable);
	for (i = 0; i < optionArray.length; i++) {
		var productName = optionArray[i].name;
		console.log(productName);
		// create the checkbox and add in HTML DOM
		
		// let newRow = productTable.insertRow(-1);

		// // Insert a cell at the end of the row
		// let newCell = newRow.insertCell();

		// // Append a text node to the cell
		// let newText = document.createTextNode(productName);
		// newCell.appendChild(newText);

		let row = document.createElement("div");
		row.style.display = "table-row";
		var checkbox = document.createElement("input");
		checkbox.style.display = "table-cell";
		//checkbox.style.width = "5px";
		//checkbox.className = "itemRow";
		checkbox.type = "checkbox";
		checkbox.name = "product";
		checkbox.id = productName;
		checkbox.value = productName;
		//s2.appendChild(checkbox);
		row.appendChild(checkbox);
		
		// create a label for the checkbox, and also add in HTML DOM
		var label = document.createElement('label')
		label.htmlFor = productName;
		let nameSpan = document.createElement("span");
		nameSpan.style.display = "table-cell";
		nameSpan.style.width = "250px";
		//nameSpan.style.width = "200px";
		nameSpan.appendChild(document.createTextNode(productName));
		label.appendChild(nameSpan);

		let priceSpan = document.createElement("span");
		priceSpan.style.display = "table-cell";
		priceSpan.style.width = "100px";
		//priceSpan.style.width = "5px";
		//priceSpan.style.float = "left";
		priceSpan.appendChild(document.createTextNode("$" + optionArray[i].price));
		label.appendChild(priceSpan);

		let organicSpan = document.createElement("span");
		organicSpan.style.display = "table-cell";
		organicSpan.style.width = "200px";
		//organicSpan.style.width = "10px";
		organicSpan.appendChild(document.createTextNode("organic: " + (optionArray[i].organic?"yes":"no")));
		label.appendChild(organicSpan);
		//label.appendChild(document.createTextNode(productName + "\xa0 \xa0 \xa0 $" 
		//+ optionArray[i].price + "\xa0 \xa0 \xa0 organic: " + (optionArray[i].organic?"yes":"no")));
		//s2.appendChild(label);
		row.appendChild(label);
		
		// create a breakline node and add in HTML DOM
		s2.appendChild(row);
		//s2.appendChild(document.createElement("br"));    
	}
}
	
// This function is called when the "Add selected items to cart" button in clicked
// The purpose is to build the HTML to be displayed (a Paragraph) 
// We build a paragraph to contain the list of selected items, and the total price

function selectedItems(){
	var ele = document.getElementsByName("product");
	var chosenProducts = [];

	var c = document.getElementById('displayCart');
	c.innerHTML = "";
	
	let tableContent = "<table><tr><th style='width: 250px; text-align: left;'>Product Name  </th><th>Product Price  </th></tr>";

	// build list of selected item
	for (i = 0; i < ele.length; i++) { 
		if (ele[i].checked) {
			chosenProducts.push(ele[i].value);
			for (j = 0; j < products.length; j++)
			{
				if (products[j].name == ele[i].value)
				{
					tableContent += "<tr><td>" + ele[i].value + "</td><td>$" + products[j].price + "</td></tr>";
					break;
				}
			}
		}
	}

	tableContent += "</table><hr>";
	c.innerHTML = tableContent;

	price_h3 = document.createElement("h3");
	price_h3.innerHTML = "The total price of your item is $" + getTotalPrice(chosenProducts);
	c.appendChild(price_h3);
	//populateCheckoutBoard();
}

function populateCheckoutBoard()
{	
	var ele = document.getElementsByName("product");
	var chosenProducts = [];

	var c = document.getElementById('finalCart');
	c.innerHTML = "";
	
	let tableContent = "<table><tr><th style='width: 250px; text-align: left;'>Product Name  </th><th>Product Price  </th></tr>";

	// build list of selected item
	for (i = 0; i < ele.length; i++) { 
		if (ele[i].checked) {
			chosenProducts.push(ele[i].value);
			for (j = 0; j < products.length; j++)
			{
				if (products[j].name == ele[i].value)
				{
					tableContent += "<tr><td>" + ele[i].value + "</td><td>$" + products[j].price + "</td></tr>";
					break;
				}
			}
		}
	}

	tableContent += "</table><hr>";
	c.innerHTML = tableContent;

	price_h3 = document.createElement("h3");

	let needDeliv = false;

	//document.getElementById("finalCart").innerHTML = document.getElementById("displayCart").innerHTML;
	let del = document.getElementsByName("timeSlot");
	for (i = 0; i < del.length; i++)
	{
		if (del[i].checked)
		{
			if (i == 6)
			{
				document.getElementById("finalDeliveryTime").innerHTML = "Pickup";
				document.getElementById("finalDeliveryPrice").innerHTML = "Free";
				break;
			}
			needDeliv = true;
			document.getElementById("finalDeliveryTime").innerHTML = del[i].value.split(";;")[0];
			document.getElementById("finalDeliveryPrice").innerHTML = "$" + del[i].value.split(";;")[1];
			let price = parseFloat(getTotalPrice(chosenProducts)) + parseFloat(del[i].value.split(";;")[1]);
			price_h3.innerHTML = "The Total Price is $" + price.toFixed(2);
			break;
		}
	}

	if (needDeliv == false)
	{
		price_h3.innerHTML = "The Total Price is $" + getTotalPrice(chosenProducts);
	}
	document.getElementById("final_price").innerHTML = "";
	document.getElementById("final_price").appendChild(price_h3);
	
}
