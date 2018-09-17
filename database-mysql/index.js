const Sequelize = require('sequelize');

try {
  var config = require('./config.js')
}


catch(e) {
  var config = {
    HOST     : 'searchdb-node',
    USER    : process.env.MYSQL_USER,
    PASSWORD : process.env.MYSQL_ROOT_PASSWORD,
    DATABASE : process.env.MYSQL_DATABASE,
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
