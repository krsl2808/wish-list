// ============================================
// ☁️ SUPABASE CONNECTION
// ============================================

const SUPABASE_URL = "https://kpuwvtsduoyyhhzhraer.supabase.co";

const SUPABASE_KEY = "sb_publishable_TVYOpjztPrJZDbpfymL34A_i5bR_cX4";


const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// Test connection

console.log("☁️ Supabase connected!");
// ============================================
// 🎀 BIRTHDAY WISHLIST
// ============================================


// ============================================
// DEMO PRODUCT
// ============================================

const products = [

    {
        name: "Test T-Shirt",
        brand: "Test Brand",
        category: "clothing",
        size: "M",
        color: "Black",
        image: "https://placehold.co/600x700",
        priority: "high",
        notes: "",

        stores: [

            {
                name: "Myntra",
                price: 999,
                link: "https://www.myntra.com/"
            },

            {
                name: "AJIO",
                price: 1099,
                link: "https://www.ajio.com/"
            }

        ]

    }

];


// ============================================
// LOAD PRODUCTS FROM SUPABASE
// ============================================

async function loadProductsFromSupabase() {

    const {
        data,
        error
    } 
    = await supabaseClient
        .from("wishlist_products")
        .select("*")
        .order("created_at", {
            ascending: true
        });


    // ----------------------------------------
    // ERROR
    // ----------------------------------------

    if (error) {

        console.error(
            "❌ Error loading wishlist:",
            error
        );

        return;

    }


    // ----------------------------------------
    // REPLACE PRODUCTS
    // ----------------------------------------

    products.length = 0;


    data.forEach(function(product) {

        products.push(product);

    });


    console.log("☁️ Products loaded from Supabase:",products);


    // ----------------------------------------
    // DISPLAY
    // ----------------------------------------

    applyFilters();

}


// ============================================
// GET HTML ELEMENTS
// ============================================

const searchInput =
    document.getElementById("search");


const productContainer =
    document.getElementById(
        "products-container"
    );


const productCount =
    document.getElementById(
        "product-count"
    );


const sortSelect =
    document.getElementById(
        "sort-select"
    );


const categoryButtons =
    document.querySelectorAll(
        ".category-btn"
    );


// ============================================
// CURRENT FILTERS
// ============================================

let currentCategory = "all";

let currentSearch = "";

let currentSort = "featured";


// ============================================
// DISPLAY PRODUCTS
// ============================================

function displayProducts(productList) {

    // Clear old cards

    productContainer.innerHTML = "";


    // Update product count

    productCount.textContent =
        productList.length + " items";


    // No products found

    if (productList.length === 0) {

        productContainer.innerHTML = `

            <div class="no-products">

                <h2>
                    😗 No products found
                </h2>

                <p>
                    Try another search or category.
                </p>

            </div>

        `;

        return;

    }


    // Create cards

    productList.forEach(
        function(product) {

            const card =
                createProductCard(product);


            productContainer.appendChild(
                card
            );

        }
    );

}


// ============================================
// CREATE PRODUCT CARD
// ============================================

function createProductCard(product) {

    const card =
        document.createElement("div");


    card.className =
        "product-card";


    // ========================================
    // LOWEST PRICE
    // ========================================

    let lowestPrice = null;


    if (
        product.stores &&
        product.stores.length > 0
    ) {

        lowestPrice =
            Math.min(
                ...product.stores.map(
                    function(store) {

                        return Number(
                            store.price
                        );

                    }
                )
            );

    }


    // ========================================
    // PRIORITY
    // ========================================

    let priorityText = "";

    let priorityClass = "";


    if (
        product.priority === "high"
    ) {

        priorityText =
            "⭐ High Priority";

        priorityClass =
            "priority-high";

    }

    else if (
        product.priority === "medium"
    ) {

        priorityText =
            "💗 Would Love";

        priorityClass =
            "priority-medium";

    }

    else if (
        product.priority === "low"
    ) {

        priorityText =
            "🌸 Nice to Have";

        priorityClass =
            "priority-low";

    }


    // ========================================
    // STORE LINKS
    // ========================================

    let storeLinks = "";


    if (
        product.stores &&
        product.stores.length > 0
    ) {

        // Find cheapest store

        const cheapestPrice =
            Math.min(
                ...product.stores.map(
                    function(store) {

                        return Number(
                            store.price
                        );

                    }
                )
            );


        product.stores.forEach(
            function(store) {

                const isBestPrice =
                    Number(store.price) ===
                    cheapestPrice;


                storeLinks += `

                    <a
                        href="${store.link}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="store-button
                        ${
                            isBestPrice
                            ? "best-price"
                            : ""
                        }"
                    >

                        <span
                            class="store-button-name"
                        >

                            🛍️
                            ${store.name}

                        </span>


                        <span
                            class="store-button-price"
                        >

                            ₹${Number(
                                store.price
                            ).toLocaleString(
                                "en-IN"
                            )}

                            →

                        </span>

                    </a>

                `;

            }
        );

    }


    // ========================================
    // PRODUCT IMAGE
    // ========================================

    const imageUrl =
        product.image &&
        product.image.trim() !== ""
            ? product.image
            : "https://placehold.co/600x700";


    // ========================================
    // PRODUCT CARD
    // ========================================

    card.innerHTML = `

        <!-- ================================ -->
        <!-- IMAGE -->
        <!-- ================================ -->

        <div class="product-image">

            <img
                src="${imageUrl}"
                alt="${product.name || "Wishlist item"}"
                onerror="
                    this.src='https://placehold.co/600x700';
                "
            >


            ${
                priorityText
                ? `
                    <span
                        class="
                            priority-badge
                            ${priorityClass}
                        "
                    >

                        ${priorityText}

                    </span>
                `
                : ""
            }

        </div>


        <!-- ================================ -->
        <!-- PRODUCT INFORMATION -->
        <!-- ================================ -->

        <div class="product-info">


            <!-- BRAND -->

            ${
                product.brand
                ? `
                    <p class="brand">
                        ${product.brand}
                    </p>
                `
                : ""
            }


            <!-- PRODUCT NAME -->

            <h2>
                ${product.name || ""}
            </h2>


            <!-- ============================ -->
            <!-- SIZE + COLOUR -->
            <!-- ============================ -->

            <div class="product-details">


                ${
                    product.size
                    ? `
                        <span class="detail-pill">

                            📏
                            ${product.size}

                        </span>
                    `
                    : ""
                }


                ${
                    product.color
                    ? `
                        <span class="detail-pill">

                            🎨
                            ${product.color}

                        </span>
                    `
                    : ""
                }


            </div>


            <!-- ============================ -->
            <!-- NOTES -->
            <!-- ============================ -->

            ${
                product.notes
                ? `
                    <div class="product-notes">

                        ♡
                        ${product.notes}

                    </div>
                `
                : ""
            }


            <!-- ============================ -->
            <!-- PRICE -->
            <!-- ============================ -->

            ${
                lowestPrice !== null
                ? `
                    <div class="starting-price">

                        <span>
                            From
                        </span>

                        <strong>
                            ₹${lowestPrice.toLocaleString(
                                "en-IN"
                            )}
                        </strong>

                    </div>
                `
                : ""
            }


            <!-- ============================ -->
            <!-- STORES -->
            <!-- ============================ -->

            ${
                product.stores &&
                product.stores.length > 0
                ? `
                    <p class="available-at">

                        Available at

                    </p>


                    <div class="store-links">

                        ${storeLinks}

                    </div>
                `
                : `
                    <p class="unavailable">

                        🌸 Currently unavailable

                    </p>
                `
            }


        </div>

    `;


    return card;

}


