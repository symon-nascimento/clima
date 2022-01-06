async function getCity() {

    try {
        // Input responsável por receber a cidade. 
        const cityName = await document.querySelector('[cidade]').value

        return getInformationServer(cityName)

    } catch (error) {
        console.log(error)
    }
}


const getInformationServer = async cityName => {

    try {

        // Requisição passando a cidade na url 
        const climateJson = await fetch(`http://localhost:3000/${cityName}`)
        const climate = await climateJson.json()

        return showInFrontEnd(climate)

    } catch (error) {
        console.log(error)
    }
}


const showInFrontEnd = climate => {

    try {

        // Inputs que receberão as informações
        const date = document.querySelector('[date]').value
        const tempCurrent = document.querySelector('[tempCurrent]')
        const tempMax = document.querySelector('[tempMax]')
        const tempMin = document.querySelector('[tempMin]')
        const weatherConditions = document.querySelector('[weatherConditions]')
        const humidity = document.querySelector('[humidity]')
        const velWind = document.querySelector('[velWind]')


        // Atribuindo os valores recebidos do Backend. 
        /* date.value = */

        tempCurrent.value = `${climate.temp}ºC`
        tempMax.value = `${climate.forecast[0].max}ºC`
        tempMin.value = `${climate.forecast[0].min}ºC`
        weatherConditions.value = climate.forecast[0].description
        humidity.value = climate.humidity
        velWind.value = climate.wind_speedy

        console.log(date)

    } catch (error) {
        console.log(error)
    }
}