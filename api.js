var tableBody = document.getElementById('');
var fetchButton = document.getElementById('fetch-button');
const apiKey = 'token=tGcyeSLgtYKukjgY8iqyFaUrpO9lWKqDxP9QtYcrfMc';
var plant;
​
​
​
//   // fetch request gets a list of all the repos for the node.js organization
//   var requestUrl = 'https://trefle.io/api/v1/plants?token=tGcyeSLgtYKukjgY8iqyFaUrpO9lWKqDxP9QtYcrfMc';
​
// https://trefle.io/api/v1/species/quercus-rotundifolia?token=tGcyeSLgtYKukjgY8iqyFaUrpO9lWKqDxP9QtYcrfMc
//     return response.json(); // parses JSON response into native JavaScript objects
//   }
// async function postData(url = requestUrl, data = {}) {
//   // Default options are marked with *
//   const response =fetch(url, {
//     method: 'GET', // *GET, POST, PUT, DELETE, etc.
//     mode: 'no-cors', // no-cors, *cors, same-origin
//     cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'include', // , *same-origin, omit
//     headers: {
//       'Content-Type': 'application/json'
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: 'follow', // manual, *follow, error
//     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(data) // body data type must match "Content-Type" header
//   });
​
// postData()
//   .then(data => {
//     console.log(data); // JSON data parsed by `data.json()` call
// //   });
// fetch('https://trefle.io/api/v1/plants?token=tGcyeSLgtYKukjgY8iqyFaUrpO9lWKqDxP9QtYcrfMc')
// .then(function (response) {
//   return response.json();
// }).then(function(data) {
//   console.log(data)
// https://trefle.io/api/v1/plants/search?token=tGcyeSLgtYKukjgY8iqyFaUrpO9lWKqDxP9QtYcrfMc&q=common_strawberry
// .catch(function (err) {
//   console.log(err)
// })
//+ plant.data[0].scientific_name
$(function () {
  // $.ajax({
  //   url: 'https://trefle.io/api/v1/species/quercus-rotundifolia?token=tGcyeSLgtYKukjgY8iqyFaUrpO9lWKqDxP9QtYcrfMc',
  //   method: 'GET',
  //   headers: {
  //     'Access-Control-Allow-Origin': '*'
  //   }
  // }).then(function (response) {
  //   species = response
  //   console.log(species.specifications)
  // })
​
  function getApi () {
    $.ajax({
      url: 'https://trefle.io/api/v1/plants/search?token=tGcyeSLgtYKukjgY8iqyFaUrpO9lWKqDxP9QtYcrfMc&q=okra',
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }).then(function (responsePl) {
      // console.log(responsePl.data[0].common_name)
      // console.log(responsePl.data[0].id)
      var plantId = document.createElement('p')
      var plantDiv = document.createElement("div")
      var plantH1 = document.createElement("h1")
      var plantP = document.createElement("p")
      var plantImg = document.createElement('img')
      var plantFam = document.createElement('p')
      
​
      plant = responsePl
      // console.log(plant)
      // console.log(plant.links.self)
​
      plantId.textContent = responsePl.data[0].id
      plantH1.textContent = responsePl.data[0].common_name
      plantP.textContent = responsePl.data[0].scientific_name
      plantFam.textContent = responsePl.data[0].family
      var plantSn = (responsePl.data[0].scientific_name).split(" ")
    
      // console.log(plantSn)
      plantImg.src = responsePl.data[0].image_url
      // var newUrl = 'https://trefle.io/api/v1/species/' + plantP.textContent + '?token=tGcyeSLgtYKukjgY8iqyFaUrpO9lWKqDxP9QtYcrfMc'
​
      // plantGrow.textContent = 'https://trefle.io/api/v1/species/' + plantSn.textContent + '?token=tGcyeSLgtYKukjgY8iqyFaUrpO9lWKqDxP9QtYcrfMc'
      // common name
      plantDiv.append(plantH1)
      // scienctific name
      plantDiv.append(plantP)
      // plant img
      plantDiv.append(plantImg)
      // family 
      plantDiv.append(plantFam)
      $("#repo-table").append(plantDiv)
      //console.log(plantSn)
      $.ajax({
        url: 'https://trefle.io/api/v1/species/' + plantSn[0] + "-" + plantSn[1] + '?token=tGcyeSLgtYKukjgY8iqyFaUrpO9lWKqDxP9QtYcrfMc',
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }).then(function (responseSp) {
      //  console.log(responseSp.data)
      //  console.log(responseSp.data.distribution)
       var native = responseSp.data.distribution.native
      //  var lovelyPlants = responseSp.data.distribution.native;
        for(var i = 0; i < native.length; i++ ){
          var plantNative = document.createElement('p')
          plantNative = responseSp.data.distribution.native[i]
          plantNative.replace("", " ")
          // native zones 
          plantDiv.append(plantNative + " ")
          // console.log(native)
        }
      })
      //Loop over the data to generate a table, each table row will have a link to the repo url
    })
  }
  fetchButton.addEventListener('click', getApi);
})