import { ApiConfig } from './config';
import { ApiHandler } from './utils/api-handler';
import { getWeatherLog, saveWeatherLog } from './utils/log-handler';

/**
 * Main CLI App execution
 */
export const App = () => {
    const api = new ApiHandler(ApiConfig);
    const logFile = 'weather-log.csv';
    let weatherLog = [];

    console.log("Restoring current log...");
    getWeatherLog(logFile)
    .then((currentLog) => {
        weatherLog = currentLog;

        console.log("Fetching Dallas current weather...");
        return api.getWeather('Dallas');
    })
    .then(response => {
        console.log("Processing data...");
        const currentData = {
            temperature: response.current.temp_c,
            units:  'C',
            precipitation: response.current.precip_in ? true : false,
            date: response.current.last_updated
        };

        console.log("Current data:", currentData);
        weatherLog.push(currentData);

        return saveWeatherLog(logFile, weatherLog);
    })
    .then(() => {
        console.log(`The weather log file was written successfully -> ${logFile}`);
    })
    .catch(error => {
        console.error(error);
    });
}
