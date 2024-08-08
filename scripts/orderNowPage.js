const items = [
    {
        //Fruits
        "mangosteen": 100,
        "guava": 250,
        "rambutan": 400,
        "strawberry": 600,
        "blackberry": 1650,
        "blueberry": 2050
    },
    {
        //Veges
        "carrot": 350,
        "eggplant": 400,
        "onion": 230,
        "potato": 150,
        "tomato": 220,
        "cauliflower": 469
    },
    {
        //Dairy
        "milk": 750,
        "chocolate-milk": 890,
        "cheddar-cheese": 2600,
        "greek-yoghurt": 3700,
        "ice-cream": 750,
        "casein-protein": 6969.69
    },
    {
        //Meat
        "chicken": 1500,
        "skinless-chicken": 2500,
        "beef": 5650,
        "barramundi": 1250,
        "halibut": 1650,
        "tuna": 1450
    },
    {
        //Baking
        "flour": 450,
        "chocolate-chips": 1250,
        "sprinkles": 250,
        "vanilla": 1000.69,
        "oregano": 690,
        "olive-oil": 1699
    }
];

// function to put items to the cart
function putIntoCart() {
    let total = 0;
    let itemNum = 1;
    let addToCart = '';
    let orders = document.getElementById('orders');
    let totalPrice = document.getElementById('totalPrice');
    let checkoutCart = [];

    for (let i = 0; i < items.length; i++) {
        let category = items[i];
        for (let key in category) {
            let quantity = parseFloat(document.getElementById(key).value);
            if (quantity > 0) {
                let price = quantity * category[key];
                total += price;
                checkoutCart.push({ name: key, quantity: quantity, price: price }); 
                addToCart += `<tr>
                                <td style="text-transform:uppercase;"><b>#${itemNum}</b></td>
                                <td style="text-transform:uppercase;"><b>${key}</b></td>
                                <td style="text-transform:uppercase;"><b>${quantity}</b></td>
                                <td style="text-transform:uppercase;"><b>${price}</b></td>
                              </tr>`;
                itemNum++;
            }
        }
    }
    localStorage.setItem('checkoutCart', JSON.stringify(checkoutCart)); 
    orders.innerHTML = addToCart;
    totalPrice.innerText = total;
}

// function to add items to the favourites list
function addToFavorites() {
    let favorites = {};
    for (let i = 0; i < items.length; i++) {
        let category = items[i];
        for (let key in category) {
            let quantity = parseFloat(document.getElementById(key).value);
            if (quantity > 0) {
                favorites[key] = quantity;
            }
        }
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// function to put favourites to cart
function pullFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favorites'));
    if (favorites) {
        for (let key in favorites) {
            if (document.getElementById(key)) {
                document.getElementById(key).value = favorites[key];
            }
        }
        putIntoCart();
    }
}

// function to see if the cart has items
function payValidation(){
    let checkoutCart = JSON.parse(localStorage.getItem('checkoutCart'));
    if (!checkoutCart || checkoutCart.length == 0){
        alert('The cart cannot be empty');
    } else {
        window.location.href = "/checkoutPage.html";
    }
}
 
// function to reset the order table 
let resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', function(){
    let orders = document.getElementById('orders');
    orders.innerHTML = '';
    localStorage.removeItem('checkoutCart');
});

// Add event listeners to all add buttons 
function setupEventListeners() {
    //Add to cart button
    let plusBTN = document.getElementById('plusBTN');
    plusBTN.addEventListener('click', putIntoCart);

    //Add to favourites button
    let favBTN = document.getElementById('favBTN');
    favBTN.addEventListener('click', addToFavorites);

    //Button to pull all the favourites to the table
    document.getElementById('pull').addEventListener('click', pullFavorites);

    //Button to proceed to the checkout page
    payBTN = document.getElementById('pay');
    payBTN.addEventListener('click', payValidation);
}

setupEventListeners();
window.onload = localStorage.removeItem('checkoutCart');