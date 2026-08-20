// ============================================
// 🎀 WISHLIST ADMIN
// ============================================


// ============================================
// GET HTML ELEMENTS
// ============================================

const productForm =
    document.getElementById("product-form");


const storesContainer =
    document.getElementById("stores-container");


const addStoreButton =
    document.getElementById("add-store-button");


const adminProducts =
    document.getElementById("admin-products");


const imageInput =
    document.getElementById("product-image");


const imagePreview =
    document.getElementById("image-preview");


const imagePreviewContainer =
    document.getElementById(
        "image-preview-container"
    );


// ============================================
// STORE COUNTER
// ============================================

let storeCount = 1;


// ============================================
// EDITING STATE
// ============================================

let editingIndex = null;


// ============================================
// CURRENT IMAGE
// ============================================

let currentImage = "";


// ============================================
// GET PRODUCTS
// ============================================

function getProducts() {

    return JSON.parse(
        localStorage.getItem(
            "wishlistProducts"
        )
    ) || [];

}


// ============================================
// SAVE PRODUCTS
// ============================================

function saveProducts(products) {

    localStorage.setItem(
        "wishlistProducts",
        JSON.stringify(products)
    );

}


// ============================================
// IMAGE UPLOAD
// ============================================

imageInput.addEventListener(
    "change",
    function(event) {

        const file =
            event.target.files[0];


        if (!file) {

            return;

        }


        // ------------------------------------
        // CHECK FILE TYPE
        // ------------------------------------

        if (
            !file.type.startsWith("image/")
        ) {

            alert(
                "Please choose an image file."
            );

            imageInput.value = "";

            return;

        }


        // ------------------------------------
        // READ IMAGE
        // ------------------------------------

        const reader =
            new FileReader();


        reader.onload =
            function(e) {

                currentImage =
                    e.target.result;


                imagePreview.src =
                    currentImage;


                imagePreviewContainer.style.display =
                    "block";

            };


        reader.readAsDataURL(file);

    }
);


// ============================================
// CREATE STORE BOX
// ============================================

function createStoreEntry(
    number,
    store = {}
) {

    const storeEntry =
        document.createElement("div");


    storeEntry.className =
        "store-entry";


    storeEntry.innerHTML = `

        <h3>
            Store ${number}
        </h3>


        <label>
            Store name
        </label>

        <input
            type="text"
            class="store-name"
            placeholder="e.g. Myntra"
            value="${store.name || ""}"
            required
        >


        <label>
            Price
        </label>

        <input
            type="number"
            class="store-price"
            placeholder="e.g. 999"
            min="0"
            value="${store.price || ""}"
            required
        >


        <label>
            Product link
        </label>

        <input
            type="url"
            class="store-link"
            placeholder="Paste product link"
            value="${store.link || ""}"
            required
        >


        <button
            type="button"
            class="remove-store-button"
        >
            🗑️ Remove store
        </button>

    `;


    // ----------------------------------------
    // REMOVE STORE
    // ----------------------------------------

    const removeButton =
        storeEntry.querySelector(
            ".remove-store-button"
        );


    removeButton.addEventListener(
        "click",
        function() {

            storeEntry.remove();

            renumberStores();

        }
    );


    return storeEntry;

}


// ============================================
// RENUMBER STORES
// ============================================

function renumberStores() {

    const storeEntries =
        document.querySelectorAll(
            ".store-entry"
        );


    storeEntries.forEach(
        function(entry, index) {

            const heading =
                entry.querySelector("h3");


            heading.textContent =
                "Store " + (index + 1);

        }
    );


    storeCount =
        storeEntries.length;

}


// ============================================
// ADD ANOTHER STORE
// ============================================

addStoreButton.addEventListener(
    "click",
    function() {

        storeCount++;


        const storeEntry =
            createStoreEntry(
                storeCount
            );


        storesContainer.appendChild(
            storeEntry
        );

    }
);


// ============================================
// DISPLAY ADMIN PRODUCTS
// ============================================

