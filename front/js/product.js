const queryString = window.location.search// Recherche précise après le "?", exe.href pour recherche URL complet
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
    let imgCart, altxtCart


// Creation article

function searchData(canap) {
    console.log({canap})// console article concernée
    const { altTxt, colors, description, imageUrl, name, price} = canap
    storagePrice = price
    imgCart = imageUrl
    altxtCart = altTxt
    importImage(imageUrl, altTxt)
    importTitle(name)
    importPrice(price)
    importDescription(description) 
    importColors(colors)
}

// ====== function image=======

function importImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    parent.appendChild(image)
}

// =======Add function name======

function importTitle(name) {
    const nameTitle = document.querySelector("#title")
    nameTitle.textContent = name
}

// ======Add function price======

function importPrice(price) {
    const spanPrice = document.querySelector("#price")
    spanPrice.textContent = price
}

// ======Add function description==========

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

    // ========ADD TO CART========

const button = document.querySelector("#addToCart")
button.addEventListener("click", basketCLick)  

   //======Add Selector + value=======

function basketCLick() {
    const colors = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
    if (isOrderInvalid(colors, quantity)) return;
    orderStorage(colors, quantity)
    checkOutCart()
}

        //=======Add Local Storage========

function orderStorage() {
    const buyCanap = {
        id : productId,
        colors: colors,
        quantity: Number(quantity),
        price: storagePrice,
        imageUrl: imgCart,
        altTxt: altxtCart
    }
    localStorage.setItem(productId, JSON.stringify(buyCanap))
}

     // =====Fonction si la saisie des articles est null=======

function isOrderInvalid(colors, quantity) {
    if (colors == null || colors === '' || quantity == null || quantity == 0) {
        alert("Select your color and quantity")
        return true
    }
}
    //=======Check la page Cart au click du boutton======

function checkOutCart() {
    window.location.href = "cart.html" 
}
    