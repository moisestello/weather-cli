import csvParser from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';
import * as fileSystem from 'fs';

/**
 * Reads the content of a given CSV file and returns it
 * Returns an empty array when the log file is not found
 * 
 * @param {string} file 
 */
export const getWeatherLog = (file) => {
    return new Promise((resolve) => {
        const rows = [];

        fileSystem.createReadStream(file)
        .on('error', () => {
            resolve([])
        })
        .pipe(csvParser())
        .on('data', (row) => {
            rows.push(row);
        })
        .on('end', () => {
            resolve(rows);
        });
    });
}

/**
 * Saves or overwrites the new log to a given csv file
 * 
 * @param {string} file 
 * @param {object} data 
 */
export const saveWeatherLog = (file, data) => {
    const csvWriter = createObjectCsvWriter({
        path: file,
        header: [
            {id: 'temperature', title: 'temperature'},
            {id: 'units', title: 'units'},
            {id: 'precipitation', title: 'precipitation'},
            {id: 'date', title: 'date'},
        ]
    });

    return csvWriter.writeRecords(data);
}