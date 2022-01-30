// function chargement initiale
// function main() {
    //     // 1 - chargement des produits depuis API
    //     const productsAPI = fetchListProducts(); 
    //     // 2 - Chargement depuis local storage des produits du client
    //      const selectedProducts = fetchFromLocalStorage();
    //      // 3 - aggreation des données
    //      const products = mergeDataProducts(selectedProducts, productsAPI); // Fusionnerr les infos produits dans des objetcs uniques
    //      // 4 - Créer element visuels à partir du tableau des produits computed
    //      displayProductItem(products);
    //      // :)
    
    //     }


    // if (saveOrderKeyStorage === null) {
        //     const selector = document.querySelector("#cart__items")
        //     const alert = "Votre panier est vide !"
    //     selector.innerHTML = alert
        
    //     console.log("Le panier est vide !")
    // } else {
    // } ;


let idProductsForPOST = new Array();
console.log(idProductsForPOST)

let arrayAllDataProducts = new Array()
console.log(arrayAllDataProducts)

function main() {
    const productsAPI = fetchListProducts();
    productsAPI.then((productsAPI) => {
        const selectedProducts = fetchFromLocalStorage();
        const products = mergeDataProducts(selectedProducts, productsAPI);
        return products
    });
};  
    
main();

function fetchListProducts () {
    return fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then(products => {return (products)})
    .catch(err => {
        console.log(err)
    }); 
};

function fetchFromLocalStorage() {
    const valueLocalStorage = JSON.parse(localStorage.getItem("panier"));
    return valueLocalStorage
}

function mergeDataProducts(selectedProducts, productsAPI) {
    selectedProducts.forEach(element => {
        const arrayConcatSelectedAndAPI = productsAPI.concat(selectedProducts)        
        const product = arrayConcatSelectedAndAPI.find(prod => prod._id == element.id)
        
        const dataProduct = {...product, ...element}
        
        displayProductItem(dataProduct)
    });
}

//====================================================================================================================================


function displayProductItem(dataProduct) {
    const article = createBaliseArticle(dataProduct);
    const displayImage = screenImageProduct(dataProduct);
    const cartItemContent = containerItemContent(dataProduct)

    // checkTotalPrice();
    // checkTotalQuantity();

    article.appendChild(displayImage);
    article.appendChild(cartItemContent);

    console.log(dataProduct);
}

function createBaliseArticle(dataProduct) {
    const article = document.createElement("article");
    article.classList.add("cart__item");
    article.dataset.id = dataProduct.id;
    article.dataset.colors = dataProduct.colors;
    appendArticle(article);
    console.log(article)
    return article;
}

function appendArticle(article) {
    document.querySelector("#cart__items").appendChild(article);
}

function screenImageProduct(dataProduct) {
    const divImage = document.createElement("div");
    divImage.classList.add("cart__item__img");
    const image = document.createElement("img");
    image.src = dataProduct.imageUrl;
    image.alt = dataProduct.altTxt;
    divImage.appendChild(image);
    console.log(divImage)
    return divImage;
}

function containerItemContent(dataProduct) {
    const divCartContentMaster = document.createElement("div");
    divCartContentMaster.classList.add("cart__item__content");
    
    const contentDescription = itemContentDescription(dataProduct);
    const contentSettings = itemContentSettings(dataProduct);
    
    divCartContentMaster.appendChild(contentDescription);
    divCartContentMaster.appendChild(contentSettings);
    return divCartContentMaster;
}

function itemContentDescription(dataProduct) {
    const divCartContentDescription = document.createElement("div");
    divCartContentDescription.classList.add("cart__item__content__description");
    
    const titleh2 = document.createElement("h2");
    titleh2.textContent = dataProduct.name;
    const balisePcolors = document.createElement("p");
    balisePcolors.textContent = dataProduct.colors;
    const balisePPrice = document.createElement("p");
    balisePPrice.textContent = dataProduct.price + " " +"€";

    divCartContentDescription.appendChild(titleh2);
    divCartContentDescription.appendChild(balisePcolors);
    divCartContentDescription.appendChild(balisePPrice);

    return divCartContentDescription;
}

function itemContentSettings(dataProduct) {
    const divCartContentSettings = document.createElement("div");
    divCartContentSettings.classList.add("cart__item__content__settings");

    itemContentQuantity(divCartContentSettings, dataProduct);
    itemContentDelete(divCartContentSettings, dataProduct);
    return divCartContentSettings;    
}

function itemContentQuantity(divCartContentSettings, dataProduct) {
    const divQuantity = document.createElement("div");
    divQuantity.classList.add("cart__item__content__settings__quantity");
    
    const balisePQuantity = document.createElement("p");
    balisePQuantity.textContent = "Qté : ";

    const inputQuantity = document.createElement("input");
    inputQuantity.setAttribute("type", "number");
    inputQuantity.classList.add("itemQuantity");
    inputQuantity.name = "itemQuantity";
    inputQuantity.min = "1";
    inputQuantity.max = "100";
    inputQuantity.setAttribute("value", dataProduct.quantity);
    
    // inputQuantity.addEventListener("input", () => newQuantityAndPrice(item.id, inputQuantity.value, item));
    
    divQuantity.appendChild(balisePQuantity);
    divQuantity.appendChild(inputQuantity);
    divCartContentSettings.appendChild(divQuantity);
}

