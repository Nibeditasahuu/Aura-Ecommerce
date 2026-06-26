/* ==========================================
   APP.JS
========================================== */

/* ---------- Elements ---------- */

const productContainer = document.getElementById("product-list");

const searchInput = document.getElementById("search");

const categoryFilter = document.getElementById("category");

const productModal = document.getElementById("product-modal");

const productDetails = document.getElementById("product-details");

const closeModal = document.getElementById("close-modal");


/* ---------- Display Products ---------- */

function displayProducts(productArray){

    if(!productContainer) return;

    productContainer.innerHTML = "";

    if(productArray.length === 0){

        productContainer.innerHTML = `

            <h2 style="
                text-align:center;
                width:100%;
                color:#777;
            ">
                No Products Found
            </h2>

        `;

        return;

    }

    productArray.forEach(product=>{

        productContainer.innerHTML += `

        <div class="product-card">

            <div class="product-image">

                <img
                src="${product.image}"
                alt="${product.name}">

            </div>

            <div class="product-info">

                <p class="product-category">

                    ${product.category.toUpperCase()}

                </p>

                <h3 class="product-name">

                    ${product.name}

                </h3>

                <p class="product-price">

                    ₹${product.price.toLocaleString("en-IN")}

                </p>

                <button
                class="product-btn"
                onclick="viewProduct(${product.id})">

                    View Details

                </button>

            </div>

        </div>

        `;

    });

}


/* ---------- Product Details ---------- */

function viewProduct(id){

    const product = products.find(item=>item.id===id);

    if(!product) return;

    productDetails.innerHTML = `

        <div style="
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:40px;
            align-items:center;
        ">

            <img
            src="${product.image}"
            style="
                width:100%;
                max-height:400px;
                object-fit:contain;
            ">

            <div>

                <p style="
                    color:#6b7280;
                    margin-bottom:10px;
                ">
                    ${product.category.toUpperCase()}
                </p>

                <h2 style="
                    font-size:2rem;
                    margin-bottom:20px;
                ">
                    ${product.name}
                </h2>

                <h3 style="
                    color:#2563eb;
                    margin-bottom:20px;
                ">
                    ₹${product.price.toLocaleString("en-IN")}
                </h3>

                <p style="
                    color:#666;
                    line-height:1.7;
                    margin-bottom:30px;
                ">
                    ${product.description}
                </p>

                <button
                class="btn"
                onclick="addToCart(${product.id})">

                    Add To Cart

                </button>

            </div>

        </div>

    `;

    productModal.classList.add("active");

}


/* ---------- Close Modal ---------- */

if(closeModal){

    closeModal.onclick=()=>{

        productModal.classList.remove("active");

    }

}


/* ---------- Close on Background Click ---------- */

window.onclick=(e)=>{

    if(e.target===productModal){

        productModal.classList.remove("active");

    }

}


/* ---------- Search ---------- */

if(searchInput){

    searchInput.addEventListener("keyup",filterProducts);

}


/* ---------- Category ---------- */

if(categoryFilter){

    categoryFilter.addEventListener("change",filterProducts);

}


/* ---------- Filter ---------- */

function filterProducts(){

    const keyword = searchInput.value.toLowerCase();

    const category = categoryFilter.value;

    const filtered = products.filter(product=>{

        const matchName = product.name.toLowerCase().includes(keyword);

        const matchCategory =

            category==="all"

            ||

            product.category===category;

        return matchName && matchCategory;

    });

    displayProducts(filtered);

}


/* ---------- Shop Now Button ---------- */

const shopBtn=document.querySelector(".btn");

if(shopBtn){

    shopBtn.onclick=()=>{

        document.getElementById("products").scrollIntoView({

            behavior:"smooth"

        });

    }

}


/* ---------- Initial Load ---------- */

displayProducts(products);