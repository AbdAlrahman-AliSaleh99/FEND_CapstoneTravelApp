import request from 'supertest';
import { app } from './server';

describe('Express API Endpoints', () => {
    beforeAll(() => {
        global.fetch = jest.fn();
    });

    describe('Geonames API', () => {
        it('should return latitude and longitude for a valid location', async () => {
            fetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValue({
                    geonames: [{ lat: 40.7128, lng: -74.0060 }]
                })
            });

            const response = await request(app).get('/call-geonames?location=Ramallah');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                error: "no",
                latitude: 40.7128,
                longitude: -74.0060
            });
        });
    });

    describe('Weatherbit API', () => {
        it('should return weather data for valid lat/lng and date', async () => {
            fetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValue({
                    data: [{
                        datetime: "2025-02-13",
                        min_temp: 10,
                        max_temp: 20,
                        clouds: 50,
                        weather: { description: "Partly Cloudy" }
                    }],
                    city_name: "Ramallah"
                }),
            });

            const response = await request(app).get('/call-weatherbit?lat=40.7128&lng=-74.0060&date=2025-02-13');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                date: "2025-02-13",
                minTemp: 10,
                maxTemp: 20,
                cloudCover: 50,
                description: "Partly Cloudy",
                cityName: "Ramallah"
            });
        });
    });

    describe('Pixabay API', () => {
        it('should return an image URL for a valid location', async () => {
            fetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValue({
                    hits: [{ largeImageURL: "https://example.com/image.jpg" }]
                }),
            });

            const response = await request(app).get('/call-pixabay?location=Ramallah');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                imageURL: "https://example.com/image.jpg"
            });
        });
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });
});
