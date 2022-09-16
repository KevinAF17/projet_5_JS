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
      sofasArticles.dataset.id = sofa.id;
      sofasArticles.dataset.colors = sofa.colors[i];
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
      colorDetails.innerHTML = sofa.colors[i];
      colorDetails.dataset.colors = sofa.colors[i];
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
      chosenQuantity.value = sofa.quantity;
      chosenQuantity.innerText = "Qté :";
      cartContentSettings.appendChild(chosenQuantity);

      let inputProductQuantity = document.createElement("input");
      inputProductQuantity.type = 'number';
      inputProductQuantity.class = 'itemQuantity';
      inputProductQuantity.name = 'itemQuantity';
      inputProductQuantity.min = 1;
      inputProductQuantity.max = 100;
      inputProductQuantity.value = sofa.quantity;
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
      deleteSetting.addEventListener ("click", (e) => {
        e.preventDefault;
        let deleteId = productCart.id;
        let deleteColors = productCart.colors;
        productCart = productCart.filter(elm => elm.id !== deleteId || elm.colors !== deleteColors);
        e.target.closest('.cart__item').remove();
        localStorage.removeItem("addProduct", JSON.stringify(productCart))
        alert ("Ce produit a bien été retiré du panier !");
      }
      
    )   
}
)
}        