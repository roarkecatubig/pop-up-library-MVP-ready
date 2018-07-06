module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
          len: [1,18]
      }
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
  zipCode: {
      type: Sequelize.INTEGER, 
      allowNull: false
    },
  rating: {
      type: Sequelize.INTEGER, 
      allowNull: false
    },
  createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
  last_login: {
      type: Sequelize.DATE
    }

    });
  
    User.associate = function(models) {
      
      User.hasMany(models.Book, {
        onDelete: "cascade"
      });
    };
  
    return User;
  };
  
