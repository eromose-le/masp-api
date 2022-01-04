const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Vote = require('./models/Vote');
const Contestant = require('./models/Contestant');

// Connect to DB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Read JSON files
const votes = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/votes.json`, 'utf-8')
);

const contestants = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/contestants.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Vote.create(votes);
    await Contestant.create(contestants);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Vote.deleteMany();
    await Contestant.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
