let productCart = JSON.parse (localStorage.getItem("addProduct"));
console.log(productCart);

for(let i = 0; i < productCart.length;i++){
  fetch(`http://localhost:3000/api/products/${productCart[i].id}`)
    .then(function(reponse) {
      if (reponse.ok) {
        return reponse.json();
      }
    })
    .then(function(sofa) {

      //* On récupère les éléments des produits commandés grâce aux balises *//

      const cart__items = document.getElementById("cart__items");

      let sofasArticles = document.createElement("articles");
      sofasArticles.className = 'cart__item';
      cart__items.appendChild(sofasArticles);
      
      let imgSofaDiv = document.createElement("div");
      imgSofaDiv.className = 'cart__item__img';
      sofasArticles.appendChild(imgSofaDiv);
      
      let finalPrice = 0;

      let sheetImg = document.createElement("img");
      sheetImg.src = sofa.imageUrl;
      sheetImg.alt = sofa.imageAltTxt;
      imgSofaDiv.appendChild(sheetImg);

      finalPrice += sofa.price;

      let cartContent = document.createElement("div");
      cartContent.className = 'cart__item__content';
      sofasArticles.appendChild(cartContent);

      let cartContentDescription = document.createElement("div");
      cartContentDescription.className = 'cart__item__description';
      cartContent.appendChild(cartContentDescription);

      let h2Sofa = document.createElement("h2");
      h2Sofa.textContent = sofa.name;
      cartContentDescription.appendChild(h2Sofa);

      let colorDetails = document.createElement ("p");

      colorDetails.innerHTML = productCart[i].colors;
      cartContentDescription.appendChild(colorDetails);

      let productPrice = document.createElement("p");
      productPrice.textContent = finalPrice + "€";
      cartContentDescription.appendChild(productPrice);

      let cartContentSettings = document.createElement("div");
      cartContentSettings.className = 'cart__item__content__settings';
      cartContent.appendChild(cartContentSettings);

      let setQuantity = document.createElement("div");
      setQuantity.className = 'cart__item__content__settings__quantity';
      cartContentSettings.appendChild(setQuantity);

      let chosenQuantity = document.createElement("p");
      chosenQuantity.innerText = "Qté :";
      cartContentSettings.appendChild(chosenQuantity);

      let inputProductQuantity = document.createElement("input");
      inputProductQuantity.type = 'number';
      inputProductQuantity.class = 'itemQuantity';
      inputProductQuantity.name = 'itemQuantity';
      inputProductQuantity.min = 1;
      inputProductQuantity.max = 100;
      inputProductQuantity.value = productCart[i].quantity;
      cartContentSettings.appendChild(inputProductQuantity);

      let deleteSetting = document.createElement("div");
      deleteSetting.className = 'cart__item__content__settings__delete';
      cartContentSettings.appendChild(deleteSetting);
      /* On affiche le bouton Supprimer*/
      let deleteText = document.createElement("p");
      deleteText.className = 'deleteItem';
      deleteText.innerText = 'Supprimer';
      deleteSetting.appendChild(deleteText);
      /* On active le bouton Supprimer */
      deleteText.addEventListener ("click", (e) => {
        e.preventDefault();
        let deleteId = productCart[i].id;
        let deleteColors = productCart[i].colors;
        deleteProduct = productCart.filter(elm => elm.id !== deleteId || elm.colors !== deleteColors);
        e.target.closest('.cart__item').remove();
        localStorage.setItem("addProduct", JSON.stringify(deleteProduct))
        alert ("Ce produit a bien été retiré du panier !");
        d.reload();
      }
      )
      
      function quantityUpdate(){
        let productUpdate = document.querySelectorAll("itemQuantity");
        for (let q = 0; q < productUpdate.length; q++) {
          productUpdate[q].addEventListener("modify", (e) => {
            e.preventDefault();
            let productQuantityModif = productCart[q].quantity;
            let confirmModif = productUpdate[q].valueAsNumber;
            let resultModif = productCart.find((el) => el.confirmModif !== productQuantityModif);
            resultModif.quantity = confirmModif;
            productCart[q].quantity = resultModif.quantity;
            localStorage.setItem("addProduct", JSON.stringify(productCart));
          })
        }
      }  
        quantityUpdate()

   //* On récupère la quantité totale et on calcule les prix *//
   function totalProducts(){
    if (productCart){
      let productQuantities = productCart;
      let productNumbers = document.querySelector("#totalQuantity");
      let totalItems = 0;
      for (let sofa of productQuantities){
        totalItems += Number (sofa.quantity);
      }
      productNumbers.textContent = totalItems
    }
    let commandPrice = document.querySelector("#totalPrice");
      priceAmount = productCart[i].quantity * finalPrice;
      commandPrice.innerText = priceAmount;
      console.log (priceAmount)
    }
  totalProducts()
}
)
                  //* Mise en place des formulaires de contact *//

//* Mise en place des expressions régulières *//
let regexMail = new RegExp("[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{10,25}$");
let regexNames = new RegExp ("[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{2,}$");
let regexCity = new RegExp ("[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{2,}$")
let regexAddress = new RegExp ("[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

//* Mise en place des inputs et de leurs messages d'erreurs *//

let formFN = document.getElementById("firstName");
let formFNError = document.getElementById("firstNameErrorMsg");

let formLN = document.getElementById("lastName");
let formLNError = document.getElementById("lastNameErrorMsg");

let formAddress = document.getElementById("address");
let formAddressError = document.getElementById("addressErrorMsg");

let formCity = document.getElementById("city");
let formCityError = document.getElementById("cityErrorMsg");

let formMail = document.getElementById("email");
let formMailError = document.getElementById("emailErrorMsg");

//* Modification des éléments du formulaire de contact *//

formFN.addEventListener("change", function(){
  validFirstName(this);
  });
formLN.addEventListener("change", function(){
  validLastName(this);
  });
formAddress.addEventListener("change", function(){
  validAddress(this);
  });
formCity.addEventListener("change", function(){
  validCity(this);
  });
formMail.addEventListener("change", function(){
  validEmail(this);
  });

//* Validation des champs demandés par le site*//

let validFirstName = function(inputFN){
  if(regexNames.test(inputFN.value)){
    formFNError.innerText = "Entrée acceptée !"
  }
  else{
    formFNError.innerText = "Veuillez entrer un autre prénom !"
  }
}

let validLastName = function(inputLN){
  if(regexNames.test(inputLN.value)){
    formLNError.innerText = "Entrée acceptée !"
  }
  else{
    formLNError.innerText = "Veuillez entrer un autre nom !"
  }
}

let validAddress = function(inputAddress){
  if(regexAddress.test(inputAddress.value)){
    formAddressError.innerText = "Entrée acceptée !"
  }
  else{
    formAddressError.innerText = "Veuillez entrer une autre adresse !"
  }
}

let validCity = function(inputCity){
  if(regexCity.test(inputCity.value)){
    formCityError.innerText = "Entrée acceptée !"
  }
  else{
    formCityError.innerText = "Veuillez entrer une autre ville !"
  }
}

let validEmail = function(inputMail){
  if (regexMail.test(inputMail.value)){
    formMailError.innerText = "Adresse mail valide !"
  }
  formMailError.innerText = "Veuillez entrer une adresse mail valide !"
}
}