import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

const URL_API = "http://api.openweathermap.org/data/2.5/forecast";
const appid = "76746092af0b2b46f566c4f727fcd40e";
let city = "London";

app.get("/", async (req, res) => {
    try {
        const result = await axios.get(`${URL_API}?q=${city}&appid=${appid}`);
        
        res.render("index", {
            weather: result.data,
        });
    } catch (error) {
        console.error(error);
        res.send("Error retrieving weather data");
    }
});

app.post("/weatherCity", async (req, res) => {
    const city = req.body.namecity;
    try {
        const result = await axios.get(`${URL_API}?q=${city}&appid=${appid}`);
        res.render("index", {
            weather: result.data,
        });
    } catch (error) {
        console.error(error);
        res.send("Error retrieving weather data");
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
