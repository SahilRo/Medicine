const fs = require('fs').promises;
const path = require('path');

const getMedicinesFromJSON = async () => {
  const filePath = path.join(__dirname, 'data2.json'); 
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
};

module.exports =  getMedicinesFromJSON;
