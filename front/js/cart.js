/**
 * Vue globale sur le total des achats du tableau 
 */

const arrayGlobalFromProduct = [];
quantityArray();
arrayGlobalFromProduct.forEach((item) => masterGlobalProduct(item));

/**
 * Fonction qui représente le nombre d'items stockés dans le tableau,
 * une boucle est mise en place pour déterminer la position de l'article ajouter, premier, deuxième etc...  
 */

function quantityArray() {
    const numberItems = localStorage.length;
    for (let i = 0; i < numberItems; i++) {
        const keyElement = localStorage.getItem(localStorage.key(i));
        const itemElement = JSON.parse(keyElement);
        arrayGlobalFromProduct.push(itemElement);
}
}

/**
 * Fonction qui représente la vue globale du produit, qui est incrémenter d'autres fonctions qui vont lui apporter les données du produit,
 * qui sont la totalité de la balise "article" 
 * @param {object} item Représente un produit
 */

function masterGlobalProduct(item) {
    const article = createBaliseArticle(item);
    const divImage = screenImageProduct(item);
    const cartContent = containerItemContent(item);

    article.appendChild(divImage);
    article.appendChild(cartContent);
    
    appendArticle(article);
    checkTotalPrice();
    checkTotalQuantity();
}

/**
 * Fonction qui crée l'élement "article", la classe ".cart__item" lui est attribuer, on affecte l'id à la "data-id" que la couleur à la "data-color"
 * @param {object} item Représente un produit
 * @returns Retourne le contenu de l'article
 */

function createBaliseArticle(item) {
    const article = document.createElement("article");
    article.classList.add("cart__item");
    article.dataset.id = item.id;
    article.dataset.colors = item.colors;
    return article;
}
/**
 * Fonction qui selectionne l'id "#cart__items" pour lui attribuer comme enfant "article"
 * @param {object} article Représente l'article
 */

function appendArticle(article) {
    document.querySelector("#cart__items").appendChild(article);
}

/**
 * Fonction qui crée la "div" contenant l'image, on va lui attribuer la classe "cart__item__img",
 * crée l'élément img, lui affecter sa src et son alt pour ensuite donner à la "div" son enfant "img"
 * @param {object} item Représente le produit
 * @returns Retourne la "div" contenant l'image
 */

function screenImageProduct(item) {
    const divImage = document.createElement("div");
    divImage.classList.add("cart__item__img");
    const image = document.createElement("img");
    image.src = item.imageUrl;
    image.alt = item.altTxt;
    divImage.appendChild(image);
    return divImage;
}

/**
 * Fonction qui crée la "div, cart__item__content" qui va contenir la description, la quantité et l'option "supprimer"
 * @param {object} item Représente le produit
 * @returns Retourne la description et les settings(quantité + supprimer)
 */

function containerItemContent(item) {
    const divCartContentMaster = document.createElement("div");
    divCartContentMaster.classList.add("cart__item__content");

    const contentDescription = itemContentDescription(item);
    const contentSettings = itemContentSettings(item);

    divCartContentMaster.appendChild(contentDescription);
    divCartContentMaster.appendChild(contentSettings);
    return divCartContentMaster;
}

/**
 * Fonction qui crée la "div cart__item__content__description" qui va contenir le "h2" le "p" de quantité et le "p" du prix qui va contenir leur données respective
 * @param {object} item Représente le produit
 * @returns La description du produit (Nom, couleur et prix)
 */

function itemContentDescription(item) {
    const divCartContentDescription = document.createElement("div");
    divCartContentDescription.classList.add("cart__item__content__description");
    
    const titleh2 = document.createElement("h2");
    titleh2.textContent = item.name;
    const balisePcolors = document.createElement("p");
    balisePcolors.textContent = item.colors;
    const balisePPrice = document.createElement("p");
    balisePPrice.textContent = item.price + " €";
    
    divCartContentDescription.appendChild(titleh2);
    divCartContentDescription.appendChild(balisePcolors);
    divCartContentDescription.appendChild(balisePPrice);
    return divCartContentDescription;
}

/**
 * Fonction qui crée la "div cart__item__content__settings" qui a été incrémenter de deux fonctions (itemContentQuantity et itemContentDelete)
 * @param {*} item Représente le produit
 * @returns Retourne les fonctions pour qui contienne la quantité et l'option supprimer
 */

function itemContentSettings(item) {
    const divCartContentSettings = document.createElement("div");
    divCartContentSettings.classList.add("cart__item__content__settings");

    itemContentQuantity(divCartContentSettings, item);
    itemContentDelete(divCartContentSettings, item);
    return divCartContentSettings;    
}

/**
 * Fonction qui crée la "div, cart__item__content__settings__quantity", qui crée ensuite la balise "p" qui va contenir du texte "Qté :";
 * l'élément "input, itemQuantity" est crée pour que l'utilisateur puisse choisir la quantité qu'il souhaite ajouter sous certaines conditions
 * @param {object} divCartContentSettings Représente la quantité + l'option supprimer
 * @param {object} item Représente le produit
 */

function itemContentQuantity(divCartContentSettings,item) {
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
    inputQuantity.value = item.quantity;

    inputQuantity.addEventListener("change", () => newQuantityAndPrice(item.id, inputQuantity.value, item));
    
    divQuantity.appendChild(inputQuantity);
    divCartContentSettings.appendChild(divQuantity);
}

/**
 * Fonction qui crée la "div, cart__item__content__settings__delete", la balise "p, deleteItem" lui est incrémenter
 * Un évenement au click lui est attribuer à la "div" pour pouvoir supprimer le produit
 * @param {object} divCartContentSettings Représente la quantité + l'option supprimer
 * @param {object} item Représente le produit
 */

