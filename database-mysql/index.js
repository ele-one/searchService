const Sequelize = require('sequelize');

try {
  var config = require('./config.js')
}


catch(e) {
  var config = {
    HOST    : process.env.CLEARDB_DATABASE_HOST,
    USER    : process.env.CLEARDB_DATABASE_USER,
    PASSWORD  : process.env.CLEARDB_DATABASE_PASSWD,
    DATABASE : process.env.CLEARDB_DATABASE,
    CLIENT_ID: process.env.CLIENT_ID,
    PORT: 3306
  }
}

// to connect  mysql -u <username> -p -h us-cdbr-iron-east-04.cleardb.net

try {
  var sequelize = new Sequelize(config.DATABASE, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: 'mysql',
 });
} catch(e) {
  console.log(e)
}


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



module.exports.sequelize = sequelize;
