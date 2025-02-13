import { extractTextFromUrl } from '../js/extractTextFromUrl';

describe('extractTextFromUrl', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return extracted text when URL fetch is successful', async () => {
        const mockResponse = { text: 'Sample extracted text' };

        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse),
        });

        const result = await extractTextFromUrl('http://example.com');

        expect(result).toEqual(mockResponse);
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:8000/fetch-html?url=http://example.com');
    });

    test('should show alert when scraping fails', async () => {
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({ text: 'Failed to scrape the URL' }),
        });

        global.alert = jest.fn();

        const result = await extractTextFromUrl('http://invalidUrl.com');

        expect(global.alert).toHaveBeenCalledWith('Failed to scrape the URL');
        expect(result).toBeUndefined();
    });
});
