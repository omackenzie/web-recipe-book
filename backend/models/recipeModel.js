const mongoose = require("mongoose");

let recipeSchema = mongoose.Schema(
  {
    title: String,
    servings: String,
    description: String,
    imageurl: String,
    ingredients: [String],
    steps: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);
