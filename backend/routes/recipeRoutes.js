const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const {
  getRecipe,
  createRecipe,
  searchRecipe,
} = require("../controllers/recipeController");

router.get("/search", searchRecipe);
router.get("/:id", getRecipe);
router.post(
  "/create",
  body("title").not().isEmpty(),
  body("imageurl").not().isEmpty(),
  body("ingredients").not().isEmpty(),
  body("steps").not().isEmpty(),
  createRecipe
);

module.exports = router;
