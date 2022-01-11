// Résultat globale du tableau = viewCart
const viewCart = []
positionCart()
viewCart.forEach((item) => (viewGlobalElement)(item))
console.log(viewCart)

//======LOOP POSITION CART========

function positionCart() {
    // Utiliser "length" pour représenter le nombre d'items stockés 
    const numberItems = localStorage.length
    console.log("Nombre de canapés ajoutés:", numberItems) 
    for (let i = 0; i < numberItems; i++) {
        const keyElement = localStorage.getItem(localStorage.key(i))
        // Utiliser "parse pour changer le JSON en objet"
        const itemElement = JSON.parse(keyElement)
        viewCart.push(itemElement)
        console.log ("Canapés à la position", i , "est", keyElement)   
    } 
}

// ==========VUE GLOBAL=============

function viewGlobalElement(item) {
    const article = baliseArticle(item)
    const divImage = screenImage(item)
    const cartContent = containerContent(item)

    article.appendChild(divImage)
    article.appendChild(cartContent)
    
    viewArticle(article)
    viewPrice(item)
    viewQuantity(item)
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
    // Utiliser change pour impacter le changement à la souris + clavier
    inputQuantity.addEventListener("change", () => changeQuantity(item.id, inputQuantity.value, item))


    divSettings.appendChild(divQuantity)
    divQuantity.appendChild(paraQuantity)
    divQuantity.appendChild(inputQuantity)
    divContent.appendChild(divSettings)

    // ======================DELETE=============================

    const divDelete = document.createElement("div")
    divDelete.classList.add("cart__item__content__settings__delete")
    divDelete.addEventListener("click", () => deleteItem(item))

    const paraDelete = document.createElement("p")
    paraDelete.classList.add("deleteItem")
    paraDelete.textContent = ("Supprimer")

    divSettings.appendChild(divDelete)
    divDelete.appendChild(paraDelete)

    return divContent    
}

    function deleteItem(item) {
        //Utiliser "findIndex" pour renvoyer le premier élement du tableau
        const itemDelete = viewCart.findIndex((product) => product.id === item.id && product.colors === item.colors)

        //Utiliser splice pour modifier le contenu du tableau "viewCart"
        viewCart.splice(itemDelete, 1)

        viewQuantity()
        viewPrice()
        deleteWholeItem(item)
        deleteVisualItem(item)
    }

    function deleteWholeItem(item) {
        const localStoragekey = `${item.id}:${item.colors}`
        // Utiliser "removeItem pour supprimer la clé en argument"
        localStorage.removeItem(localStoragekey)
    }

    function deleteVisualItem(item) {
        // ItemDelete va me chercher l'id et la couleur dans cart.html
        const itemDelete = document.querySelector(`article[data-id="${item.id}"][data-colors="${item.colors}"]`)
        // Utiliser "remove pour supprimer un element"
        itemDelete.remove()
    }

    // ========================QUANTITY TOTAL=================================

    function viewQuantity() {
        let total = 0
        const totalQuantity = document.querySelector("#totalQuantity")
        //Utiliser une loop direct pour executer la quantité total
        viewCart.forEach((item) => {
            const totalGlobalQuantity = item.quantity
            total = total + totalGlobalQuantity
        })
        totalQuantity.textContent = total
    }

    // ==========================PRICE TOTAL==============================

    function viewPrice() {
    let total = 0;
    const totalPrice = document.querySelector("#totalPrice")
    //Utiliser une loop direct pour executer le prix total
    viewCart.forEach((item) => {
        const totalGlobalPrice = item.price * item.quantity 
        total = total + totalGlobalPrice
    })
    totalPrice.textContent = total
    }

    //===========================UPDATE QUANTITY AND PRICE=================================

    function changeQuantity(id, newValue, item) {
        const changeItem = viewCart.find((item) => item.id === id)
        //Utiliser Find pour renvoyer la valeur du premier élement trouvé
        changeItem.quantity = Number(newValue)
        item.quantity = changeItem.quantity
        viewPrice()
        viewQuantity()
        newBasket(item)
    }

    // ============================NEW QUANTITY TO REFRESH PAGE===============================

    function newBasket(item) {
        const newData = JSON.stringify(item)
        const newKey = `${item.id}:${item.colors}`
        //Utiliser setItem pour Maj la clé
        localStorage.setItem(newKey, newData)
    }