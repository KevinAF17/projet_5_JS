var takeId = new URL(window.location.href).searchParams;
var id = takeId.get('orderId');
console.log(id); 

let commandNb = document.getElementById("orderId");
commandNb.innerText = id;
localStorage.clear();
