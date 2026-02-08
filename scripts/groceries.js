	
// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products		 

var products = [
	{
		name: "brocoli",
		vegetarian: true,
		glutenFree: true,
		organic: true,
		price: 1.99,
		image: "photos/fresh-broccoli.png",
		ingredients: ["broccoli"]
	},
	{
		name: "bread",
		vegetarian: true,
		glutenFree: false,
		organic: false,
		price: 2.35,
		image: "photos/bread.jpg",
		ingredients: ["wheat flour", "yeast", "water", "salt"]
	},
	{
		name: "salmon",
		vegetarian: false,
		glutenFree: true,
		organic: false,
		price: 10.00,
		image: "photos/salmon.jpg",
		ingredients: ["salmon"]
	},
	{
		name: "tofu",
		vegetarian: true,
		glutenFree: true,
		organic: true,
		price: 3.50,
		image: "photos/tofu.jpg",
		ingredients: ["soybeans", "water", "calcium sulfate"]
	},
	{
		name: "chicken breast",
		vegetarian: false,
		glutenFree: true,
		organic: true,
		price: 7.25,
		image: "photos/chickenbreast.jpg", 
		ingredients: ["chicken"]
	},
	{
		name: "pasta",
		vegetarian: true,
		glutenFree: false,
		organic: false,
		price: 2.99,
		image: "photos/pasta.jpg",
		ingredients: ["wheat semolina", "water"]
	},
	{
		name: "apple",
		vegetarian: true,
		glutenFree: true,
		organic: true,
		price: 0.99,
		image: "photos/apple.png",
		ingredients: ["apple"]
	},
	{
		name: "cheese",
		vegetarian: true,
		glutenFree: true,
		organic: false,
		price: 4.25,
		image: "photos/cheese.jpg", 
		ingredients: ["milk", "salt", "enzymes", "bacterial cultures"]
	},
	{
		name: "milk",
		vegetarian: true,
		glutenFree: true,
		organic: true,
		price: 3.75,
		image: "photos/milk.jpg", 
		ingredients: ["milk"]
	},
	{
		name: "cereal",
		vegetarian: true,
		glutenFree: false,
		organic: false,
		price: 3.40,
		image: "photos/cereal.jpg", 
		ingredients: ["wheat", "sugar", "salt"]
	}
];



// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function restrictListProducts(products, restrictions) {
	let product_list = [];

	for (let i = 0; i < products.length; i++) {
		let product = products[i];

		if (
			(!restrictions.vegetarian || product.vegetarian) &&
			(!restrictions.glutenFree || product.glutenFree) &&
			(!restrictions.organic || product.organic)
		) {
			product_list.push({
				name: product.name,
				price: product.price
			});
		}
	}

	// Sort by price (low → high)
	product_list.sort(function (a, b) {
		return a.price - b.price;
	});

	return product_list;
}


// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
	totalPrice = 0;
	for (let i=0; i<products.length; i+=1) {
		if (chosenProducts.indexOf(products[i].name) > -1){
			totalPrice += products[i].price;
		}
	}
	return totalPrice;
}

function getPrice(chosenItem){
	price=0;
	for (let i in products){
		if (products[i].name == chosenItem){
			price = products[i].price
		}
	}
	return price;

}
