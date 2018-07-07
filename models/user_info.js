module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
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
        allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
  zipCode: {
      type: DataTypes.INTEGER, 
      allowNull: true
    },
  rating: {
      type: DataTypes.INTEGER, 
      allowNull: false
    },
  createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
  last_login: {
      type: DataTypes.DATE
    }

    });
  
    User.associate = function(models) {
      
      User.hasMany(models.Book, {
        onDelete: "cascade"
      });
    };
  
    return User;
  };
  
