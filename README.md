# Evaluate a News Article with Natural Language Processing

This project allows users to evaluate news articles or blog posts by providing a URL. Upon form submission, the application scrapes the content from the URL, extracts the first 200 characters from the first paragraph, and sends the text to the Udacity-hosted AWS NLP API for natural language processing (NLP) analysis. The application is built with Webpack for both development and production environments and includes Jest for testing.

## Features
- A single-field form that accepts a URL.
- Scrapes the content of the provided URL and extracts the first 200 characters from the first paragraph.
- Sends the extracted text to the NLP API for analysis.
- Displays the results from the NLP API response.
- Service worker setup for offline functionality.
- Validation of form input to ensure the URL is not blank.
- Jest tests for JavaScript files.

### Scripts:
- **npm start**: Starts the development server with Webpack, typically at `http://localhost:8000`.
- **npm run build-dev**: Bundles the application for development.
- **npm run build-prod**: Bundles the application for production, optimizing files for deployment.
- **npm run test**: Runs unit tests via Jest to verify the functionality of JavaScript files.