function itemContentDelete(divCartContentSettings, dataProduct) {
    const divDelete = document.createElement("div");
    divDelete.classList.add("cart__item__content__settings__delete");
    
    const balisePDelete = document.createElement("p");
    balisePDelete.classList.add("deleteItem");
    balisePDelete.textContent = ("Supprimer");
    
    // divDelete.addEventListener("click", () => divDeleteEvent(dataProduct));
    
    divDelete.appendChild(balisePDelete);
    divCartContentSettings.appendChild(divDelete);
} 

//EVENT LISTENER DELETE
function divDeleteEvent(dataProduct) {
    const itemDelete = saveOrderKeyStorage.filter(e => e.id !== dataProduct.id || e.colors !== dataProduct.colors);
    
    localStorage.setItem("panier", JSON.stringify(itemDelete));
    
    // checkTotalQuantity(item);
    // checkTotalPrice();
    removeItemFromPage(dataProduct);
}

function removeItemFromPage(dataProduct) {
    const itemDelete = document.querySelector(`article[data-id="${dataProduct.id}"][data-colors="${dataProduct.colors}"]`);
    itemDelete.remove();
}

// function checkTotalQuantity() {
//     let total = 0;
//     const totalQuantity = document.querySelector("#totalQuantity");
    
//     saveOrderKeyStorage.forEach((item) => {
//         total += item.quantity;
//         console.log(item)               
//     totalQuantity.textContent = total;
// })
// }
    
// function checkTotalPrice(products) {
//     let total = 0;
//     const totalPrice = document.querySelector("#totalPrice");

//     // saveOrderKeyStorage.forEach((item) => {
//     //         const allProducts = products.find(p => p._id == item.id);
//     //         const totalGlobalPrice = allProducts.price * item.quantity ;
//     //         total = total + totalGlobalPrice;
//     //         console.log(allProducts)
//     //     })
    
//         totalPrice.textContent = total;
//     }

// function newQuantityAndPrice(id, newValue, item) {
//     const newItemToBuy = saveOrderKeyStorage.find((item) => item.id === id);
        
//         newItemToBuy.quantity = Number(newValue);
//         item.quantity = newItemToBuy.quantity;

//         checkTotalPrice();
//         checkTotalQuantity(item);
//         // saveNewPriceAndQuantity(item);
// }

// function saveNewPriceAndQuantity(panier) {
//     localStorage.setItem("panier", JSON.stringify(panier));        
//         console.log(localStorage)
//     }

//==================================================================================================================================== 

/**
 * On selectionne l'id #order pour lui attribuer un évenement au click pour agir sur le formulaire 
 */

const buttonOrder = document.querySelector("#order");
buttonOrder.addEventListener("click", (e) => formRequestPost(e));

/**
 * Fonction qui envoie une requete POST avec Fetch à l'url de l'api, (alerte) si le tableau est de 0 produit, la requete ne s'effectue pas.   
 * @param {boolean} e Si le tableau est vide, le changement de page ne s'effectue pas
 */

function formRequestPost(e) {
        if (checkedFormInvalid()) return
        if (checkedMailValid()) return
        e.preventDefault();
//         if (saveOrderKeyStorage.length === 0) alert("Votre panier est vide !");

        const body = requestControllers();

        fetch("http://localhost:3000/api/products/order", {
            method : "POST",
            body : JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                // window.location = `../html/confirmation.html?id=${data.orderId}`;
                return console.log(data);
            }) 
            .catch((err) => console.log(err))
    }

// function selectIdFromRequestPost() {
//         dataProduct.forEach(element => {
//         const orderId = element._id
//         arrayAllProducts.push(orderId)
//     });
// }

// selectIdFromRequestPost()

function requestControllers() {
        const cartForm = document.querySelector(".cart__order__form");

        const firstName = cartForm.elements.firstName.value;
        const lastName = cartForm.elements.lastName.value;
        const address = cartForm.elements.address.value;
        const city = cartForm.elements.city.value;
        const email = cartForm.elements.email.value;
        const body = { 
        contact: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email 
        },
        products: idProductsForPOST   
         }
         console.log(body)
         return body;
    }        
    
function checkedMailValid() {
    const email = document.querySelector("#email").value
    const validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (validRegex.test(email) === false) {
        alert("Veuillez saisir un mail valide !")
        return true
    } else {
        return false
    }    
}
    
function checkedFormInvalid() {
    const form =  document.querySelector(".cart__order__form")
    const baliseInput = form.querySelectorAll("input")
    baliseInput.forEach((baliseInput) => {
        if (baliseInput.value === "") {
            alert("Veuillez saisir les champs manquant !")
            return true
        } else {
            return false
        }
    })
    }