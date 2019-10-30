const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.NAME, 'postgres', process.env.PASS, {
    host: 'localhost',
    dialect: 'postgres'
});

const db = {};

db.Sequelize = Sequelize
db.sequelize = sequelize
    
    db.users = require('./models/user')(sequelize, Sequelize);
    db.words = require('./models/word')(sequelize, Sequelize);

    db.users.hasMany(db.words);
    db.words.belongsTo(db.users);


module.exports = db