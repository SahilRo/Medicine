const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const searchingRoutes = require('./routes/searchMedRoutes');
const { fetchCSV } = require('./fetchCSV');
const getlist = require('./routes/getMedListRoutes')
const feedback = require('./routes/feedbackRoutes');
const compression = require('compression'); 

const cors = require('cors');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://medicine-184c.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.get("/", (req, res) => {
  res.json("Hello");
});
app.use('/api/users', userRoutes);
app.use(feedback);
app.use(searchingRoutes, compression({ threshold: 3 * 1024 * 1024 }));
app.use(getlist, compression({ threshold: 3 * 1024 * 1024 }));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.error('Error connecting to MongoDB:', error));
