/* ==========================================
   CART.JS
========================================== */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ---------- Save Cart ---------- */

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* ---------- Update Cart Badge ---------- */

function updateCartCount() {

    const badge = document.getElementById("cart-count");

    const count = cart.reduce((total, item) => total + item.quantity, 0);

    badge.textContent = count;
}

/* ---------- Add To Cart ---------- */

function addToCart(id) {

    const product = products.find(item => item.id === id);

    if (!product) return;

    const existing = cart.find(item => item.id === id);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity:1

        });

    }

    saveCart();

    updateCartCount();

    renderCart();

    alert(product.name + " added to cart.");

}

/* ---------- Remove Item ---------- */

function removeItem(id){

    cart = cart.filter(item => item.id !== id);

    saveCart();

    updateCartCount();

    renderCart();

}

/* ---------- Increase Quantity ---------- */

function increaseQty(id){

    const item = cart.find(product => product.id === id);

    if(item){

        item.quantity++;

    }

    saveCart();

    updateCartCount();

    renderCart();

}

/* ---------- Decrease Quantity ---------- */

function decreaseQty(id){

    const item = cart.find(product => product.id === id);

    if(!item) return;

    item.quantity--;

    if(item.quantity <= 0){

        removeItem(id);

        return;

    }

    saveCart();

    updateCartCount();

    renderCart();

}

/* ---------- Calculate Total ---------- */

function calculateTotal(){

    return cart.reduce((total,item)=>{

        return total + item.price * item.quantity;

    },0);

}

/* ---------- Render Cart ---------- */

function renderCart(){

    const container = document.getElementById("cart-items");

    const total = document.getElementById("cart-total");

    if(!container) return;

    container.innerHTML = "";

    if(cart.length === 0){

        container.innerHTML = `

        <p style="text-align:center;margin-top:40px;color:#777;">
            Your cart is empty.
        </p>

        `;

        total.textContent = "0";

        return;

    }

    cart.forEach(item=>{

        container.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-details">

                <h4>${item.name}</h4>

                <p>₹${item.price.toLocaleString("en-IN")}</p>

                <div class="qty">

                    <button onclick="decreaseQty(${item.id})">-</button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQty(${item.id})">+</button>

                </div>

                <div
                    class="remove-btn"
                    onclick="removeItem(${item.id})">

                    Remove

                </div>

            </div>

        </div>

        `;

    });

    total.textContent = calculateTotal().toLocaleString("en-IN");

}

/* ---------- Cart Sidebar ---------- */

const cartIcon = document.querySelector(".cart-icon");

const cartSidebar = document.getElementById("cart-sidebar");

const closeCart = document.getElementById("close-cart");

if(cartIcon){

    cartIcon.onclick = ()=>{

        cartSidebar.classList.add("active");

    }

}

if(closeCart){

    closeCart.onclick = ()=>{

        cartSidebar.classList.remove("active");

    }

}

/* ---------- Checkout ---------- */

const checkoutBtn = document.getElementById("checkout-btn");

const checkoutModal = document.getElementById("checkout-modal");

const closeCheckout = document.getElementById("close-checkout");

if(checkoutBtn){

    checkoutBtn.onclick = ()=>{

        if(cart.length===0){

            alert("Your cart is empty.");

            return;

        }

        checkoutModal.classList.add("active");

    }

}

if(closeCheckout){

    closeCheckout.onclick = ()=>{

        checkoutModal.classList.remove("active");

    }

}

/* ---------- Place Order ---------- */

const checkoutForm = document.getElementById("checkout-form");

const successPopup = document.getElementById("success-popup");

if(checkoutForm){

    checkoutForm.addEventListener("submit",(e)=>{

        e.preventDefault();

        checkoutModal.classList.remove("active");

        successPopup.classList.add("active");

        cart=[];

        saveCart();

        updateCartCount();

        renderCart();

        checkoutForm.reset();

        setTimeout(()=>{

            successPopup.classList.remove("active");

        },3000);

    });

}

/* ---------- Initial Load ---------- */

updateCartCount();

renderCart();