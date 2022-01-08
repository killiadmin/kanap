const queryString = window.location.search// Recherche précise après le "?", exe.href pour recherche URL complet
const urlParams = new URLSearchParams(queryString)
const productId = urlParams.get("id")
// console.log({ productId })

fetch(`http://localhost:3000/api/products/${productId}`) //Template Litteral
    .then((response) => response.json())
    .then((res) => { console.log(productId) //console l'Id concernée
        return searchData(res)
    })


// Creation article

function searchData(canap) {
    console.log({canap})// console article concernée
    const { altTxt, colors, description, imageUrl, name, price} = canap
    importImage(imageUrl, altTxt)
    importTitle(name)
    importPrice(price)
    importDescription(description) 
    importColors(colors)
}

function importImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    parent.appendChild(image)
}

function importTitle(name) {
    const nameTitle = document.querySelector("#title")
    nameTitle.textContent = name
}

function importPrice(price) {
    const spanPrice = document.querySelector("#price")
    spanPrice.textContent = price
}

function importDescription(description) {
    const Descript = document.querySelector("#description")
    Descript.textContent = description
}

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