function displayAdminProducts() {

    const products =
        getProducts();


    adminProducts.innerHTML = "";


    // ----------------------------------------
    // EMPTY WISHLIST
    // ----------------------------------------

    if (products.length === 0) {

        adminProducts.innerHTML = `

            <div class="empty-admin">

                <p>
                    🌸 Your wishlist is empty!
                </p>

                <p>
                    Add your first product above ♡
                </p>

            </div>

        `;

        return;

    }


    // ----------------------------------------
    // DISPLAY PRODUCTS
    // ----------------------------------------

    products.forEach(
        function(product, index) {

            const item =
                document.createElement("div");


            item.className =
                "admin-product";


            item.innerHTML = `

                <div class="admin-product-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        ${product.brand}
                    </p>

                    <p>
                        ${product.category}
                    </p>


                    ${
                        product.size
                        ? `
                            <p>
                                📏 ${product.size}
                            </p>
                        `
                        : ""
                    }


                    ${
                        product.color
                        ? `
                            <p>
                                🎨 ${product.color}
                            </p>
                        `
                        : ""
                    }


                    <p>
                        🛍️
                        ${
                            product.stores
                            ? product.stores.length
                            : 0
                        }
                        store(s)
                    </p>

                </div>


                <div class="admin-product-actions">

                    <button
                        type="button"
                        class="edit-button"
                        data-index="${index}"
                    >
                        ✏️ Edit
                    </button>


                    <button
                        type="button"
                        class="delete-button"
                        data-index="${index}"
                    >
                        🗑️ Delete
                    </button>

                </div>

            `;


            adminProducts.appendChild(
                item
            );

        }
    );


    // ========================================
    // EDIT BUTTONS
    // ========================================

    document
        .querySelectorAll(".edit-button")
        .forEach(
            function(button) {

                button.addEventListener(
                    "click",
                    function() {

                        const index =
                            Number(
                                button.dataset.index
                            );


                        editProduct(index);

                    }
                );

            }
        );


    // ========================================
    // DELETE BUTTONS
    // ========================================

    document
        .querySelectorAll(".delete-button")
        .forEach(
            function(button) {

                button.addEventListener(
                    "click",
                    function() {

                        const index =
                            Number(
                                button.dataset.index
                            );


                        deleteProduct(index);

                    }
                );

            }
        );

}


// ============================================
// DELETE PRODUCT
// ============================================

function deleteProduct(index) {

    const products =
        getProducts();


    const product =
        products[index];


    const confirmed =
        confirm(
            `Delete "${product.name}" from your wishlist?`
        );


    if (!confirmed) {

        return;

    }


    products.splice(
        index,
        1
    );


    saveProducts(products);


    displayAdminProducts();


    alert(
        "🗑️ Product removed from your wishlist!"
    );

}


// ============================================
// EDIT PRODUCT
// ============================================

