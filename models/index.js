

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

class DbManager {


  constructor() {
    this.sequelize;
    this.db = {}
  }


  async setup() {


    const Sequelize = require('sequelize');
    return new Promise(async (resolve, reject) => {
      if (config.use_env_variable) {
        this.sequelize = new Sequelize(process.env[config.use_env_variable], config);
      } else {
        this.sequelize = new Sequelize(config.database, config.username, config.password, config);
        }

      fs.readdirSync(__dirname)
        .filter(file => {
          return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-5) === 'db.js');
        })
        .forEach(file => {
          const model = require(path.join(__dirname, file))(this.sequelize, Sequelize.DataTypes);
          this.db[model.name] = model;
        });

      Object.keys(this.db).forEach(modelName => {
        if (this.db[modelName].associate) {
          this.db[modelName].associate(this.db);
        }
      });
      this.db.sequelize = this.sequelize;
      this.db.Sequelize = Sequelize;
      this.db.sequelize.authenticate().then(async () => {
        this.db.sequelize.sync({ force: true }).catch((error) => {
          console.log("error : ! " + error);
        }).then(() => {
          resolve("done");
        });
      })
    }).catch((error) => {
      reject(`error : ${error}`)
    });

  }
  model(name) { return this.db[name]; }

  con() { return this.db.sequelize; }

  Seq() { return this.db.Sequelize };

  close() { this.db.sequelize.close(); }


}

DbManager.instance = null;

DbManager.getInstance = function () {
  if (this.instance === null) {
    this.instance = new DbManager();
  }
  return this.instance;
}

module.exports = DbManager.getInstance();

