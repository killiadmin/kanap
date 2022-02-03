/**
 * @constant urlParams récupérer l'id du canapé grâce à "URLSearchParams", .search est utilisé pour faire une recherche précise
 * après le "?" de l'url
 * @type {object}
 * @default URLSearchParams
 */

const urlParams = new URLSearchParams(window.location.search);

/**
 * @constant _id Retourne l'id du canapé grâce a la constante urlParams
 * @type {object}
 * @default urlParams.get("id")
 */

const _id = urlParams.get("id");

/**
 * Fetch qui éxecute une requete GET avec comme paramètre "{_id}" qui est remplacé par l'id du canapé 
 * qui retourne ensuite la fonction "allDataFromProduct"
 * On récupère les erreurs avec catch pour indiquer à l'utilisateur que le serveur n'est pas en fonction
 */

fetch(`http://localhost:3000/api/products/${_id}`)
    .then((response) => response.json())
    .then((res) => allDataFromProduct(res))

    .catch((error) => {
        let errorContainer = document.querySelector(".item");
        errorContainer.innerHTML = "A problem has occured, the local server is no longer responding !";
        console.error("Le serveur local n'est pas en fonction !");
    });

/**
 * Fonction qui incrémente les données necessaire pour le localStorage qui sont "altTxt", "couleur", "description", "image", "nom" et "prix"
 * On selectionne ensuite le bouton du ajouter au panier et on lui attribue un eventListener
 * @param {object} product Retourne toutes les données du produit
 */

function allDataFromProduct(product) {
    const {altTxt, colors, description, imageUrl, name, price} = product;

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
 * Fonction qui selectionne l'id "#title" pour lui attribuer le "nom" du produit,
 * on selectionne également le title de la page pour lui attribuer le nom du produit
 * @param {object} name Le nom du produit
 */

function importTitle(name) {
    const nameTitle = document.querySelector("#title");
    nameTitle.textContent = name;
    document.title = name;
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
 * Si la clé existe "panier", "saveOrderKeyStorage" envoies les données dans le tableau,
 * si la clé n'existe pas "saveOrderKeyStorage" crée un tableau et incrémente les données 
 * @param {string} colors Représente la couleur du produit pour ne pas confondre deux produits ayant le même nom 
 * @param {number} quantity Représente la quantité de l'ordre envoyé par le client
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

/**
 * Fonction permet de mettre à jour le localStorage avec les nouvelles valeurs
 */

function saveOrderStorage(panier) {
    localStorage.setItem("panier", JSON.stringify(panier));
}

/**
 * Fonction qui push les valeurs du produit selectionner (id, couleur et quantité) dans le localStorage puis sauvegarder
 */

function pushOrderStorage(saveOrderKeyStorage, valueKeyStorageProduct) {
    saveOrderKeyStorage.push(valueKeyStorageProduct);
    localStorage.setItem("panier", JSON.stringify(saveOrderKeyStorage));
};

/**
 * Fonction qui permet d'éviter les doublons dans le tableau du localStorage. 
 * Si le produit selectionner à son id et sa couleur identique alors un nouveau product n'est pas crée mais ajouté à la quantité du produit existant.
 */

function addQuantityForSimilarProduct(valueKeyStorageProduct) {
    let panier = JSON.parse(localStorage.getItem("panier"));
    let addProduct = panier.find(p => p.id == valueKeyStorageProduct.id && p.colors == valueKeyStorageProduct.colors);

    if (addProduct != undefined) {
        addProduct.quantity += valueKeyStorageProduct.quantity;
    } else {
        panier.push(valueKeyStorageProduct);
    };
    saveOrderStorage(panier);
};

/**
 * Fonction qui s'effectue au click si aucune couleur ou quantité n'est selectionnée à l'achat + une alerte pour indiquer à l'utilisateur, 
 * Si la quantité est supérieur à 100, l'ajout au localStorage ne pourra se faire 
 * @returns Retourne "true" si les mauvaises conditions sont remplies
 */

function orderInvalid(colors, quantity) {
    if (colors == null || colors === '' || quantity == null || quantity == 0) {
        alert("Select your color and quantity");
        return true;
    } else if (quantity > 100) {
        alert("Select your quantity below 100");
        return true;
    };
};

/**
 * Fonction qui nous dirige vers la page du panier si l'ordre est effectuer avec succès 
 */

function addProductValid() {
    window.location.href = "cart.html";
};