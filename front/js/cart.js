let productCart = JSON.parse (localStorage.getItem("addProduct"));
console.log(productCart)

    fetch("http://localhost:3000/api/products/")
  .then(function(reponse) {
    if (reponse.ok) {
      return reponse.json();
    }
  })
  .then(function(addingProducts) {

    const cart__items = document.getElementById("cart__items");

    let sofasArticles = document.createElement("articles");
    sofasArticles.className = 'cart__item';
    cart__items.appendChild(sofasArticles);

    let imgSofaDiv = document.createElement("div");
    imgSofaDiv.className = 'cart__item__img';
    sofasArticles.appendChild(imgSofaDiv);

    let sheetImg = document.createElement("img");
    sheetImg.src = addingProducts.imageUrl;
    sheetImg.alt = addingProducts.imageAltTxt;
    imgSofaDiv.appendChild(sheetImg);

    let cartContent = document.createElement("div");
    cartContent.className = 'cart__item__content';
    sofasArticles.appendChild(cartContent);

    let cartContentDescription = document.createElement("div");
    cartContentDescription.className = 'cart__item__description';
    cartContent.appendChild(cartContentDescription);

    let h2Sofa = document.createElement("h2");
    h2Sofa.textContent = addingProducts.name;
    cartContentDescription.appendChild(h2Sofa);

    let colorDetails = document.createElement ("p");
    colorDetails.textContent = addingProducts.colors;
    cartContentDescription.appendChild(colorDetails);

    let productPrice = document.createElement("p");
    productPrice.textContent = addingProducts.price + "€";
    cartContentDescription.appendChild(p);
  })
