import { ApiConfig } from './config';
import { ApiHandler } from './utils/api-handler';

/**
 * Main CLI App execution
 */
export const App = () => {
    const api = new ApiHandler(ApiConfig);

    console.log("Fetching Dallas current weather...");

    api.getWeather('Dallas')
    .then(response => {
        console.log("Processing data...");
        const data = {
            temperature: response.current.temp_c,
            units:  'C',
            precipitation: response.current.precip_in ? true : false
        };
    })
    .catch(error => {
        console.error(error);
    });
}
