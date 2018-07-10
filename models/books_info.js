module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define("Book", {

    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    author: {
      type: DataTypes.STRING,
      allowNull: false
    },

    category: {
      type: DataTypes.STRING,
      allowNull: true
    },

    description: {
      type:DataTypes.TEXT,
      allowNull: true
    },

    // Either a book request or book offering
    postType: {
      type: DataTypes.STRING,
      allowNull: false
    },

    postStatus: {
      type: DataTypes.STRING,
      allowNull: false
    },

    respondingUser: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    thumbnail: {
      type: DataTypes.STRING,
      allowNull: true
    },

    ISBN: {
      type: DataTypes.STRING,
      allowNull: false
    }
    // ****************************************

    // title: {
    //   type: DataTypes.STRING,
    //   validate: {
    //       len: [1]
    //   }
    // },
    // author: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    //   validate: {
    //       len: [1]
    //   }
    // },
    // genre: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    //   validate: {
    //       len: [1]
    //   }
    // }, 
    // summary: {
    //   type: DataTypes.TEXT, 
    //   allowNull: false 
    // },
    // bookStatus: {
    //   type: DataTypes.STRING,
    //   allowNull: true
    // },
    // userInventory: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: false,
    //   defaultValue: true 
    // },
    // userRequest: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: false,
    //   defaultValue: false 
    // }

  });

  Book.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Book.belongsTo(models.User);
  };

  return Book;
};