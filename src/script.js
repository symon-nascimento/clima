async function getCity() {

    try {
        // Input responsável por receber a cidade. 
        const cityNameInformed = await document.querySelector('[cidade]').value
        // Removendo acentuação e transformando as letras em minúsculas.
        const cityName = cityNameInformed.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()

        return getInformationServer(cityName)

    } catch (error) {
        alert('[Erro 001]: Falha ao se conectar com o servidor.')
    }
}


const getInformationServer = async (cityName) => {

    try {
        // Requisição passando a cidade na url 
        const climateJson = await fetch(`http://localhost:3000/${cityName}`)
        const climate = await climateJson.json()

        return showInFrontEnd(climate)

    } catch (error) {
        alert('[Erro 002]: Entre em contato: clima@clima.com.br.')
    }
}


const getDateFrontAndServer = () => {

    try {

        // Data do front (calendário - 2022-01-03)
        const dateCalendar = document.querySelector('[date]').value
        const dayDateCalendar = dateCalendar.slice(8)

            // Dia atual (sistema)
            const date = new Date()
            const day = String(date.getDate()).padStart(2, '0')
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const year = date.getFullYear()

            const dateCurrent = day + '/' + month + '/' + year

            // Trabalhando sobre o dia do mês (somando ao dia atual + 9 para limitar as pesquisas). 
            const dayLimit = parseInt(day) + 9
            const dateLimit = dayLimit + '/' + month + '/' + year

            // A diferenteça entre as datas será usada como índice para pesquisar no array forecast.
            const subtractingDates = dayDateCalendar - day
          
            // Tratando erros de datas.
            if (subtractingDates >= 10 || subtractingDates < 0) {
                alert(`[Erro 003]: As previsões estão disponíveis de ${dateCurrent} até ${dateLimit}. Informe uma data válida!`)
            }
        
        return subtractingDates

    } catch (error) {
        alert('[Erro 005]: Entre em contato: clima@clima.com.br.')
    }
}


const showInFrontEnd = climate => {

    try {
        // Recebe a subtração entre a data do calendário e a atual. Esse valor será usado para percorrer os indices.
        const indexBySubtractionDate = getDateFrontAndServer()

        // Inputs que receberão as informações
        const tempCurrent = document.querySelector('[tempCurrent]')
        const tempMax = document.querySelector('[tempMax]')
        const tempMin = document.querySelector('[tempMin]')
        const weatherConditions = document.querySelector('[weatherConditions]')
        const humidity = document.querySelector('[humidity]')
        const velWind = document.querySelector('[velWind]')

        if (indexBySubtractionDate === 0) {

            tempMax.value = `${climate.forecast[indexBySubtractionDate].max}ºC`
            tempMin.value = `${climate.forecast[indexBySubtractionDate].min}ºC`
            weatherConditions.value = climate.forecast[indexBySubtractionDate].description
            tempCurrent.value = `${climate.temp}ºC`
            humidity.value = `${climate.humidity}%`
            velWind.value = climate.wind_speedy
        }
        else {

            tempMax.value = `${climate.forecast[indexBySubtractionDate].max}ºC`
            tempMin.value = `${climate.forecast[indexBySubtractionDate].min}ºC`
            weatherConditions.value = climate.forecast[indexBySubtractionDate].description
            tempCurrent.value = `Indisponível`
            humidity.value = `Indisponível`
            velWind.value = `Indisponível`
        }
    } catch (error) {
        alert('[Erro 006]: Não foi posspivel exibir as informações.')
    }
}