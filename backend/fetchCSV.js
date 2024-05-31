const axios = require('axios');
const csv = require('csv-parser');
const { PassThrough } = require('stream');
const NodeCache = require('node-cache');

const GOOGLE_DRIVE_FILE_ID = '1hWoim6wHt78Vcu_3xWuEQx0K6aTyHhS8';
const CSV_URL = `https://drive.google.com/uc?id=${GOOGLE_DRIVE_FILE_ID}&export=download`;

const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour
let isCSVLoaded = false;

const fetchCSV = async () => {
  if (isCSVLoaded) {
    return cache.get('medicines');
  }

  try {
    const response = await axios.get(CSV_URL, { responseType: 'stream' });
    const stream = response.data.pipe(new PassThrough());

    return new Promise((resolve, reject) => {
      let medicines = [];
      stream
        .pipe(csv())
        .on('data', (row) => {
          medicines.push(row);
        })
        .on('end', () => {
          isCSVLoaded = true;
          console.log('CSV file successfully processed');
          cache.set('medicines', medicines);
          resolve(medicines);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  } catch (error) {
    console.error('Error fetching CSV file', error);
    throw error;
  }
};

const getMedicines = () => {
  return cache.get('medicines') || [];
};

module.exports = { fetchCSV, getMedicines };
