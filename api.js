var imgDiv = document.getElementById('container background-img')
var searchBtn = document.getElementById('searchBtn');
const apiKey = 'token=tGcyeSLgtYKukjgY8iqyFaUrpO9lWKqDxP9QtYcrfMc';
var plant;
  $("#searchBtn" ).click(function() {
    var searchTerm = $("#searchInput").val()
    getPlantInfo(searchTerm)
    $(".right-side").html('')
  }); 
function  getPlantInfo (searchTerm) {
    $.ajax({
      //  url: ' https://trefle.io/api/v1/species?token=tGcyeSLgtYKukjgY8iqyFaUrpO9lWKqDxP9QtYcrfMc&filter[common_name]=' + searchTerm,
       url: 'https://trefle.io/api/v1/plants/search?token=tGcyeSLgtYKukjgY8iqyFaUrpO9lWKqDxP9QtYcrfMc&q=' + searchTerm,
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*'
      } 
    }).then(function (responsePl) {
      console.log(responsePl.data)
      // console.log(responsePl.data[0].id)
      var plantId = document.createElement('p')
      var plantDiv = document.createElement("div")
      var plantH1 = document.createElement("h1")
      var plantP = document.createElement("p")
      //   var plantImg = document.createElement('img')
      var plantFam = document.createElement('p')
      var br = document.createElement('br')
      plant = responsePl
      // console.log(plant)
      // console.log(plant.links.self)
      plantId.textContent = responsePl.data[0].id
      plantH1.textContent = responsePl.data[0].common_name
      plantP.textContent = responsePl.data[0].scientific_name
      plantFam.textContent = responsePl.data[0].family
      var plantSn = (responsePl.data[0].scientific_name).split(" ")
      // console.log(plant.data.distribution.native)
      plantImg = responsePl.data[0].image_url
      // plant img
      $(".mainplantimg").attr("src", plantImg);
      plantDiv.append(plantH1)
      // scienctific name     
      $(".right-side").append(plantH1)
      $(".right-side").append("Scientific name: " +plantP.textContent + " ")
      // family 
      $(".right-side").append("family name: " +plantFam.textContent + " ")
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
      var nativeH1 = document.createElement('h1')
      nativeH1 = ("Native zones:              ")
       var native = responseSp.data.distribution.native
       var NativeTag = document.createElement("ol")  
        $(".right-side").append(nativeH1)
      //  var lovelyPlants = responseSp.data.distribution.native;
        for(var i = 0; i < native.length; i++ ){
          var plantNative = document.createElement("li")
          plantNative = responseSp.data.distribution.native[i]
          plantNative.replace("", " ")
          // native zones 
          $(".right-side").append(NativeTag)
          $(NativeTag).append(plantNative + ", ")
          // console.log(native)
        }
      })
      //Loop over the data to generate a table, each table row will have a link to the repo url
    })
}