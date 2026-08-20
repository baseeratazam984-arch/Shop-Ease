let loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        let email = document.getElementById("loginEmail").value.trim();
        let password = document.getElementById("loginpassword").value;

        let savedEmail = localStorage.getItem("userEmail");
        let savedPassword = localStorage.getItem("userPassword");

        if (email === savedEmail && password === savedPassword) {

            localStorage.setItem("isLoggedIn", "true");

            window.location.href = "index.html";

        } else {

            console.log("Wrong email or password!");

        }

    });

}

let signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (e) {

        e.preventDefault();

        let name =
            document.getElementById("signupName").value.trim();

        let email =
            document.getElementById("signupEmail").value.trim();

        let password =
            document.getElementById("signupPassword").value;

        let confirmPassword =
            document.getElementById("confirmPassword").value;


        if (password !== confirmPassword) {

            console.log("Password do not match!");

            return;

        }


        localStorage.setItem("userName", name);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);
        localStorage.setItem("isLoggedIn", "true");


        window.location.href = "index.html";

    });

}

const loginLink =
    document.getElementById("loginLink");

if (loginLink) {

    if (localStorage.getItem("isLoggedIn") === "true") {

        loginLink.textContent = "Logout";

        loginLink.href = "#";

        loginLink.addEventListener("click", function (e) {

            e.preventDefault();

            localStorage.removeItem("isLoggedIn");

            window.location.reload();

        });

    } else {

        loginLink.textContent = "Login";

        loginLink.href = "login.html";

    }

}

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


const products = [

    {
        id: 1,
        name: "Classic Sneakers",
        price: 49.99,
        category: "Shoes",
        image: "./CLassic_sneaker_design.jpg"
    },

    {
        id: 2,
        name: "Smart Watch",
        price: 79.99,
        category: "Electronics",
        image: "./hk9-ultra-2-smartwatch-back.webp"
    },

    {
        id: 3,
        name: "Wire-less Headphone",
        price: 59.99,
        category: "Electronics",
        image: "./amaze-a650-strong-bass-wireless-headphone-with-24-hour-playt-509-2479551-311025125943121.webp"
    },

    {
        id: 4,
        name: "Leather Backpack",
        price: 64.99,
        category: "Accessories",
        image: "./O1CN01iDi5gM2Fz9tUM7Kpx__3486538950-0-cib.webp"
    }

];

function updateCartCount() {

    const cartCount =
        document.getElementById("cart-count");

    if (!cartCount) return;


    let totalItems = 0;


    cart.forEach(function (item) {

        totalItems += item.quantity;

    });


    cartCount.textContent = totalItems;

}

function addToCart(productId) {

    const product =
        products.find(function (item) {

            return item.id === productId;

        });


    if (!product) return;


    const existingProduct =
        cart.find(function (item) {

            return item.id === productId;

        });


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            image: product.image,
            quantity: 1

        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();

}

const addCart1 =
    document.getElementById("add-to-cart-1");

if (addCart1) {

    addCart1.addEventListener("click", function () {

        addToCart(1);

    });

}


const addCart2 =
    document.getElementById("add-to-cart-2");

if (addCart2) {

    addCart2.addEventListener("click", function () {

        addToCart(2);

    });

}


const addCart3 =
    document.getElementById("add-to-cart-3");

if (addCart3) {

    addCart3.addEventListener("click", function () {

        addToCart(3);

    });

}


const addCart4 =
    document.getElementById("add-to-cart-4");

if (addCart4) {

    addCart4.addEventListener("click", function () {

        addToCart(4);

    });

}

function showCategory(categoryName) {

    const categoryProducts =
        products.filter(function (product) {

            return product.category === categoryName;

        });


    const productsSection =
        document.getElementById("products");


    if (productsSection) {

        productsSection.scrollIntoView({
            behavior: "smooth"
        });

    }


    if (categoryProducts.length === 0) {

        console.log(
            "No products available in " +
            categoryName
        );

    } else {

        console.log(
            categoryProducts.length +
            " product(s) available in " +
            categoryName
        );

    }

}


const fashionButton =
    document.getElementById("category-fashion-btn");

if (fashionButton) {

    fashionButton.addEventListener("click", function () {

        showCategory("Fashion");

    });

}


const electronicsButton =
    document.getElementById("category-electronics-btn");

if (electronicsButton) {

    electronicsButton.addEventListener("click", function () {

        showCategory("Electronics");

    });

}


const shoesButton =
    document.getElementById("category-shoes-btn");

if (shoesButton) {

    shoesButton.addEventListener("click", function () {

        showCategory("Shoes");

    });

}


const accessoriesButton =
    document.getElementById("category-accessories-btn");

if (accessoriesButton) {

    accessoriesButton.addEventListener("click", function () {

        showCategory("Accessories");

    });

}

const cartIcon =
    document.getElementById("cart-icon");

if (cartIcon) {

    cartIcon.addEventListener("click", function () {

        window.location.href = "cart.html";

    });

}

const cartItemsContainer =
    document.getElementById("cart-items");

const subtotalElement =
    document.getElementById("subtotal");

const shippingElement =
    document.getElementById("shipping");

const totalElement =
    document.getElementById("total");

