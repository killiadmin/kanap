const orderId = resquestGetReceived()
displayProduct(orderId)
clearStorageAfterBuy()

/**
 *  On récupère l'id produits envoyé par la requete POST grâce à "URLSearchParams"
 */

function resquestGetReceived() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

/**
 * On affiche ensuite le numéro de la commande unique, qui confirme que la commande a bien été éxécuté
 */

function displayProduct(orderId) {
    const orderIdInConfirmation = document.getElementById("orderId")
    orderIdInConfirmation.textContent = orderId
}

/**
 * Une fois la commande éxécuté, le tableau localStorage est totalement effacé
 */

function clearStorageAfterBuy() {
    window.localStorage.clear()
}