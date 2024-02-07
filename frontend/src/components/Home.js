import React, { useState } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import { SEARCH_RECIPES_URL } from "../constants.js";

const Home = () => {
  const [keyword, setKeyword] = useState("");
  const [diet, setDiet] = useState("none");
  const [excludeIngredients, setExcludeIngredients] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRecipes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(SEARCH_RECIPES_URL, {
        params: { keyword, diet, excludeIngredients },
      });
      setResponse(res.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError("Error fetching recipes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Only fetch recipes if keyword is not empty
    if (keyword.trim() !== "") {
      await getRecipes();
    }
  };

  return (
    <>
      <div className="d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-8">
              <form className="px-5" onSubmit={handleSubmit}>
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
                    value={excludeIngredients}
                    onChange={(e) => setExcludeIngredients(e.target.value)}
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

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {response && (
        <div className="mt-5 p-5 row">
          {response.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
