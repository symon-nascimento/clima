const axios = require('axios').default
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))


app.all('/:city', async (req, resp) => {

    const cityName = req.params.city

    const { data } = await axios(`https://api.hgbrasil.com/weather?format=json&key=9cf64c5c&city_name=${cityName}`)

    // Desestruturando o objeto recebido e filtrando...
    const {temp, description, humidity, wind_speedy, forecast} = data.results
    
    // Construindo objeto a ser enviado para o front
    const  climateApiFront = {temp, description, humidity, wind_speedy, forecast}

    console.log(climateApiFront)

    return resp.send(climateApiFront)

})

app.listen(3000, () => console.log('server ok...'))