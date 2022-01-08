const queryString = window.location.search// Recherche précise après le "?", exe.href pour recherche URL complet
const urlParams = new URLSearchParams(queryString)
const productId = urlParams.get("id")
// console.log({ productId })

fetch(`http://localhost:3000/api/products/${productId}`) //Template Litteral
    .then((response) => response.json())
    .then((res) => { console.log(productId) //console l'Id concernée
        return searchData(res)
    })
    //Recupération du prix pour le localStorage
    let storagePrice = 0 


// Creation article

function searchData(canap) {
    console.log({canap})// console article concernée
    const { altTxt, colors, description, imageUrl, name, price} = canap
    storagePrice = price
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

    // ADD TO CART

const button = document.querySelector("#addToCart")
button.addEventListener("click", (e) =>  {
    const colors = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
    if (colors == null || colors === '' || quantity == null || quantity == 0) {
        alert("Select your color and quantity")
    }

    // Add Local Storage 

    const buyCanap = {
        id : productId,
        colors: colors,
        quantity: Number(quantity),
        price: storagePrice
    }
    localStorage.setItem(productId, JSON.stringify(buyCanap))
    window.location.href = "cart.html"
})