const checkoutButton =
    document.getElementById("checkout-btn");

function displayCart() {

    if (!cartItemsContainer) return;


    cartItemsContainer.innerHTML = "";


    if (cart.length === 0) {

        cartItemsContainer.innerHTML = `
            <h2 id="empty-cart">
                Your Cart is Empty
            </h2>
        `;

        updateCartSummary();

        return;

    }


    cart.forEach(function (product) {

        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="cart-item-info">

                <h3>${product.name}</h3>

                <p>$${product.price.toFixed(2)}</p>

                <div class="quantity">

                    <button
                        class="minus-btn"
                        data-id="${product.id}">
                        -
                    </button>

                    <span>
                        ${product.quantity}
                    </span>

                    <button
                        class="plus-btn"
                        data-id="${product.id}">
                        +
                    </button>

                </div>

            </div>

            <button
                class="remove-btn"
                data-id="${product.id}">
                Remove
            </button>

        `;


        cartItemsContainer.appendChild(cartItem);

    });


    addCartButtonEvents();

    updateCartSummary();

}

function addCartButtonEvents() {

    const plusButtons =
        document.querySelectorAll(".plus-btn");

    const minusButtons =
        document.querySelectorAll(".minus-btn");

    const removeButtons =
        document.querySelectorAll(".remove-btn");


    plusButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const productId =
                Number(button.dataset.id);


            const product =
                cart.find(function (item) {

                    return item.id === productId;

                });


            if (product) {

                product.quantity++;

                saveCart();

            }

        });

    });


    minusButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const productId =
                Number(button.dataset.id);


            const product =
                cart.find(function (item) {

                    return item.id === productId;

                });


            if (product) {

                if (product.quantity > 1) {

                    product.quantity--;

                } else {

                    cart =
                        cart.filter(function (item) {

                            return item.id !== productId;

                        });

                }


                saveCart();

            }

        });

    });


    removeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const productId =
                Number(button.dataset.id);


            cart =
                cart.filter(function (item) {

                    return item.id !== productId;

                });


            saveCart();

        });

    });

}

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();

    displayCart();

}

function updateCartSummary() {

    if (!subtotalElement) return;


    let subtotal = 0;


    cart.forEach(function (product) {

        subtotal +=
            product.price * product.quantity;

    });


    let shipping = 0;


    if (cart.length > 0) {

        shipping = 5;

    }


    let total =
        subtotal + shipping;


    subtotalElement.textContent =
        "$" + subtotal.toFixed(2);


    shippingElement.textContent =
        "$" + shipping.toFixed(2);


    totalElement.textContent =
        "$" + total.toFixed(2);

}

if (checkoutButton) {

    checkoutButton.addEventListener("click", function () {

        if (cart.length === 0) {

            return;

        }


        window.location.href =
            "checkout.html";

    });

}

const checkoutForm =
    document.getElementById("checkoutForm");

const checkoutItems =
    document.getElementById("checkout-items");

const checkoutSubtotal =
    document.getElementById("checkout-subtotal");

const checkoutShipping =
    document.getElementById("checkout-shipping");

const checkoutTotal =
    document.getElementById("checkout-total");

function displayCheckout() {

    if (!checkoutItems) return;


    checkoutItems.innerHTML = "";


    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <p>Your cart is empty.</p>
        `;


        checkoutSubtotal.textContent =
            "$0.00";

        checkoutShipping.textContent =
            "$0.00";

        checkoutTotal.textContent =
            "$0.00";


        return;

    }


    let subtotal = 0;


    cart.forEach(function (product) {

        const itemTotal =
            product.price * product.quantity;


        subtotal += itemTotal;


        const checkoutItem =
            document.createElement("div");


        checkoutItem.className =
            "checkout-item";


        checkoutItem.innerHTML = `

            <div class="checkout-product">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div>

                    <h3>${product.name}</h3>

                    <p>
                        Quantity: ${product.quantity}
                    </p>

                    <p>
                        Price:
                        $${product.price.toFixed(2)}
                    </p>

                </div>

            </div>

        `;


        checkoutItems.appendChild(checkoutItem);

    });


    let shipping = 5;

    let total =
        subtotal + shipping;


    checkoutSubtotal.textContent =
        "$" + subtotal.toFixed(2);


    checkoutShipping.textContent =
        "$" + shipping.toFixed(2);


    checkoutTotal.textContent =
        "$" + total.toFixed(2);

}

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function (e) {

        e.preventDefault();


        if (cart.length === 0) {

            return;

        }


        const name =
            document.getElementById("fullName").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const address =
            document.getElementById("address").value.trim();

        const city =
            document.getElementById("city").value.trim();


        if (
            name === "" ||
            phone === "" ||
            address === "" ||
            city === ""
        ) {

            return;

        }

        localStorage.setItem(
            "orderName",
            name
        );

        localStorage.setItem(
            "orderPhone",
            phone
        );

        localStorage.setItem(
            "orderAddress",
            address
        );

        localStorage.setItem(
            "orderCity",
            city
        );

        cart = [];

        localStorage.removeItem("cart");


        updateCartCount();


        // Go to separate success page

        window.location.href =
            "ordersuccess.html";

    });

}

updateCartCount();

displayCart();

displayCheckout();