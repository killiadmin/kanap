// ===========TABLEAU=============

fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((categoryData) => addProducts(categoryData))

// ==========DONNEES===========

function addProducts(kanap) {
    //**LOOP EACH**
    kanap.forEach((chair) => {
        const { _id, imageUrl, altTxt, name, description } = chair
        const couch = linkElement(_id)
        const article = document.createElement("article")
        const image = buildImage(imageUrl, altTxt)
        const h3 = buildTitle(name)
        const p = buildPara(description)

        childsElements(article, [image, h3, p])//Array
        appendArticle(couch, article)
    })
}
        
// ============APPENDCHILD===============

function childsElements(article, array) {
    array.forEach((item) => {
        article.appendChild(item)
    })
    // article.appendChild(image)
    // article.appendChild(h3)
    // article.appendChild(p)     
}

// ===========ELEMENT "A"============== 

function linkElement(id) {
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
    // image.removeAttribute("title")
    // image.removeAttribute("style")
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