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

  // Récuperer l'élément de l'image
    const item__img = document.getElementsByClassName("item__img")[0];
    const imageSofa = document.createElement("img");
    imageSofa.src = sofa.imageUrl;
    imageSofa.alt = sofa.imageAltTxt;
    item__img.appendChild(imageSofa);

  
    //imageSofa[0].appendChild(imageSofa);

    let items = document.getElementById ("title");
    items.innerHTML = sofa.name;
    
    let priceSofa = document.getElementById ("price");
    priceSofa.innerHTML = sofa.price;
    
    for (let i=0; i < sofa.colors.length; i++) {
    let colorsSofa = document.getElementById ("colors");
    let option = document.createElement("option");
    option.value = sofa.option;
    option.textContent = sofa.colors[i];
    colorsSofa.appendChild(option);
    
    let descriptionSofa = document.getElementById ("description");
    descriptionSofa.innerHTML = sofa.description;

    }})