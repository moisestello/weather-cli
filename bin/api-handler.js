const https = require('https');

/**
 * Class responsible of provide a mechanism for send signed request 
 * and return parsed responses.
 */
class ApiHandler {
    host;
    path;

    constructor(ApiConfig) {
        this.host = ApiConfig.host;
        this.path = `${ApiConfig.path}?key=${ApiConfig.key}`;
    }

    /**
     * Returns a promise with the weather information of a location
     * 
     * @param {string} location 
     */
    getWeather(location){
        return new Promise((resolve, reject) => {
            const params = {
                host: this.host,
                path: `${this.path}&q=${location}`
            };

            https.get(params, (response) => {
                var body = '';
    
                response.on('data', function (chunk) {
                    body += chunk;
                });
    
                response.on('end', function () {
                    const responseData = JSON.parse(body);

                    if(!responseData.error){
                        resolve(responseData);
                    } else {
                        reject(responseData);
                    }
                });
            });
        });
    }
}

module.exports = ApiHandler;