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
    
let arrayAllDataProducts = new Array();
    console.log(arrayAllDataProducts)

let arrayLocalStorage = JSON.parse(localStorage.getItem("panier"));
    console.log(arrayLocalStorage)

/**
 * Fonction 'main' reçois les produits du localStorage et les produits de l'API afin de les réunir dans la fonction 'mergeDataProducts'.
 * @returns Retourne le tableau merge des produits.
 */
    
function main() {
    if (arrayLocalStorage.length === 0) {
        document.getElementById("totalQuantity").innerHTML = 0;
        document.getElementById("totalPrice").innerHTML = 0;
        document.getElementById(
            "cart__items"
            ).innerHTML = `<p style="text-align: center;">Votre panier est vide !</p>`;
    } else {
    const productsAPI = fetchListProducts();
    productsAPI.then((productsAPI) => {
        const selectedProducts = fetchFromLocalStorage();
        const products = mergeDataProducts(selectedProducts, productsAPI);
        return products
    });
};
};  
    
main();

/**
 * Fonction 'fetchListProducts' qui envoie une requete GET pour recevoir tout les produits de l'API.
 * @returns Retourne les produits (Les canapés).
 */
    
function fetchListProducts () {
    return fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then(products => {return (products)})
    .catch(err => {
        console.log(err)
    }); 
};

/**
 * Fonction 'fetchFromLocalStorage' qui va chercher les produits du clients qui a été envoyé dans le LocalStorage.
 * @returns Retourne le tableau du LocalStorage (id, couleur et quantité)
 */
    
function fetchFromLocalStorage() {
    const valueLocalStorage = JSON.parse(localStorage.getItem("panier"));
    return valueLocalStorage
}

/**
 * Fonction 'mergeDataProducts' qui recoit les deux tableaux afin de les merger, de les comparer et fournit toutes les informations necessaires.
 */
    
function mergeDataProducts(selectedProducts, productsAPI) {
    selectedProducts.forEach(element => {
        const arrayConcatSelectedAndAPI = productsAPI.concat(selectedProducts);
        const product = arrayConcatSelectedAndAPI.find(prod => prod._id == element.id);
        
        const dataProduct = {...product, ...element};
        arrayAllDataProducts.push(dataProduct);
        
        displayProductItem(dataProduct);
    });
};
    
//====================================================================================================================================
/**
 * Fonction 'displayProductItem' qui assure la structure d'une vignette d'un produit, creation de la balise, l'image, le container...
 * @param {object} dataProduct Retourne le produit concerné avec ses informations
 */
    
function displayProductItem(dataProduct) {
    const article = createBaliseArticle(dataProduct);
    const displayImage = screenImageProduct(dataProduct);
    const cartItemContent = containerItemContent(dataProduct)
    
    checkTotalPrice();
    checkTotalQuantity();
    
    article.appendChild(displayImage);
    article.appendChild(cartItemContent);
}

/**
 * Fonction 'createBaliseArticle' qui crée la balise article, l'id et la couleur du produit lui est attribué qui le retourne dans le display. 
 * @returns Retourne l'article
 */

function createBaliseArticle(dataProduct) {
    const article = document.createElement("article");
    article.classList.add("cart__item");
    article.dataset.id = dataProduct.id;
    article.dataset.colors = dataProduct.colors;
    appendArticle(article);
    return article;
}

/**
 * Fonction 'appendArticle' permet de rattacher la balise article à l'id cart__items en tant qu'enfant.
 */

function appendArticle(article) {
    document.querySelector("#cart__items").appendChild(article);
}

/**
 * Fonction 'screenImageProduct' crée la balise div qui va recevoir les informations de l'image et le texte alternatif fournit par le dataProduct
 * @returns La div Image complete
 */

function screenImageProduct(dataProduct) {
    const divImage = document.createElement("div");
    divImage.classList.add("cart__item__img");
    const image = document.createElement("img");
    image.src = dataProduct.imageUrl;
    image.alt = dataProduct.altTxt;
    divImage.appendChild(image);
    return divImage;
}

/**
 * Fonction 'containerItemContent' qui crée la balise div cart__item__content qui va revoir la fonction descriptione et settings
 * @returns Retourne le container complet
 */

function containerItemContent(dataProduct) {
    const divCartContentMaster = document.createElement("div");
    divCartContentMaster.classList.add("cart__item__content");
    
    const contentDescription = itemContentDescription(dataProduct);
    const contentSettings = itemContentSettings(dataProduct);
    
    divCartContentMaster.appendChild(contentDescription);
    divCartContentMaster.appendChild(contentSettings);
    return divCartContentMaster;
}

