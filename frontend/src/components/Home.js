import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [keyword, setKeyword] = useState("");
  const [diet, setDiet] = useState("none");
  const [exclude, setExclude] = useState("");
  const [response, setResponse] = useState(null);
  const [recipeInfo, setRecipeInfo] = useState(null);

  const SPOONACULAR_API_KEY = "13a1325476ec4f59ac3b4436e2932aae";

  // Gets the recipes matching the input term
  const getRecipes = async () => {
    try {
      const res = await axios.get(
        "https://api.spoonacular.com/recipes/complexSearch",
        {
          params: {
            apiKey: SPOONACULAR_API_KEY,
            query: keyword,
            diet,
            excludeIngredients: exclude,
          },
        }
      );

      const { data } = res;
      setResponse(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to get specific recipe information by ID
  const getRecipeInfo = async (recipeId) => {
    try {
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/${recipeId}/information`,
        {
          params: {
            apiKey: SPOONACULAR_API_KEY,
            includeNutrition: false,
          },
        }
      );
      const { data } = res;
      // Extract the specific data you need
      const { readyInMinutes, servings, sourceUrl } = data;

      // Create an object with the extracted data
      const recipeInfoData = {
        readyInMinutes,
        servings,
        sourceUrl,
      };

      setRecipeInfo(recipeInfoData);
    } catch (error) {
      console.error(error);
    }
  };
  // Use the useEffect hook to fetch recipe information when response changes
  useEffect(() => {
    if (response && response.length > 0) {
      // Assuming you want to get information for the first recipe in the response
      getRecipeInfo(response[0].id);
    }
  }, [response]);

  return (
    <>
     
      <div className="d-flex align-items-center mx-2 my-5 ">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-8">
              <form
                className="px-5 border border-black bg-success"
                onSubmit={(e) => {
                  e.preventDefault();
                  getRecipes();
                }}
              >
                <div className="my-3">
                  <label htmlFor="recipe" className="form-label">
                    Recipe
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter a recipe"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="diet" className="form-label">
                    Diet
                  </label>
                  <select
                    id="diet"
                    className="form-select"
                    value={diet}
                    onChange={(e) => setDiet(e.target.value)}
                  >
                    {[
                      "none",
                      "pescetarian",
                      "lacto vegetarian",
                      "ovo vegetarian",
                      "vegan",
                      "vegetarian",
                    ].map((dietOption) => (
                      <option key={dietOption} value={dietOption}>
                        {dietOption}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="exclude" className="form-label">
                    Exclude Ingredients
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="coconut"
                    value={exclude}
                    onChange={(e) => setExclude(e.target.value)}
                  />
                </div>

                <div className="mb-3 text-center">
                  <button className="btn btn-warning col-8" type="submit">
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {response && (
        <div className="mt-5 p-5 row">
          {response.map((recipe) => (
            <div key={recipe.id} className="col-sm-4 mb-4">
              <div className="card h-100">
                <img
                  src={recipe.image}
                  className="card-img-top"
                  alt={recipe.id}
                />
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="card-text">
                    {recipeInfo &&
                      recipeInfo.readyInMinutes &&
                      recipeInfo.servings &&
                      `Ready in ${recipeInfo.readyInMinutes} minutes -
                      ${recipeInfo.servings} Servings`}
                  </p>
                  <a href={recipeInfo && recipeInfo.sourceUrl}>Go to Recipe</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
