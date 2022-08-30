var url = "http://localhost:3000/api/products" + id;
var id = url.searchParam.get ("id");
console.log(id);

fetch('http://localhost:3000/api/products')
  .then(function(reponse) {
    if (reponse.ok) {
      return reponse.json();
    }
  })
