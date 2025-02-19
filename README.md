# FEND Capstone - Travel App

This project allows users to plan their travels by entering a city and trip date into a form. Upon form submission, the app validates the inputs and, if valid, fetches weather information and an image for the city. The data is then displayed to the user and stored in local storage for later access. The application is built using Webpack for both development and production environments and includes Jest for testing.

## Prerequisites
- Node.js v22.12.0

## Features
- A form with city text input and a trip date picker.
- Validates user input to ensure the city and date are correct.
- Fetches weather information for the city using an external API.
- Displays an image of the city.
- Stores the weather and city image in local storage.
- Service worker setup for offline functionality, enabling users to access the app even when offline.
- Jest tests for JavaScript files.

### Service Worker
The service worker is set up to cache the assets of the app and allow the app to function offline. It is registered when the app is loaded, and it caches the required files for offline use.

### Scripts:
- **npm start**: Starts the development server with Webpack, typically at `http://localhost:8000`.
- **npm run build-dev**: Bundles the application for development.
- **npm run build-prod**: Bundles the application for production, optimizing files for deployment.
- **npm run test**: Runs unit tests via Jest to verify the functionality of JavaScript files.

