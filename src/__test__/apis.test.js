import {pixabayAPI,geoNamesAPI,weatherbitAPI } from '../client/js/apis.js';

test('testing api calls', () => {
    expect(pixabayAPI).toBeDefined();
    expect(geoNamesAPI).toBeDefined();
    expect(weatherbitAPI).toBeDefined();
});