function editProduct(index) {

    const products =
        getProducts();


    const product =
        products[index];


    editingIndex =
        index;


    // ----------------------------------------
    // FILL PRODUCT INFORMATION
    // ----------------------------------------

    document.getElementById(
        "product-name"
    ).value =
        product.name || "";


    document.getElementById(
        "product-brand"
    ).value =
        product.brand || "";


    document.getElementById(
        "product-category"
    ).value =
        product.category || "clothing";


    document.getElementById(
        "product-size"
    ).value =
        product.size || "";


    document.getElementById(
        "product-color"
    ).value =
        product.color || "";


    // ----------------------------------------
    // LOAD EXISTING IMAGE
    // ----------------------------------------

    currentImage =
        product.image || "";


    if (currentImage) {

        imagePreview.src =
            currentImage;


        imagePreviewContainer.style.display =
            "block";

    }

    else {

        imagePreview.src =
            "";


        imagePreviewContainer.style.display =
            "none";

    }


    // ----------------------------------------
    // PRIORITY
    // ----------------------------------------

    document.getElementById(
        "product-priority"
    ).value =
        product.priority || "medium";


    // ----------------------------------------
    // NOTES
    // ----------------------------------------

    document.getElementById(
        "product-notes"
    ).value =
        product.notes || "";


    // ----------------------------------------
    // LOAD STORES
    // ----------------------------------------

    storesContainer.innerHTML = "";


    storeCount = 0;


    if (
        product.stores &&
        product.stores.length > 0
    ) {

        product.stores.forEach(
            function(store) {

                storeCount++;


                const storeEntry =
                    createStoreEntry(
                        storeCount,
                        store
                    );


                storesContainer.appendChild(
                    storeEntry
                );

            }
        );

    }


    // ----------------------------------------
    // CHANGE SUBMIT BUTTON
    // ----------------------------------------

    const submitButton =
        productForm.querySelector(
            ".admin-add-button"
        );


    submitButton.textContent =
        "💾 Save Changes";


    // ----------------------------------------
    // SCROLL TO TOP
    // ----------------------------------------

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ============================================
// FORM SUBMISSION
// ============================================

productForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        // ------------------------------------
        // CHECK IMAGE
        // ------------------------------------

        if (!currentImage) {

            alert(
                "📸 Please choose a product image."
            );

            return;

        }


        // ------------------------------------
        // CREATE PRODUCT
        // ------------------------------------

        const product = {

            name:
                document.getElementById(
                    "product-name"
                ).value.trim(),


            brand:
                document.getElementById(
                    "product-brand"
                ).value.trim(),


            category:
                document.getElementById(
                    "product-category"
                ).value,


            size:
                document.getElementById(
                    "product-size"
                ).value.trim(),


            color:
                document.getElementById(
                    "product-color"
                ).value.trim(),


            image:
                currentImage,


            priority:
                document.getElementById(
                    "product-priority"
                ).value,


            notes:
                document.getElementById(
                    "product-notes"
                ).value.trim(),


            stores: []

        };


        // ------------------------------------
        // COLLECT STORES
        // ------------------------------------

        const storeEntries =
            document.querySelectorAll(
                ".store-entry"
            );


        storeEntries.forEach(
            function(entry) {

                const name =
                    entry.querySelector(
                        ".store-name"
                    ).value.trim();


                const price =
                    entry.querySelector(
                        ".store-price"
                    ).value;


                const link =
                    entry.querySelector(
                        ".store-link"
                    ).value.trim();


                if (
                    name &&
                    price &&
                    link
                ) {

                    product.stores.push({

                        name: name,

                        price: Number(price),

                        link: link

                    });

                }

            }
        );


        // ------------------------------------
        // GET PRODUCTS
        // ------------------------------------

        const products =
            getProducts();


        // ------------------------------------
        // UPDATE
        // ------------------------------------

        if (
            editingIndex !== null
        ) {

            products[editingIndex] =
                product;


            saveProducts(
                products
            );


            alert(
                "💾 Wishlist item updated!"
            );


            editingIndex = null;

        }


        // ------------------------------------
        // ADD NEW
        // ------------------------------------

        else {

            products.push(
                product
            );


            saveProducts(
                products
            );


            alert(
                "🎀 Product added to your wishlist!"
            );

        }


        // ------------------------------------
        // RESET FORM
        // ------------------------------------

        productForm.reset();


        // Reset image

        currentImage = "";


        imagePreview.src =
            "";


        imagePreviewContainer.style.display =
            "none";


        // ------------------------------------
        // RESET STORES
        // ------------------------------------

        storesContainer.innerHTML = "";


        storeCount = 1;


        const firstStore =
            createStoreEntry(1);


        storesContainer.appendChild(
            firstStore
        );


        // ------------------------------------
        // RESET BUTTON
        // ------------------------------------

        const submitButton =
            productForm.querySelector(
                ".admin-add-button"
            );


        submitButton.textContent =
            "🎀 Add to Wishlist";


        // ------------------------------------
        // REFRESH LIST
        // ------------------------------------

        displayAdminProducts();

    }
);


// ============================================
// INITIAL LOAD
// ============================================

displayAdminProducts();


console.log(
    "🎀 Wishlist Admin loaded successfully!"
);