/**
 * Fonction 'itemContentDescription' crée la div cart__item__content__description et qui crée les balises du nom, la couleur et le prix, 
 * dataproduct lui fournit les informations pour alimenter leur contenu
 * @returns Retourne le container de la desccription complet
 */

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

/**
 * Fonction 'itemContentSettings' qui crée la div cart__item__content__settings pour recevoir la quantité et le boutotn de suppression.
 * @returns Retourne la balise Setting avec sa quantité et le boutton supprimer
 */

function itemContentSettings(dataProduct) {
    const divCartContentSettings = document.createElement("div");
    divCartContentSettings.classList.add("cart__item__content__settings");

    itemContentQuantity(divCartContentSettings, dataProduct);
    itemContentDelete(divCartContentSettings, dataProduct);
    return divCartContentSettings;    
}

/**
 * Fonction qui crée la div cart__item__content__settings__quantity et l'input itemQuantity pour recevoir la quantité désiré du produit, 
 * un EventListener lui est attribué pour modifié la quantité à partir de la page panier
 */

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
    
    inputQuantity.addEventListener("input", () => newQuantityAndPrice(dataProduct, inputQuantity.value));
    
    divQuantity.appendChild(balisePQuantity);
    divQuantity.appendChild(inputQuantity);
    divCartContentSettings.appendChild(divQuantity);
}

/**
 * Fonction 'itemContentDelete' qui crée la balise div cart__item__content__settings__delete et le boutton deleteItem,
 * un EventListener lui est attribué pour supprimer l'article du panier
 */

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

/**
 * Fonction 'removeItemFromPage' qui supprime la balise concerné du produit selectionner de la page panier
 */

function removeItemFromPage(dataProduct) {
    const itemDelete = document.querySelector(`article[data-id="${dataProduct.id}"][data-colors="${dataProduct.colors}"]`);
        itemDelete.remove();
        location.reload();     
}

/**
 * Fonction 'divDeleteEvent' qui supprime le produit concerné du localStorage, une confirmation supplémentaire est imposé à l'utilisateur
 */

function divDeleteEvent(dataProduct) {
    if (window.confirm(`Are you sure you want to remove this item from the cart ?`)) {
    const itemDelete = arrayLocalStorage.filter(e => e.id !== dataProduct.id || e.colors !== dataProduct.colors);
    
    localStorage.setItem("panier", JSON.stringify(itemDelete));
    
    checkTotalQuantity();
    checkTotalPrice();
    removeItemFromPage(dataProduct);
    }
}

/**
 * Fonction 'checkTotalQuantity' qui calcule la quantité total des produits dans le panier
 */

function checkTotalQuantity() {
    const totalQuantity = document.querySelector("#totalQuantity");
    const totalQ = arrayAllDataProducts.reduce((totalQ, dataProduct) => totalQ + dataProduct.quantity, 0);

    totalQuantity.textContent = totalQ;
}

/**
 * Fonction 'checkTotalPrice' qui calcule la prix total des produits dans le panier
 */
    
function checkTotalPrice() {
    const totalPrice = document.querySelector("#totalPrice");
    const totalP = arrayAllDataProducts.reduce((totalP, dataProduct) => totalP + dataProduct.price * dataProduct.quantity, 0);

    totalPrice.textContent = totalP;
}

/**
 * Fonction 'newQuantityAndPrice' qui selectionne le produit grâce à l'EventListener afin de lui attribuer sa nouvelle valeur,
 * sa nouvelle valeur lui est attribué sur la page panier et le localStorage
 */
    
function newQuantityAndPrice(dataProduct, newValue) {
    const productWantTochange = arrayAllDataProducts.find((product) => product.id === dataProduct.id && product.colors === dataProduct.colors);
    productWantTochange.quantity = Number(newValue)
    checkTotalQuantity();
    checkTotalPrice();

    localStorage.setItem("panier", JSON.stringify(arrayAllDataProducts));
}
//==================================================================================================================================== 

/**
 * On selectionne l'id #order pour lui attribuer un évenement au click pour agir sur le formulaire 
 */

const buttonOrder = document.querySelector("#order");
buttonOrder.addEventListener("click", (e) => formRequestPost(e));

/**
 * On réunit nos selecteurs dont on aura besoin
 */

const errorFirstName = document.querySelector("#firstNameErrorMsg")
const errorLastName = document.querySelector("#lastNameErrorMsg")
const errorAddress = document.querySelector("#addressErrorMsg")
const errorCity = document.querySelector("#cityErrorMsg")
const errorEmail = document.querySelector("#emailErrorMsg")

