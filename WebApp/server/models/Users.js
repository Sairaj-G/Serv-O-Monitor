module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
         IPaddress: {
            type: DataTypes.STRING,
            allowNull: false 
         },
         Password: {
            type: DataTypes.STRING,
            allowNull: false 
         },
    })

    return Users;
}