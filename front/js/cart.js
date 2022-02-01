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
    
    let idProductsForPOST = new Array();
    console.log(idProductsForPOST)
    
    let arrayAllDataProducts = new Array()
    console.log(arrayAllDataProducts)

    let arrayLocalStorage = JSON.parse(localStorage.getItem("panier"));
    console.log(arrayLocalStorage)
    
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
            arrayAllDataProducts.push(dataProduct)
            
            displayProductItem(dataProduct)
        });
    }
    
//====================================================================================================================================


function displayProductItem(dataProduct) {
    const article = createBaliseArticle(dataProduct);
    const displayImage = screenImageProduct(dataProduct);
    const cartItemContent = containerItemContent(dataProduct)

    checkTotalPrice();
    checkTotalQuantity();

    article.appendChild(displayImage);
    article.appendChild(cartItemContent);
}

function createBaliseArticle(dataProduct) {
    const article = document.createElement("article");
    article.classList.add("cart__item");
    article.dataset.id = dataProduct.id;
    article.dataset.colors = dataProduct.colors;
    appendArticle(article);
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
    
    divDelete.addEventListener("click", () => divDeleteEvent(dataProduct));
    
    divDelete.appendChild(balisePDelete);
    divCartContentSettings.appendChild(divDelete);
} 

function removeItemFromPage(dataProduct) {
    const itemDelete = document.querySelector(`article[data-id="${dataProduct.id}"][data-colors="${dataProduct.colors}"]`);
    itemDelete.remove();
}

function divDeleteEvent(dataProduct) {
    const itemDelete = arrayLocalStorage.filter(e => e.id !== dataProduct.id || e.colors !== dataProduct.colors);
    
    localStorage.setItem("panier", JSON.stringify(itemDelete));
    
    // checkTotalQuantity(dataProduct);
    // checkTotalPrice();
    removeItemFromPage(dataProduct);
}

function checkTotalQuantity() {
    const totalQuantity = document.querySelector("#totalQuantity");
    const totalQ = arrayAllDataProducts.reduce((totalQ, dataProduct) => totalQ + dataProduct.quantity, 0);
            
    totalQuantity.textContent = totalQ;
}
    
function checkTotalPrice() {
    const totalPrice = document.querySelector("#totalPrice");
    const totalP = arrayAllDataProducts.reduce((totalP, dataProduct) => totalP + dataProduct.price * dataProduct.quantity, 0);

    totalPrice.textContent = totalP;
}
    

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

const errorFirstName = document.querySelector("#firstNameErrorMsg")
const errorLastName = document.querySelector("#lastNameErrorMsg")
const errorAddress = document.querySelector("#addressErrorMsg")
const errorCity = document.querySelector("#cityErrorMsg")
const errorEmail = document.querySelector("#emailErrorMsg")

const form =  document.querySelector(".cart__order__form")
const baliseInput = form.querySelectorAll("input")

const regexFirsLastName = (value) => {
    return /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/.test(value);
}
const regexCity = (value) => {
    return /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(value);
}

const regexEmail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
}

const regexAdress = (value) => {
    return /^[0-9]{1,4}[ ,-][ A-Za-zÀ-ÿ0-9\-]+$/.test(value);
}


/**
 * Fonction qui envoie une requete POST avec Fetch à l'url de l'api, (alerte) si le tableau est de 0 produit, la requete ne s'effectue pas.   
 * @param {boolean} e Si le tableau est vide, le changement de page ne s'effectue pas
 */

function formRequestPost(e) {
    e.preventDefault();
    
    if (checkedLastNameInvalid() && checkedFirstNameInvalid() && checkedAdressInvalid() && checkedCityInvalid() && checkedMailInvalid() && checkedQuantityLocalStorage()){  
    const body = requestControllers();
    return body;
    } else {
        alert("Votre formulaire est incomplet !");
    };
    
    
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

function selectIdFromRequestPost() {
    arrayLocalStorage.forEach(element => {
        const orderId = element.id
        idProductsForPOST.push(orderId)
    });
}

selectIdFromRequestPost()

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

function checkedQuantityLocalStorage() {
    if (arrayLocalStorage.length === 0){
        alert("Votre panier est vide !");
        return false;
    } else {
        return true;
    };      
};
    
function checkedMailInvalid() {
    const selectorIdEmail = document.querySelector("#email").value;

    if (regexEmail(selectorIdEmail)) {
        errorEmail.innerHTML = "";
        return true;
    } else {
        errorEmail.innerHTML = "Veuillez saisir un mail valide !";
        return false;
    };    
};

function checkedFirstNameInvalid() {
    const selectorIdFirstName = document.querySelector("#firstName").value;
    const selectorLength = selectorIdFirstName.length;

    if (selectorLength < 3 || selectorLength > 20) {
        errorFirstName.innerHTML = "Veuillez écrire votre prénom entre 3 et 20 caractères!";
        return false;
    } else if (regexFirsLastName(selectorIdFirstName)) {
        errorFirstName.innerHTML = "";
        return true;
    } else {
        errorFirstName.innerHTML = "Veuillez écrire votre prénom sans caractère spéciaux, ni de chiffres !";   
        return false;
    };
};

function checkedLastNameInvalid() {
    const selectorIdLastName = document.querySelector("#lastName").value;

    if (regexFirsLastName(selectorIdLastName)) {
        errorLastName.innerHTML = "";
        return true;
    } else {
        errorLastName.innerHTML = "Veuillez écrire correctement votre nom !";

        return false;
    };
};

function checkedAdressInvalid() {
    const selectorIdAddress = document.querySelector("#address").value;

    if (regexAdress(selectorIdAddress)) {
        errorAddress.innerHTML = "";
        return true;
    } else {
        errorAddress.innerHTML = "Veuillez saisir une adresse postale valide !";
        return false;
    };
};

function checkedCityInvalid() {
    const selectorIdCity = document.querySelector("#city").value;

    if (regexCity(selectorIdCity)) {
        errorCity.innerHTML = "";
        return true;
    } else {
        errorCity.innerHTML = "Veuillez saisir une ville valide !";
        return false;
    };
};