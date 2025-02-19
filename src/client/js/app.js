import { dateValidator } from './dateValidator';
import { storeTripInfo, getTripInfo, clearTripInfo } from './localStorage';

const serverURL = 'http://localhost:8000';

/**
 * @description Initialize stored trip data and sets up form submission handling after the DOM has fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
    const storedTrip = getTripInfo();
    if (storedTrip != null) {
        fillStoredTrip(storedTrip);
    }

    const form = document.getElementById('weatherForm');
    const deletButton = document.getElementById('deletButton');
    deletButton.addEventListener('click', clearTripInfo);
    form.addEventListener('submit', handleSubmit);
});

/**
 * @description Handles form submission by validating the travel date and initiating API calls.
 * @param {Event} event
 */
function handleSubmit(event) {
    event.preventDefault();

    const travelLocation = document.getElementById('travelLocation').value.trim();
    const travelDate = document.getElementById('travelDate').value;

    const isValidDate = dateValidator(travelDate);
    if (isValidDate) {
        callGeonamesAPI(travelLocation, travelDate);
    } else {
        alert("Invalid Travel Date");
    }
}

/**
 * @description Populate the UI with stored trip information.
 * @param {Object} storedTrip
 */
function fillStoredTrip(storedTrip) {
    const tripInfo = `City Name: ${storedTrip.cityName}
    Date: ${storedTrip.date}
    Min Temp: ${storedTrip.minTemp}c
    Max Temp: ${storedTrip.maxTemp}c
    Cloud Coverage: ${storedTrip.cloudCover}%
    Description: ${storedTrip.description}`;

    document.getElementById('cityImage').src = storedTrip.imageURL;
    document.getElementById('cityImage').style.display = 'block';
    document.getElementById('resultInfo').innerText = tripInfo;
}

/**
 * @description Call the Geonames API to retrieve longitude and latitude of the location.
 * @param {string} location
 * @param {string} date
 * @returns {Promise<void>}
 */
async function callGeonamesAPI(location, date) {
    fetch(`${serverURL}/call-geonames?location=${location}`)
        .then((response) => response.json())
        .then((result) => {
            if (result.error === 'no') {
                callWeatherbitAPI(result.longitude, result.latitude, date);
            } else {
                alert("Invalid destination city...");
            }
        })
        .catch((error) => {
            alert('Something went wrong, try again later...');
        });
}

/**
 * @description Calls the Weatherbit API to retrieve weather details for the given location and date.
 * @param {number} lng
 * @param {number} lat
 * @param {string} date
 */
function callWeatherbitAPI(lng, lat, date) {
    fetch(`${serverURL}/call-weatherbit?lng=${lng}&lat=${lat}&date=${date}`)
        .then((response) => response.json())
        .then((result) => {
            if (result.error === 'yes') {
                alert('Something went wrong, try again later...');
            } else {
                const tripInfo = `City Name: ${result.cityName}
                                       Date: ${result.date}
                                       Min Temp: ${result.minTemp}c
                                       Max Temp: ${result.maxTemp}c
                                       Cloud Coverage: ${result.cloudCover}%
                                       Description: ${result.description}`;

                callPixabayAPI(result.cityName)
                    .then((imageURL) => {
                        document.getElementById('cityImage').src = imageURL;
                        document.getElementById('cityImage').style.display = 'block';
                        document.getElementById('resultInfo').innerText = tripInfo;

                        const tripInfoToStore = {
                            cityName: result.cityName,
                            date: result.date,
                            minTemp: result.minTemp,
                            maxTemp: result.maxTemp,
                            cloudCover: result.cloudCover,
                            description: result.description,
                            imageURL: imageURL
                        };

                        storeTripInfo(tripInfoToStore);
                    })
                    .catch((error) => {
                        alert('Something went wrong with the image API, try again later...');
                    });
            }
        })
        .catch((error) => {
            alert('Something went wrong, try again later...');
        });
}

/**
 * @description Calls the Pixabay API to retrieve an image for the specified location.
 * @param {string} location
 * @returns {Promise<string>}
 */
function callPixabayAPI(location) {
    return fetch(`${serverURL}/call-pixabay?location=${location}`)
        .then((response) => response.json())
        .then((result) => {
            if (result.error === 'yes') {
                return '';
            }
            return result.imageURL;
        })
        .catch((error) => {
            alert('Something went wrong, try again later...');
        });
}

export { handleSubmit };