// ============================================
// GET LOWEST PRICE
// ============================================

function getLowestPrice(product) {

    if (
        !product.stores ||
        product.stores.length === 0
    ) {

        return Infinity;

    }


    return Math.min(
        ...product.stores.map(
            function(store) {

                return Number(
                    store.price
                );

            }
        )
    );

}


// ============================================
// FILTER PRODUCTS
// ============================================

function applyFilters() {

    let filteredProducts =
        products.filter(
            function(product) {

                // ----------------------------
                // CATEGORY
                // ----------------------------

                const matchesCategory =

                    currentCategory === "all" ||

                    product.category ===
                        currentCategory;


                // ----------------------------
                // SEARCH
                // ----------------------------

                const searchText =
                    currentSearch.toLowerCase();


                const searchableText = `

                    ${product.name || ""}

                    ${product.brand || ""}

                    ${product.category || ""}

                    ${product.color || ""}

                    ${product.size || ""}

                    ${product.notes || ""}

                `.toLowerCase();


                const matchesSearch =
                    searchableText.includes(
                        searchText
                    );


                return (
                    matchesCategory &&
                    matchesSearch
                );

            }
        );


    // ========================================
    // SORTING
    // ========================================

    // LOW → HIGH

    if (
        currentSort === "price-low"
    ) {

        filteredProducts.sort(
            function(a, b) {

                return (
                    getLowestPrice(a)
                    -
                    getLowestPrice(b)
                );

            }
        );

    }


    // HIGH → LOW

    else if (
        currentSort === "price-high"
    ) {

        filteredProducts.sort(
            function(a, b) {

                return (
                    getLowestPrice(b)
                    -
                    getLowestPrice(a)
                );

            }
        );

    }


    // PRIORITY

    else if (
        currentSort === "priority"
    ) {

        const priorityOrder = {

            high: 1,

            medium: 2,

            low: 3

        };


        filteredProducts.sort(
            function(a, b) {

                return (

                    (
                        priorityOrder[
                            a.priority
                        ] || 4
                    )

                    -

                    (
                        priorityOrder[
                            b.priority
                        ] || 4
                    )

                );

            }
        );

    }


    // ========================================
    // DISPLAY
    // ========================================

    displayProducts(
        filteredProducts
    );

}


// ============================================
// SEARCH
// ============================================

searchInput.addEventListener(
    "input",
    function(event) {

        currentSearch =
            event.target.value.trim();


        applyFilters();

    }
);


// ============================================
// CATEGORY BUTTONS
// ============================================

categoryButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                // Get category

                currentCategory =
                    button.dataset.category;


                // Remove active state

                categoryButtons.forEach(
                    function(btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                // Activate clicked category

                button.classList.add(
                    "active"
                );


                // Apply filter

                applyFilters();

            }
        );

    }
);


// ============================================
// SORT DROPDOWN
// ============================================

sortSelect.addEventListener(
    "change",
    function(event) {

        currentSort =
            event.target.value;


        applyFilters();

    }
);


// ============================================
// INITIAL DISPLAY
// ============================================

loadProductsFromSupabase();


// ============================================
// DEBUG
// ============================================

console.log(
    "🎀 Wishlist loaded successfully!"
);

