

const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];


class DbManager {

  constructor() {

  }

  sequelize;
  db = {};
  async setup() {
    const Sequelize = require('sequelize');

    console.log("db setup initilized ")
    return new Promise(async (resolve, reject) => {

      if (config.use_env_variable) {
        this.sequelize = new Sequelize(process.env[config.use_env_variable], config);
      } else {
        this.sequelize = new Sequelize(config.database, config.username, config.password, config);

      }

      fs
        .readdirSync(__dirname)
        .filter(file => {
          return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-5) === 'db.js');
        })
        .forEach(file => {
          const model = require(path.join(__dirname, file))(this.sequelize, Sequelize.DataTypes);
          this.db[model.name] = model;
        });
      console.log(this.db);
      Object.keys(this.db).forEach(modelName => {
        if (this.db[modelName].associate) {
          this.db[modelName].associate(this.db);
        }
      });
      //connection instance 
      this.db.sequelize = this.sequelize;
      //sequelize instance  
      this.db.Sequelize = Sequelize;
      // resolve("done");
      this.db.sequelize.authenticate().then(async () => {

        // await this.db.sequelize.drop();
        this.db.sequelize.sync({ force: true }).catch((error) => {
          // sequelize.sync().catch((error) => {
          console.log("error : ! " + error);
        }).then(() => {
          resolve("done");
        });

      })
    }).catch((error) => {
      reject(`error : ${error}`)
    });

  }
  model(name) {
    return this.db[name];
  }

  con() {
    return this.db.sequelize;
  }

  Seq() {
    return this.db.Sequelize;
  }
  close() {
    this.db.sequelize.close();
  }


  // if (dbManager.caller != dbManager.getInstance) {
  //   throw new Error("This object cannot be instanciated");
  // }
}

DbManager.instance = null;

DbManager.getInstance = function () {
  if (this.instance === null) {
    this.instance = new DbManager();
  }
  return this.instance;
}

module.exports = DbManager.getInstance();

