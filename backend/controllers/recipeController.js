const { validationResult } = require("express-validator");
const Recipe = require("../models/recipeModel");

const limit = 9;

const getRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.status(200).send(recipe);
};

const createRecipe = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let { title, servings, description, imageurl, ingredients, steps } = req.body;

  ingredients = ingredients.split(/[\r\n]+/);
  steps = steps.split(/[\r\n]+/);

  const recipe = await Recipe.create({
    title: title,
    servings: servings,
    description: description,
    imageurl: imageurl,
    ingredients: ingredients,
    steps: steps,
  });

  return res.status(200).json(recipe);
};

const searchRecipe = async (req, res) => {
  const query = req.query.q;
  const page = req.query.page;
  const skipIndex = (page - 1) * limit;

  let recipes = await Recipe.find({
    $or: [
      { title: { $regex: new RegExp(query, "i") } },
      { ingredients: { $regex: new RegExp(query, "i") } },
    ],
  })
    .limit(limit)
    .skip(skipIndex)
    .sort({ updatedAt: -1 });
  const total = await Recipe.countDocuments({
    $or: [
      { title: { $regex: new RegExp(query, "i") } },
      { ingredients: { $regex: new RegExp(query, "i") } },
    ],
  });

  res.status(200).json({ recipes: recipes, pages: Math.ceil(total / limit) });
};

module.exports = {
  getRecipe,
  createRecipe,
  searchRecipe,
};
