module.exports = function(DataTypes) {
  var Book = DataTypes.define("Book", {

    title: {
      type: DataTypes.STRING,
      validate: {
          len: [1]
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
          len: [1]
      }
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
          len: [1]
      }
    }, 
    summary: {
      type: DataTypes.TEXT, 
      allowNull: false 
    },
    userID: {
      type: DataTypes.INTEGER, 
      allowNull: false
    },
    bookStatus: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userInventory: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true 
    },
    userRequest: {
      type: DataTypes.BOOLEAN,
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
