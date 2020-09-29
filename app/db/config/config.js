module.exports = {
    "development": {
        "dialect": "sqlite",
        "storage": "./pos.sqlite3"
    },
    "test": {
        "dialect": "sqlite",
        "storage": ":memory"
    },
    "production": {
        "dialect": "sqlite",
        "storage": "./pos.sqlite3"
    }
}