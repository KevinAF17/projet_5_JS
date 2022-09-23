const id = new URL (window.location.href).searchParams.get("id")
let orderId = document.getElementById("orderId");
orderId.innerHTML = id;

localStorage.clear()