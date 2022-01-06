// ===========TABLEAU=============

fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((categoryData) => {
        console.log(categoryData)
        return addProducts(categoryData)
    })

// ==========DONNEES===========

function addProducts(categoryData) {
    const _id = categoryData[0]._id  
    const imageUrl = categoryData[0].imageUrl
    const altTxt = categoryData[0].altTxt
    const name = categoryData[0].name
    const description = categoryData[0].description

    const couch = anchor(_id)

    const article = document.createElement("article")
    const image = buildImage(imageUrl, altTxt)
    const h3 = buildTitle(name)
    const p = buildPara(description)

// ============APPENDCHILD===============

    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
    appendArticle(couch, article)   
}

// ===========ELEMENT "A"============== 

function anchor(id) {
    const couch = document.createElement("a")
    couch.href = "./product.html?id=42" + id
    return couch
}

function appendArticle(couch, article) {
    
    const items = document.getElementById("items")
    items.appendChild(couch)
    couch.appendChild(article)
}

// =============IMAGE KANAP===============

function buildImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}

// ==============TITRE H3=================

function buildTitle(name) {
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")
    return h3
}

function buildPara(description) {
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
}