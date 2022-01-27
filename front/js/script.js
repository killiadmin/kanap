/**
 * Fetch éxécute une requete GET et qui récupére le catalogue des canapés via l'url de l'API et retourne une erreur si le serveur local n'est pas en service,
 * qui retourne ensuite la fonction previewKanapArticle
 */

fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((products) => previewKanapArticle(products))

    .catch((error) => {
        let errorContainer = document.querySelector(".items");
        errorContainer.innerHTML = "Le serveur local (port : 3000) n'est pas en service";
    })

/**
 *Fonction qui retourne une vignette d'un canapé et qui crée les balises HTML necessaire pour son visuel(a, article, img, h3 et p)
 * @param {object} product Représente le visuel en frontend global de l'article
 */

function previewKanapArticle(product) {
    product.forEach((picture) => {
        const { _id, imageUrl, altTxt, name, description } = picture;
        const urlProducts = linkElement(_id);
        const article = document.createElement("article");
        const image = buildImage(imageUrl, altTxt);
        const h3 = buildTitle(name);
        const p = buildDescription(description);

        articleComponents(article, [image, h3, p]);
        itemsArticle(urlProducts, article);
    })
}
        
/**
 * Fonction qui affecte 3 enfants à article qui sont "image", "h3" et "p", une boucle forEach est utilisée pour éviter une répétition
 * @param {object} article Il est composer d'un tableau de 3 balises
 * @param {array} array Le tableau est composer de img, h3 et p
 */

function articleComponents(article, array) {
    array.forEach((item) => {
        article.appendChild(item);
    })  
}

/**
 *  Fonction qui crée l'élément "a" pour produire un lien href pour chaque canapé et son id
 * @param {object} _id Affecte l'id du canapé à l'url
 * @returns Retourne l'url de présentation du canapé concerné suivant l'id fournit 
 */ 

function linkElement(_id) {
    const kanapLinkElement = document.createElement("a");
    kanapLinkElement.href = "./product.html?id=" + _id;
    return kanapLinkElement;
}

/**
 * Fonction qui va rechercher l'id "#items" pour lui affecter un enfant qui est "urlProducts" pour à son tour lui affecter un enfant, "article"
 * @param {object} urlProducts Représente l'url d'un canapé
 * @param {object} article L'article est composer de img, h3 et p
 */

function itemsArticle(urlProducts, article) {
    
    const items = document.getElementById("items");
    items.appendChild(urlProducts);
    urlProducts.appendChild(article);
}

/**
 * Fonction qui crée l'élement "img" pour lui affecter la source et le texte alternatif
 * @param {object} imageUrl Il va récuperer l'url de l'image dans le tableau "categoryData"
 * @param {object} altTxt Il va récuperer le texte alternatif dans le tableau "categoryData"
 * @returns Retourne l'image 
 */

function buildImage(imageUrl, altTxt) {
    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = altTxt;
    return image;
}

/**
 * Fonction qui crée l'élement "h3" pour lui affecter le nom du canapé pour ensuite lui attribuer la classe de ".productName"
 * @param {object} name Il va récupérer le nom du canapé dans le tableau "categoryData"
 * @returns Le nom du canapé
 */

function buildTitle(name) {
    const h3 = document.createElement("h3");
    h3.textContent = name;
    h3.classList.add("productName");
    return h3;
}

/**
 * Fonction qui crée l'élement "p" pour lui affecter la description du canapé pour ensuite lui attribuer la classe de ".productDescription"
 * @param {object} description Il va récupérer la description du canapé dans le tableau "categoryData"
 * @returns La description du canapé
 */

function buildDescription(description) {
    const p = document.createElement("p");
    p.textContent = description;
    p.classList.add("productDescription");
    return p;
}