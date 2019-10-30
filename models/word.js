module.exports = (sequelize, DataTypes) => {
    const Word = sequelize.define('word', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        word: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Word
}