var filesystem = require('fs');
const DbConfig = require('./config/config').development;
const MODELS_PATH = './models';


var dbManager = function dbManager() {
    var models = {};
    var relationships = {};
    var Sequelize = require("sequelize");
    var sequelize = null;
    this.setup = async function () {
        return new Promise(async function (resolve, reject) {
            console.log("db setup initilized ")
            sequelize = new Sequelize({
                dialect: DbConfig.dialect,
                storage: DbConfig.storage,
                charset: 'utf8mb4',
                pool: {
                    max: 5,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                },
                dialectOptions: {
                    collate: 'utf8mb4_unicode_ci',
                }
            });
            await init().then(() => {
                resolve("done");
            })

        }).catch((error) => {
            reject(`error : ${error}`)
        });
    }
    this.model = function (name) {
        return models[name];
    }

    this.Seq = function () {
        return Sequelize;
    }
    this.close = function () {
        sequelize.close();
    }
    function init() {
        try {
            return new Promise(async function (resolve, reject) {

                filesystem.readdirSync(__dirname + '\\models').forEach(function (name) {
                    console.log("1");
                    var object = require(__dirname + '\\models\\' + name);
                    var options = object.options || {}
                    var modelName = name.replace(/\.js$/i, "");
                    console.log("modalName : " + modelName);
                    models[modelName] = sequelize.define(modelName, object.model, object.columnsIndex)
                    if ("relations" in object) {
                        relationships[modelName] = object.relations;
                    }
                });

                console.log(models);
                for (var name in relationships) {
                    console.log("dd " + name);

                    var relations = relationships[name];
                    console.log("relations " + JSON.stringify(relations));
                    relations.forEach((relation) => {
                        var type = relation.type;
                        var related = relation.related_to;
                        var options = relation.relationOptions;

                        models[name][related] = models[name][type](models[related], options);
                    });


                }
                sequelize.authenticate().then(async () => {
                    console.log("connected" + sequelize.config);

                    await sequelize.drop();
                    sequelize.sync({ force: true }).catch((error) => {
                    // sequelize.sync().catch((error) => {
                        console.log("error : ! " + error);
                    }).then(() => {
                        resolve("done");
                    });

                })
            });
        } catch (error) {
            console.log(`error : ${error}`);
        };


    }

    if (dbManager.caller != dbManager.getInstance) {
        throw new Error("This object cannot be instanciated");
    }
}


dbManager.instance = null;

dbManager.getInstance = function () {
    if (this.instance === null) {
        console.log("d2222222222222222222222222");
        this.instance = new dbManager();
    }
    return this.instance;
}

module.exports = dbManager.getInstance();