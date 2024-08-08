function loadCheckoutCart() {
    let checkoutCart = JSON.parse(localStorage.getItem('checkoutCart'));
    let checkoutItems = document.getElementById('checkoutItems');
    let checkoutTotal = document.getElementById('checkoutTotal');
    let grossTotal = document.getElementById('grossTotal');
    let total = 0;
    let tax = document.getElementById('tax');

    if (checkoutCart && checkoutCart.length > 0) {
        checkoutCart.forEach((item, index) => {
            total += item.price; 
            let row = `<tr>
                        <td>#${index + 1}</td>
                        <td>${item.name}</td>
                        <td>${item.quantity}</td>
                        <td>${item.price}</td>
                      </tr>`;
            checkoutItems.innerHTML += row; // putting each item to the cart table
        });
    }
    let tax_value = total * 15 / 100; 
    tax.innerText = ' + Rs.' + Math.round(tax_value); 
    grossTotal.innerText = 'Rs.' + total; 
    checkoutTotal.innerText = 'Rs.' + (total + tax_value + 500);
    pullCardDetails(); 
}

// Validate form inputs before proceeding to payment
function validateForm() {
    let shippingAddress = document.getElementById('sadd').value.trim();
    let name = document.getElementById('name').value.trim();
    let isCardPayment = document.getElementById('Card').checked;
    let cardNumber = document.getElementById('cnum').value.trim();
    let cardMonth = document.getElementById('month').value;
    let cardYear = document.getElementById('year').value;
    let cvv = document.getElementById('cvv').value.trim();

    // Check if address and name fields are filled
    if (!shippingAddress) {
        alert('Please enter your shipping address.');
        return false;
    }

    if (!name) {
        alert('Please enter your name.');
        return false;
    }

    // Check if card details are filled if card payment is selected
    if (isCardPayment) {
        if (!cardNumber || cardNumber.length !== 16) {
            alert('Please enter a valid card number.');
            return false;
        }

        if (!cardMonth || !cardYear) {
            alert('Please select card expiration date.');
            return false;
        }

        if (!cvv || cvv.length !== 3) {
            alert('Please enter a valid CVV.');
            return false;
        }
    }
    return true;
}

// Display the thank you message with delivery date
function paymentDone() {
    if (!validateForm()) {
        return; // Stop if form validation fails
    }

    let stuffs = document.getElementById('checkout_content'); 
    let addy = document.getElementById('sadd').value;
    let fname = document.getElementById('name').value; 
    let lname = document.getElementById('lname').value; 
    let name = `${fname} ${lname}`; 

    let today = new Date(); 
    let deliveryDate = new Date(); 
    deliveryDate.setDate(today.getDate() + 4); 

    /* // Format delivery date
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let formattedDate = deliveryDate.toLocaleDateString('en-US', options); */

    // Display thank you message and styling
    stuffs.innerText = `Thank you ${name} for the order.\nThe order will be delivered to ${addy} by ${deliveryDate}`; 
    stuffs.style.margin = '250px 25px';
    stuffs.style.padding = '50px';
    stuffs.style.backgroundColor = '#001F3F';
    stuffs.style.color = 'white';
}

let payBTN = document.getElementById('pay');
payBTN.addEventListener('click', paymentDone); // Add event listener to the pay button

const codRadio = document.getElementById('COD');
const cardRadio = document.getElementById('Card');
const cardChosen = document.getElementById('cardChosen');

// Function to toggle card details visibility
function pullCardDetails() {
    if (cardRadio.checked) {
        cardChosen.style.display = 'block';
    } else {
        cardChosen.style.display = 'none';
    }
}

codRadio.addEventListener('change', pullCardDetails);
cardRadio.addEventListener('change', pullCardDetails);

window.onload = loadCheckoutCart; // Load the checkout cart when the window loads
