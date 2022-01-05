fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((categoryData) => addProducts(categoryData))

function addProducts(categoryData) {
    const imageUrl = categoryData[0].imageUrl
    
    const couch = document.createElement("a")
    couch.href = "http://localhost:3000/images/kanap01.jpeg"
    couch.text = "Un canapé bleu"
    const items = document.getElementById("items")
    
    items.appendChild(couch)
}