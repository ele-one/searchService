const mongoose = require('mongoose')
const connection = mongoose.connection;

const MONGODB_URI = process.env.DB_URI  || 'mongodb://localhost/lex'
mongoose.connect(MONGODB_URI);

connection.once('open', function() {
  console.log('we are connected')
})


// let repoSchema = mongoose.Schema({
//   id: Number,
//   full_name: String,
//   owner: mongoose.Schema.Types.Mixed,
//   stargazers_count: Number,
//   html_url: String,
//   watchers_count: Number,
//   forks: Number,
// });

// // Creating  Model
// let Repo = mongoose.model('Repo', repoSchema);


module.exports  = connection