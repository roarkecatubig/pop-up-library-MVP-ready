module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define("Book", {

    title: {
      type: Sequelize.STRING,
      validate: {
          len: [1]
      }
    },
    author: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
          len: [1]
      }
    },
    genre: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
          len: [1]
      }
    }, 
    summary: {
      type: Sequelize.TEXT, 
      allowNull: false 
    },
    userID: {
      type: Sequelize.INTEGER, 
      allowNull: false
    },
    bookStatus: {
      type: Sequelize.STRING,
      allowNull: false
    },
    userInventory: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true 
    },
    userRequest: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false 
    }

  });

  Book.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Book.belongsTo(models.User);
  };

  return Book;
};
