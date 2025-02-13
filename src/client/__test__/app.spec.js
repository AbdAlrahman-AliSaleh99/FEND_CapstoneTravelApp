import { handleSubmit } from '../js/app';
import { dateValidator } from '../js/dateValidator';
import { getTripInfo } from '../js/localStorage';

jest.mock('../js/dateValidator');
jest.mock('../js/localStorage');

describe('App.js tests', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <form id="weatherForm">
                <input id="travelLocation" value="New York" />
                <input id="travelDate" value="2025-06-15" />
                <button type="submit">Submit</button>
                <button id="deletButton"></button>
            </form>
            <img id="cityImage" style="display: none;" />
            <div id="resultInfo"></div>
        `;

        global.fetch = jest.fn()
            .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ error: 'no', longitude: -74.006, latitude: 40.7128 }) })
            .mockResolvedValueOnce({
                json: jest.fn().mockResolvedValue({
                    error: 'no', cityName: 'Ramallah', date: '2025-06-15', minTemp: 15, maxTemp: 25, cloudCover: 50, description: 'cloudy'
                })
            })
            .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ imageURL: 'https://example.com/image.jpg' }) });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('handleSubmit does not call APIs when date is invalid', async () => {
        dateValidator.mockReturnValue(false);
        global.alert = jest.fn();
        const event = { preventDefault: jest.fn() };

        await handleSubmit(event);

        expect(fetch).not.toHaveBeenCalled();
        expect(global.alert).toHaveBeenCalledWith("Invalid Travel Date");
    });

    test('Stored trip is retrieved and displayed on page load', () => {
        getTripInfo.mockReturnValue({
            cityName: 'Ramallah', date: '2025-02-18', minTemp: 10, maxTemp: 20,
            cloudCover: 30, description: 'Cloudy', imageURL: 'https://example.com/ramallah.jpg'
        });

        document.dispatchEvent(new Event('DOMContentLoaded'));

        expect(document.getElementById('resultInfo').innerText).toContain('City Name: Ramallah');
        expect(document.getElementById('cityImage').src).toBe('https://example.com/ramallah.jpg');
    });
});
