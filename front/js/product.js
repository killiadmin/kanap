/**
 * @constant urlParams récupérer l'id du canapé grâce à "URLSearchParams", .search est utilisé pour faire une recherche précise
 *  * après le "?" de l'url
 * @type {object}
 * @default URLSearchParams
 */

const urlParams = new URLSearchParams(window.location.search);

/**
 * @constant productId Retourne l'id du canapé grâce a la constante urlParams
 * @type {object}
 * @default urlParams.get("id")
 */

const _id = urlParams.get("id");

// let priceCart = 0;
// let imgCart, altxtCart, nameCart;

/**
 * Fetch qui éxecute une requete GET avec comme paramètre "{productId}" qui est remplacé par l'id du canapé 
 * qui retourne ensuite la fonction "searchData"
 * Deux variables sont ensuite déclarés pour récupérer le prix ensuite l'imagen, le texte alternatif et le nom dans le localStorage
 */

fetch(`http://localhost:3000/api/products/${_id}`)
    .then((response) => response.json())
    .then((res) => allDataFromProduct(res))

/**
 * Fonction qui incrémente les données necessaire pour le localStorage qui sont "altTxt", "couleur", "description", "image", "nom" et "prix"
 * @param {object} product Retourne toutes les données du produit
 */

function allDataFromProduct(product) {
    const {altTxt, colors, description, imageUrl, name, price} = product;
    console.log(product._id);
    // priceCart = price;
    // imgCart = imageUrl;
    // altxtCart = altTxt;
    // nameCart = name;
    importImage(imageUrl, altTxt);
    importTitle(name);
    importPrice(price);
    importDescription(description);
    importColors(colors);
    const button = document.querySelector("#addToCart");
    button.addEventListener("click", () => buyCLick(product));
}

/**
 * Fonction qui crée l'élement "img", lui attribue la classe ".item__img" pour ensuite lui affecter comme enfant image qui lui apport la source et le texte alternatif
 * @param {object} imageUrl Url de l'image
 * @param {object} altTxt Texte alternatif de l'image
 */

function importImage(imageUrl, altTxt) {
    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = altTxt;
    const parent = document.querySelector(".item__img");
    parent.appendChild(image);
}

/**
 * Fonction qui selectionne l'id "#title" pour lui attribuer le "nom" du produit 
 * @param {object} name Le nom du produit
 */

function importTitle(name) {
    const nameTitle = document.querySelector("#title");
    nameTitle.textContent = name;
}

/**
 * Fonction qui selectionne l'id "#price" pour lui attribuer le "prix" du produit 
 * @param {number} price Le prix du produit
 */

function importPrice(price) {
    const spanPrice = document.querySelector("#price");
    spanPrice.textContent = price;
}

/**
 * Fonction qui selectionne l'id "#description" pour lui attribuer la "description" du produit 
 * @param {object} description La description du produit
 */

function importDescription(description) {
    const Descript = document.querySelector("#description");
    Descript.textContent = description;
}

/**
 * Fonction qui selectionne l'id "#colors" pour lui attribuer la "couleur" du produit,
 * qui ensuite crée une boucle qui va crée un élement "option" qui représentera la valeur et le contenue de l'option pour chaque couleur disponible,
 * option sera ensuite attribuer comme enfant à l'id "#colors" 
 * @param {object} colors Représente la selection des couleurs du produit en question
 */

function importColors(colors) {
    const parentColors = document.querySelector("#colors");
    colors.forEach(selectColors => {
        const option = document.createElement("option");
        option.value = selectColors;
        option.textContent = selectColors;
        parentColors.appendChild(option);
    });
}

/**
 * Constante "button" qui représente le boutton "Ajouter au panier", l'id "#addToCart" lui est attribuer
 * ensuite un evenement au click sera affecter à cette constante 
 */


/**
 * Fonction qui s'effectue au click, il y est insérer deux constante qui selectionne les valeurs de l'id "#colors" et "#quantity"
 * Si les conditions sont rempli, les fonctions "orderStorage" et "addProductValid" sont éxécutés 
 * @returns La fonction "orderInvalid" est retouner si les conditions ne sont pas rempli
 */

function buyCLick(product) {
    const colors = document.querySelector("#colors").value;
    const quantity = document.querySelector("#quantity").value;

    if (orderInvalid(colors, quantity)) return;
    orderStorage(colors, quantity, product);
    addProductValid();
}

/**
 * Fonction qui ajoute une clé unique "panier" et sa valeur dans le localStorage. 
 * La constante "valueKeyStorageProduct" va récupérer les données du produit qui sont propre aux choix de l'utilisateur (id, couleur et quantité)
 * Si la clé existe "panier", "saveOrderKeyStorage" envoies les données dans le tableau si la clé n'existe pas "saveOrderKeyStorage" crée un tableau et incrémente les données 
 * @param {string} colors Représente la couleur du produit pour ne pas confondre deux produits ayant le même nom 
 * @param {number} quantity Représente la quantité de l'ordre
 */

function orderStorage(colors, quantity) {
    const valueKeyStorageProduct = {
        id : _id,
        colors: colors,
        quantity: Number(quantity)
    };

    let saveOrderKeyStorage = JSON.parse(localStorage.getItem("panier"))
    
    if (saveOrderKeyStorage) {
        addQuantityForSimilarProduct(valueKeyStorageProduct)   
    } else{
        saveOrderKeyStorage = [];
        pushOrderStorage(saveOrderKeyStorage, valueKeyStorageProduct)

    }
}

function testOrderStorage(panier) {
    localStorage.setItem("panier", JSON.stringify(panier))
}

function pushOrderStorage(saveOrderKeyStorage, valueKeyStorageProduct) {
    saveOrderKeyStorage.push(valueKeyStorageProduct);
    localStorage.setItem("panier", JSON.stringify(saveOrderKeyStorage));
}

function addQuantityForSimilarProduct(valueKeyStorageProduct) {
    let panier = JSON.parse(localStorage.getItem("panier"));
    let addProduct = panier.find(p => p.id == valueKeyStorageProduct.id && p.colors == valueKeyStorageProduct.colors);

    if (addProduct != undefined) {
        addProduct.quantity++;
    } else {
        valueKeyStorageProduct.quantity = 1;
        panier.push(valueKeyStorageProduct);
    }
    testOrderStorage(panier);
    console.log(panier)
    console.log(valueKeyStorageProduct.id)
    console.log(addProduct)
}

/**
 * Fonction qui s'effectue au click si aucune couleur ou quantité n'est selectionnée à l'achat + une alerte pour indiquer à l'utilisateur 
 * @param {string} colors Représente la couleur du produit
 * @param {number} quantity Représente la quantité de l'ordre
 * @returns Retourne "true" si les mauvaises conditions sont remplies
 */

function orderInvalid(colors, quantity) {
    if (colors == null || colors === '' || quantity == null || quantity == 0) {
        alert("Select your color and quantity");
        return true;
    }
}

/**
 * Fonction qui nous dirige vers la page du panier si l'ordre est effectuer avec succès 
 */

function addProductValid() {
    // window.location.href = "cart.html";
}