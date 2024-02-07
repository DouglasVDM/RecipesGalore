const axios = require("axios");
require("dotenv").config();
const searchRecipe = async (req, res) => {
  const { keyword, diet, excludeIngredients } = req.query;

  try {
    // Make request to Spoonacular API to get recipes
    const recipesResponse = await axios.get(
      "https://api.spoonacular.com/recipes/complexSearch",
      {
        params: {
          apiKey: process.env.SPOONACULAR_API_KEY,
          query: keyword,
          diet,
          excludeIngredients: excludeIngredients,
        },
      }
    );

    console.log("Fetched recipes:", recipesResponse.data.results);

    // Send the recipes data back to the client
    res.json(recipesResponse.data.results);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
module.exports = { searchRecipe };