function itemContentDelete(divCartContentSettings,item) {
    const divDelete = document.createElement("div");
    divDelete.classList.add("cart__item__content__settings__delete");
    
    const balisePDelete = document.createElement("p");
    balisePDelete.classList.add("deleteItem");
    balisePDelete.textContent = ("Supprimer");

    divDelete.addEventListener("click", () => divDeleteEvent(item));

    divDelete.appendChild(balisePDelete);
    divCartContentSettings.appendChild(divDelete);
} 

/**
 * Fonction qui représente l'évenement au click de la suppression du produit, on utilise "findIndex" pour renvoyer le premier élement du tableau
 * On utilise ensuite "splice" pour modifier le contenu du tableau "arrayGlobalFromProduct"
 * On incrémente ensuite 4 fonctions pour le total(quantité + prix) et la suppression du produit dans le storage + sur la page  
 * @param {object} item Réprésente le produit
 */

function divDeleteEvent(item) {
    const itemDelete = arrayGlobalFromProduct.findIndex(
        (product) => product.id === item.id && product.colors === item.colors);
    arrayGlobalFromProduct.splice(itemDelete, 1);

    checkTotalQuantity();
    checkTotalPrice();
    removeItemFromStorage(item);
    removeItemFromPage(item);
}
    
/**
 * Fonction qui selectionne l'id et la couleur du produit. On utilise ensuite "removeItem" pour supprimer la clé en argument
 * @param {object} item Représente le produit
 */

function removeItemFromStorage(item) {
    const localStoragekey = `${item.id}:${item.colors}`;
    localStorage.removeItem(localStoragekey);
}

/**
 * Fonction qui va chercher les selecteurs "data-id + data-colors" dans le cart.html
 * On utilise ensuite "remove" pour supprimer l'élement
 * @param {object} item Représente le produit
 */

function removeItemFromPage(item) {
        const itemDelete = document.querySelector(`article[data-id="${item.id}"][data-colors="${item.colors}"]`);
        itemDelete.remove();
    }

/**
 * Fonction qui va chercher le selecteur "#totalQuantity", on utilise ensuite une loop direct. Cette boucle va additionner la quantité au total des produits
 * L'évenement au click sur l'option "supprimer" influencera le total de la quantité 
 */

function checkTotalQuantity() {
        let total = 0
        const totalQuantity = document.querySelector("#totalQuantity");

        arrayGlobalFromProduct.forEach((item) => {
            const totalGlobalQuantity = item.quantity;
            total = total + totalGlobalQuantity;
        })

        totalQuantity.textContent = total;
    }

/**
 * Fonction qui va chercher le selecteur "#totalPrice", on utilise ensuite une loop direct. Cette boucle va multiplié le prix suivant la quantité selectionner
 * L'évenement au click sur l'option "supprimer" influencera le total du prix
 */

function checkTotalPrice() {
    let total = 0;
    const totalPrice = document.querySelector("#totalPrice");

    arrayGlobalFromProduct.forEach((item) => {
        const totalGlobalPrice = item.price * item.quantity ;
        total = total + totalGlobalPrice;
    })

    totalPrice.textContent = total;
    }

/**
 * Fonction qui représente la nouvelle quantité et le nouveau prix. On utilise find pour renvoyer la valeur du premier élement trouvé
 * @param {object} id Représente l'id du produit
 * @param {number} newValue Représente le nouveau prix du produit acheté
 * @param {object} item Représente le produit
 */

function newQuantityAndPrice(id, newValue, item) {
        const newItemToBuy = arrayGlobalFromProduct.find((item) => item.id === id);

        newItemToBuy.quantity = Number(newValue);
        item.quantity = newItemToBuy.quantity;

        checkTotalPrice();
        checkTotalQuantity();
        saveNewPriceAndQuantity(item);
    }

/**
 * Fonction  qui va actualiser dans le local storage la clé qui a été ajouter auparavant avec la fonction "orderStorage" dans product.js 
 * sous la forme de "id (Nom du canapé) : colors (La couleur)"
 * @param {object} item Représente le produit
 */

function saveNewPriceAndQuantity(item) {
        const newSaveData = JSON.stringify(item);
        const newKey = `${item.id}:${item.colors}`;

        localStorage.setItem(newKey, newSaveData);
    }

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
        e.preventDefault();
        if (arrayGlobalFromProduct.length === 0) alert("Votre panier est vide !");

        const body = requestControllers();

        fetch("http://localhost:3000/api/products/order", {
            method : "POST",
            body : JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => console.log(data)) 
    }

/**
 * Fonction qui agit sur la class ".cart__order__form", on utilise HTMLFormElement pour retourner HTMLFormControlCollection
 * On récupère les valeurs du tableau avec "value", on ajoute l'objet contact et la fonction va nous récupérer l'id
 * @returns L'objet contact avec ses données le tableau products
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

        products: idOrders()      
         }
         return body;
    }        
    
/**
 * Fonction qui va récupérer le nombre d'item stockés dans le storageL
 * La boucle va récupérer la clé dans le storage, on utilise split pour selectionner uniquement la couleur dans l'id, on push pour finir dans le tableau "arrayProducts" 
 * @returns Le tableau avec son id
 */

function idOrders() {
    const numberProducts = localStorage.length;
    const arrayProducts = [];

    for (let i = 0; i < numberProducts; i++) {
        const products = localStorage.key(i);
        const id = products.split(":")[0];
        arrayProducts.push(id);
    }

    return arrayProducts;
}