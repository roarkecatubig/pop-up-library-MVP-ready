module.exports = function(sequelize, DataTypes) {
  var Dream = sequelize.define("Dream", {
    title: {
      type: DataTypes.STRING
    },      
    mood: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dream: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    privacy: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    polarity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    polarity_confidence: {
      type: DataTypes.STRING
    }

  });

  Dream.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Dream.belongsTo(models.User);
  };

  return Dream;
};