const form =  document.querySelector(".cart__order__form")
const baliseInput = form.querySelectorAll("input")

/**
 * On réunit nos regex pour filtrer les erreurs de formulaire et mauvaises syntaxes
 */

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
' * Fonction formRequestPost qui envoie une requete POST avec Fetch à l'url de l'api et execute le formulaire que la fonction requestControllers lui envoie.
 */

function formRequestPost(e) {
    e.preventDefault();
    
    if (checkedLastNameInvalid() && checkedFirstNameInvalid() && checkedAdressInvalid() && checkedCityInvalid() && checkedMailInvalid() && checkedQuantityLocalStorage()){  
    const body = requestControllers();
    return body;
    } else {
        alert("You form is incomplete !");
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
    .catch((err) => {
        console.log(err);
        alert("The request could not be completed, check if the local server is running !");
});
}

/**
 * Fonction 'selectIdFromRequestPost' qui push les ids des produits selectionner par l'utilisateur afin de l'envoyer à la requete POST
 */

function selectIdFromRequestPost() {
    if (arrayLocalStorage === null) {
        return false
    } else {
    arrayLocalStorage.forEach(element => {
        const orderId = element.id
        idProductsForPOST.push(orderId)
    });
}
}

selectIdFromRequestPost()

/**
 * Fonction 'requestControllers' selectionne la classe cart__order__form. Il récupère les informations du formulaire données par l'utilisateur 
 * @returns Retourne le body de la requete
 */

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

/**
 * Fonction 'checkedQuantityLocalStorage' check de la quantité si le formulaire peut-être envoyé, si le localStorage est à 0 articles, une alerte apparait
 * et l'envoie de la formulaire ne peut se faire 
 */

function checkedQuantityLocalStorage() {
    if (arrayLocalStorage.length === 0){
        alert("You have not article in the basket!");
        return false;
    } else {
        return true;
    };      
};

/**
 * Fonction 'checkedMailInvalid' check si le mail envoyé par l'utilisateur est valide et remplie les condition du regex
 */
    
function checkedMailInvalid() {
    const selectorIdEmail = document.querySelector("#email").value;

    if (regexEmail(selectorIdEmail)) {
        errorEmail.innerHTML = "";
        return true;
    } else {
        errorEmail.innerHTML = "Please enter a valid email !";
        return false;
    };    
};

/**
 * Fonction 'checkedFirstNameInvalid' check si le prénom envoyé par l'utilisateur est valide et remplie les condition du regex
 */

function checkedFirstNameInvalid() {
    const selectorIdFirstName = document.querySelector("#firstName").value;
    const selectorLength = selectorIdFirstName.length;

    if (selectorLength < 3 || selectorLength > 20) {
        errorFirstName.innerHTML = "Please write your first name between 3 and 20 characters !";
        return false;
    } else if (regexFirsLastName(selectorIdFirstName)) {
        errorFirstName.innerHTML = "";
        return true;
    } else {
        errorFirstName.innerHTML = "Please write your first name without special characters or numbers !";   
        return false;
    };
};

/**
 * Fonction 'checkedLastNameInvalid' check si le nom de famille envoyé par l'utilisateur est valide et remplie les condition du regex
 */

function checkedLastNameInvalid() {
    const selectorIdLastName = document.querySelector("#lastName").value;

    if (regexFirsLastName(selectorIdLastName)) {
        errorLastName.innerHTML = "";
        return true;
    } else {
        errorLastName.innerHTML = "Please write your name correctly !";

        return false;
    };
};

/**
 * Fonction 'checkedAdressInvalid' check si l'adresse postale envoyé par l'utilisateur est valide et remplie les condition du regex
 */

function checkedAdressInvalid() {
    const selectorIdAddress = document.querySelector("#address").value;

    if (regexAdress(selectorIdAddress)) {
        errorAddress.innerHTML = "";
        return true;
    } else {
        errorAddress.innerHTML = "Please enter a correct address !";
        return false;
    };
};

/**
 * Fonction 'checkedCityInvalid' check si la ville envoyé par l'utilisateur est valide et remplie les condition du regex
 */

function checkedCityInvalid() {
    const selectorIdCity = document.querySelector("#city").value;

    if (regexCity(selectorIdCity)) {
        errorCity.innerHTML = "";
        return true;
    } else {
        errorCity.innerHTML = "Please enter a valid city !";
        return false;
    };
};