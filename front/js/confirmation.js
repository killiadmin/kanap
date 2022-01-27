const orderId = resquestGetReceived()
displayProduct(orderId)
// clearStorageAfterBuy()

function resquestGetReceived() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

function displayProduct(orderId) {
    const orderIdInConfirmation = document.getElementById("orderId")
    orderIdInConfirmation.textContent = orderId
}

// function clearStorageAfterBuy() {
//     window.localStorage.clear()
// }