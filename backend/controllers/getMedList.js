const { getMedicinesFromJSON } = require('../load_file');

const getMedList = async (req, res) => {
  try {
    const medicines = await getMedicinesFromJSON();
    res.json(medicines);
  } catch (error) {
    console.error('Error in Getting Medicine List:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = getMedList;
