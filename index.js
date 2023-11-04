import express from "express";
import hbs from "hbs";
import bodyParser from "body-parser";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import weatherData from "./utils/weather.js";
import { error } from "console";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDirPath = path.join(__dirname, "/public");
const app = express();
const port = process.env.PORT || 3000;
const viewPath = path.join(__dirname, "template/views");
const partialsPath = path.join(__dirname, "template/partials");

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render('index', {
    title: 'Weather App'
  })
});

app.get("/weather", (req, res) => {
  const address = req.query.address
  if (!address) {
    return res.send({
      error: "You must enter address in the search text box"
    })
  }

app.get("*", (req, res) => {
  res.render('404', {
    title: "Page not found"
  })
})

  weatherData(address, (error, { temperature, desc, cityName }) => {
    if (error) {
      return res.send({ error })
    }
    console.log(temperature, desc, cityName);
    res.send({
      temperature,
      desc,
      cityName
    })
  })
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});