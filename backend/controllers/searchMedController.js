const { getMedicinesFromJSON } = require('../load_file');

const searchMedicine = async (req, res) => {
  console.log("In search func");

  const { name } = req.body;
  if (!name) {
    return res.status(400).send('Medicine name is required');
  }

  try {
    const medicines = await getMedicinesFromJSON();

    console.log("Search name:", name);
    console.log("Medicines:", medicines.length);

    const lowercasedName = name.toLowerCase();
    const filteredMedicines = medicines.filter(medicine =>
      medicine.Medicine_Name && medicine.Medicine_Name.toLowerCase().includes(lowercasedName)
    );

    console.log("Filtered Medicines:", filteredMedicines);
    res.json(filteredMedicines);
    console.log("Out search func");
  } catch (error) {
    console.error('Error in searchMedicine:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = searchMedicine;
