import express from 'express';
import hbs from "hbs";
import { dirname } from 'path';
import { join } from "path";


const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
import weatherData from '../utils/weatherData.js';
import { fileURLToPath } from 'url';

const port = process.env.PORT || 3000

const publicStaticDirPath = join(__dirname, '../public')

const viewsPath = join(__dirname, '../templates/views');

const partialsPath = join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App'
    })
})

//localhost:3000/weather?address=lahore
app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
            error: "You must enter address in search text box"
        })
    }

    weatherData(address, (error, {temperature, description, cityName} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        console.log(temperature, description, cityName);
        res.send({
            temperature,
            description,
            cityName
        })
    })
});

app.get("*", (req, res) => {
    res.render('404', {
        title: "page not found"
    })
})


app.listen(port, () => {
    console.log("Server is up and running on port: ", port);
})