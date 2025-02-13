import { handleSubmit } from '../js/formHandler';
import { checkForUrl } from '../js/urlChecker';
import { extractTextFromUrl } from '../js/extractTextFromUrl';

jest.mock('../js/urlChecker', () => ({
  checkForUrl: jest.fn(),
}));

jest.mock('../js/extractTextFromUrl', () => ({
  extractTextFromUrl: jest.fn(),
}));

document.body.innerHTML = `
  <form id="urlForm">
    <input id="name" value="https://example.com" />
    <div id="results"></div>
  </form>
`;

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        sentiment: 'positive',
        sentiment_scores: { Positive: 0.9, Negative: 0.1 },
        text: 'Sample text',
      }),
  })
);

describe('handleSubmit', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = `
      <form id="urlForm">
        <input id="name" value="https://example.com" />
        <div id="results"></div>
      </form>`;

    global.alert = jest.fn();
  });

  test('should prevent default form submission', async () => {
    const event = { preventDefault: jest.fn() };
    await handleSubmit(event);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  test('should alert if the URL is invalid', async () => {
    const event = { preventDefault: jest.fn() };
    checkForUrl.mockReturnValue(false);

    await handleSubmit(event);

    expect(global.alert).toHaveBeenCalledWith('Invalid Url');
  });

  test('should alert if the extracted text is empty', async () => {
    const event = { preventDefault: jest.fn() };
    checkForUrl.mockReturnValue(true);
    extractTextFromUrl.mockResolvedValue({ text: '' });

    await handleSubmit(event);

    expect(global.alert).toHaveBeenCalledWith('Empty Result');
  });
});
