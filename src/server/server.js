import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();

const geonamesUserName = process.env.GEONAMES_USER_NAME;
const weatherbitApiKey = process.env.WEATHERBIT_API_KEY;
const pixabayApiKey = process.env.PIXABAY_API_KEY;

app.use(express.static('dist'))
app.use(cors());
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/call-geonames', (req, res) => {
    const { location } = req.query;
    fetch(`http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=${geonamesUserName}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.geonames && data.geonames.length > 0) {
                const { lat, lng } = data.geonames[0];
                res.json({ error: "no", latitude: lat, longitude: lng });
            } else {
                res.json({ error: "yes" });
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Failed to process request' });
        });
});

app.get('/call-weatherbit', (req, res) => {
    const { lng, lat, date } = req.query;

    fetch(`http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${weatherbitApiKey}`)
        .then((response) => response.json())
        .then((result) => {
            if (result.data && result.data.length > 0) {
                const weatherData = result.data.find(item => item.datetime === date);
                const minTemp = weatherData.min_temp;
                const maxTemp = weatherData.max_temp;
                const cloudCover = weatherData.clouds;
                const description = weatherData.weather.description;
                const cityName = result.city_name;

                res.json({
                    date,
                    minTemp,
                    maxTemp,
                    cloudCover,
                    description,
                    cityName
                });

            } else {
                res.json({ error: "yes" });
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Failed to process request' });
        });
});

app.get('/call-pixabay', (req, res) => {
    const { location } = req.query;

    fetch(`https://pixabay.com/api/?key=${pixabayApiKey}&q=${location}&image_type=photo`)
        .then((response) => response.json())
        .then((data) => {
            if (data.hits && data.hits.length > 0) {
                const pixabayData = data.hits[0];
                const imageURL = pixabayData.largeImageURL;
                res.json({ imageURL: imageURL });
            } else {
                res.json({ error: "yes" });
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Failed to process request' });
        });
});
app.listen(8000, function () {
    console.log('Server listening on port 8000!')
})

export { app };
