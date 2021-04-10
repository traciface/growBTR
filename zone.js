let zipCodeTB = document.getElementById('zipCodeTB')
let submitZoneButton = document.getElementById('zipSearch')
let resultsZoneContainer = document.getElementById('resultsZoneContainer')

async function fetchZone(zip) {
    let response = await fetch(`https://phzmapi.org/${zip}.json`)
    let zoneResults = await response.json()
    return zoneResults
}

submitZoneButton.addEventListener('click', async () => {

    let zipCode = zipCodeTB.value

    const zipCodeRegex = /^\d{5}$/

    if (zipCodeRegex.test(zipCode)) {

        let result = await fetchZone(zipCode)

        var zipHeader = document.createElement("h4")
        var zipZone = document.createElement("p")
        var zipTemp = document.createElement("p")
        var zipLon= document.createElement("p")
        var zipLat = document.createElement("p")

        zipHeader.textContent = "Your Growing Zone"
        zipZone.textContent = result.zone
        zipTemp.textContent = result.temperature_range
        zipLon.textContent = result.coordinates.lon
        zipLat.textContent = result.coordinates.lat

        $(".container").append(zipHeader)
        $(".container").append(zipZone)
        $(".container").append(zipTemp)
        $(".container").append(zipLon)
        $(".container").append(zipLat)

        // let zone = `<div class="zoneDisplay">
        //     <h2> Your Growing Zone </h2>
        //     <span>Zone: ${result.zone}</span>
        //     <span>Temp Range: ${result.temperature_range}</span>
        //     <span>Lat: ${result.coordinates.lat}</span>
        //     <span>Lon: ${result.coordinates.lon}</span>
        //     </div>`

        // resultsZoneContainer.innerHTML = zone
        // zipCodeTB.value = ''

    } else {
        resultsZoneContainer.innerHTML = 'Please enter a valid zip code.'
        zipCodeTB.value = ''
    }
})

// let plantName = document.getElementById('plantName')
// let submitPlantButton = document.getElementById('submitPlantButton')
// let resultsPlantContainer = document.getElementById('resultsPlantContainer')

// async function fetchPlant(zip) {
//     let response = await fetch(`https://phzmapi.org/${zip}.json`)
//     let zoneResults = await response.json()
//     return zoneResults
// }

// submitZoneButton.addEventListener('click', async () => {

//     // let zipCode = zipCodeTB.value

//     // // const zipCodeRegex = /^\d{5}$/

//     // // if (zipCodeRegex.test(zipCode)) {

//     // //     let result = await fetchZone(zipCode)

//         let zone = `<div class="zoneDisplay">
//             <h2> Your Growing Zone </h2>
//             <span>Zone: ${result.zone}</span>
//             <span>Temp Range: ${result.temperature_range}</span>
//             <span>Lat: ${result.coordinates.lat}</span>
//             <span>Lon: ${result.coordinates.lon}</span>
//             </div>`

//         resultsPlantContainer.innerHTML = zone
//         zipCodeTB.value = ''

//     // } else {
//     //     resultsZoneContainer.innerHTML = 'Please enter a valid zip code.'
//     //     zipCodeTB.value = ''
//     // }
// })
