var str = (window.location.href);
console.log(str);
var url = new URL(str); 
var id = url.searchParams.get("id");
console.log(id); 

fetch("http://localhost:3000/api/products/" + id)
  .then(function(reponse) {
    if (reponse.ok) {
      return reponse.json();
    }
  })
  .then(function(sofa) {

  console.log(sofa);    

  // On récupère l'élément de l'image //
    const item__img = document.getElementsByClassName("item__img")[0];
    const imageSofa = document.createElement("img");
    imageSofa.src = sofa.imageUrl;
    imageSofa.alt = sofa.imageAltTxt;
    item__img.appendChild(imageSofa);

    let items = document.getElementById ("title");
    items.innerHTML = sofa.name;
    
    let priceSofa = document.getElementById ("price");
    priceSofa.innerHTML = sofa.price;
    
    for (let i=0; i < sofa.colors.length; i++) {
    let colorsSofa = document.getElementById("colors");
    let option = document.createElement("option");
    option.value = sofa.option;
    option.textContent = sofa.colors[i];
    colorsSofa.appendChild(option);
    
    let descriptionSofa = document.getElementById ("description");
    descriptionSofa.innerHTML = sofa.description;

    }})

console.log("Les caractéristiques des produits sont affichées !");   

    let colorChoices = document.querySelector ("#colors");
    let sofaQuantity = document.querySelector ("#quantity");
    let clickbutton = document.querySelector("#addToCart");

    clickbutton.addEventListener('click', function () {
    
      // Création de la liste des infos des produits à stocker dans le LocalStorage //
     let productOptions = {
     colors: colorChoices.value,
     quantity: sofaQuantity.value,
     id: id,
    };

      // Obligation de choisir une couleur et un nombre entre 1 et 100 //
    if (productOptions.colors === "") {
      alert ("Une couleur doit être sélectionnée !")
    } else if(productOptions.quantity > 100 || productOptions.quantity < 1){
      alert("1 produit minimum doit être sélectionné !");
    }
    
     // Récupérer l'intégralité des produits dans le LocalStorage //
     console.log (productOptions);
     localStorage.setItem ("id", productOptions.id);
     localStorage.setItem ("colors", productOptions.colors);
     localStorage.setItem ("quantity", productOptions.quantity);
     console.log (localStorage);
})


    
    