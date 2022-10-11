//* RÉCUPÉRATION DES DONNÉES DES DIFFÉRENTS CANAPÉS PRÉSENTS DANS L'API INDIQUÉ *//

fetch('http://localhost:3000/api/products')
  .then(function(reponse) {
    if (reponse.ok) {
      return reponse.json();
    }
  })
  .then(function(sofa) {


//* Boucle qui va récupérer l'intégralité des produits présents dans l'API *//    
    sofa.forEach(canap => {

//* MISE EN PLACE DE L'AFFICHAGE DES CANAPÉS SUR LA PAGE D'ACCUEIL GRÂCE AUX BALISES *//

    const items = document.getElementById("items");
      console.log(canap);
    const linkSofa = document.createElement("a");
    linkSofa.href ="./product.html?id="+canap._id;
    items.appendChild(linkSofa)

    const articleSofa = document.createElement("article");
    linkSofa.appendChild(articleSofa);

    const imageSofa = document.createElement("img");
    imageSofa.src = canap.imageUrl;
    imageSofa.alt = canap.imageAltTxt;
    articleSofa.appendChild(imageSofa);

    const h3Sofa = document.createElement("h3");
    h3Sofa.classList.add = "productName";
    h3Sofa.textContent = canap.name;
    articleSofa.appendChild(h3Sofa);

    const policySofa = document.createElement('p');
    policySofa.classList.add = 'productDescription'; 
    policySofa.textContent = canap.description;
    articleSofa.appendChild(policySofa);
    })
    })

console.log ("Les produits sont affichés !");