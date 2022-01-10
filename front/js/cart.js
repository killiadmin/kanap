const viewCart = []
positionCart()
viewCart.forEach((item) => (viewGlobalElement)(item))

//======LOOP POSITION CART========

function positionCart() {
    const numberItems = localStorage.length // Représente le nombre d'items stockés 
    console.log("Nombre de canapés ajoutés:", numberItems) 
    for (let i = 0; i < numberItems; i++) {
        const keyElement = localStorage.getItem(localStorage.key(i))
        const itemElement = JSON.parse(keyElement) //JSON = object
        viewCart.push(itemElement)
        console.log ("Canapés à la position", i , "est", keyElement)   
    }
    
    console.log(viewCart) // Resultat globale du panier    
}

// ==========VIEW GLOBAL=============

function viewGlobalElement(item) {
    const article = baliseArticle(item)
    const divImage = screenImage(item)
    const cartContent = containerContent(item)

    article.appendChild(divImage)
    article.appendChild(cartContent)
    
    viewArticle(article)
    viewQuantity(item)
    viewPrice(item)
    console.log(article)
}

// =======BALISE ARTICLE .CART ITEM============

function baliseArticle(item) {
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = item.id // Ajout attibut en html via "data"
    article.dataset.colors = item.colors
    return article
}
// ===============SECTION ARTICLE============

function viewArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}

// ===========IMAGE===============

function screenImage(item) {
    const divImage = document.createElement("div")
    divImage.classList.add("cart__item__img")
    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    divImage.appendChild(image)
    return divImage
}

// ============CONTAINER ITEM / DIV CART__ITEM__CONTENT=========

function containerContent(item) {
    const divContent = document.createElement("div")
    divContent.classList.add("cart__item__content")

    const divDescription = document.createElement("div") 
    divDescription.classList.add("cart__item__content__description")

    //NAME PRODUCT, COLOR, PRICE

    const titleh2 = document.createElement("h2")
    titleh2.textContent = item.name
    const paraColors = document.createElement("p")
    paraColors.textContent = item.colors
    const paraPrice = document.createElement("p")
    paraPrice.textContent = item.price + " €"

    divDescription.appendChild(titleh2)
    divDescription.appendChild(paraColors)
    divDescription.appendChild(paraPrice)
    divContent.appendChild(divDescription)

    // QUANTITY

    const divSettings = document.createElement("div")
    divSettings.classList.add("cart__item__content__settings")

    const divQuantity = document.createElement("div")
    divQuantity.classList.add("cart__item__content__settings__quantity")

    const paraQuantity = document.createElement("p")
    paraQuantity.textContent = "Qté : "
    const inputQuantity = document.createElement("input")
    inputQuantity.setAttribute("type", "number")
    inputQuantity.classList.add("itemQuantity")
    inputQuantity.name = "itemQuantity"
    inputQuantity.min = "1"
    inputQuantity.max = "100"
    inputQuantity.value = item.quantity

    divSettings.appendChild(divQuantity)
    divQuantity.appendChild(paraQuantity)
    divQuantity.appendChild(inputQuantity)
    divContent.appendChild(divSettings)

    // DELETE

    const divDelete = document.createElement("div")
    divDelete.classList.add("cart__item__content__settings__delete")

    const paraDelete = document.createElement("p")
    paraDelete.classList.add("deleteItem")
    paraDelete.textContent = ("Supprimer")

    divSettings.appendChild(divDelete)
    divDelete.appendChild(paraDelete)

    return divContent    
}

function viewQuantity(item) {
    const totalQuantity = document.querySelector("#totalQuantity")
    totalQuantity.textContent = item.quantity
}

function viewPrice(item) {
    const totalPrice = document.querySelector("#totalPrice")
    totalPrice.textContent = item.price
}
