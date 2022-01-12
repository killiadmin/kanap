// Recherche précise après le "?", exe.href pour recherche URL complet
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const productId = urlParams.get("id")
// console.log({ productId })

fetch(`http://localhost:3000/api/products/${productId}`) //Template Litteral
    .then((response) => response.json())
    .then((res) => { console.log(productId) //console l'Id concernée
        return searchData(res)
    })
    //Recupération du prix et de l'image pour le localStorage
    let storagePrice = 0 
    let imgCart, altxtCart, productName


// ======================CREATION ARTICLE=================

function searchData(canap) {
    // console article concernée
    // console.log({canap})
    const { altTxt, colors, description, imageUrl, name, price} = canap
    storagePrice = price
    imgCart = imageUrl
    altxtCart = altTxt
    productName = name
    importImage(imageUrl, altTxt)
    importTitle(name)
    importPrice(price)
    importDescription(description) 
    importColors(colors)
}

// ================ FUNCTION IMAGE=====================

function importImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    parent.appendChild(image)
}

// ================ADD FUNCTION NAME==============

function importTitle(name) {
    const nameTitle = document.querySelector("#title")
    nameTitle.textContent = name
}

// =================ADD FUNCTION PRICE===============

function importPrice(price) {
    const spanPrice = document.querySelector("#price")
    spanPrice.textContent = price
}

// ===============ADD FUNCTION DESCRIPTION======================

function importDescription(description) {
    const Descript = document.querySelector("#description")
    Descript.textContent = description
}

//============== Add function Colors======== 

function importColors(colors) {
    const select = document.querySelector("#colors")
    colors.forEach(selectColors => {
        const option = document.createElement("option")
        option.value = selectColors
        option.textContent = selectColors
        select.appendChild(option)
        console.log(colors)
    });
}

    // =======================ADD TO CART=====================

const button = document.querySelector("#addToCart")
button.addEventListener("click", basketCLick)  

   //====================ADD SELECTOR + VALUE==================

function basketCLick() {
    const colors = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value

    if (isOrderInvalid(colors, quantity)) return
    orderStorage(colors, quantity)
    checkOutCart()
}

        //=====================ADD LOCAL STORAGE=======================

function orderStorage(colors, quantity) {
    // Utiliser des interpolations pour utiliser des expressions
    const newKey = `${productId}:${colors}`
    const buyCanap = {
        id : productId,
        name : productName,
        colors: colors,
        quantity: Number(quantity),
        price: storagePrice,
        imageUrl: imgCart,
        altTxt: altxtCart
    }
    //JSON = String
    localStorage.setItem(newKey, JSON.stringify(buyCanap)) 
}

     // =============FONCTION SI LA SAISIE DES ARTICLES EST NULL==============

function isOrderInvalid(colors, quantity) {
    if (colors == null || colors === '' || quantity == null || quantity == 0) {
        alert("Select your color and quantity")
        return true
    }
}
    //====================CHECK LA PAGE CART====================

function checkOutCart() {
    window.location.href = "cart.html" 
}
    