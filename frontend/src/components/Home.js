import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [keyword, setKeyword] = useState("");
  const [diet, setDiet] = useState("none");
  const [exclude, setExclude] = useState("");
  const [response, setResponse] = useState(null);

  const getRecipes = async () => {
    const apiKey = "YOUR_API_KEY";
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${keyword}&diet=${diet}&excludeIngredients=${exclude}`;

    try {
      const response = await axios.get(apiUrl);
      setResponse(response.data.results);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    if (response) {
      console.log(response);
    }
  }, [response]);

  return (
    <>
      <div className="d-flex align-items-center mx-2 my-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-6">
              <form
                className="px-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  getRecipes();
                }}
              >
                <div className="row justify-content-center">
                  <div className="col-12 col-sm-6">
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
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="my-3">
                      <label htmlFor="diet" className="form-label">
                        Diet
                      </label>
                      <select
                        id="diet"
                        className="form-select"
                        value={diet}
                        onChange={(e) => setDiet(e.target.value)}
                      >
                        {["none", "pescetarian", "lacto vegetarian", "ovo vegetarian", "vegan", "vegetarian"].map((dietOption) => (
                          <option key={dietOption} value={dietOption}>
                            {dietOption}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
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

                <div className="searchButton mb-3 text-center">
                  <button className="btn btn-primary col-8" type="submit">
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
                  alt={recipe.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="card-text">
                    {recipe.readyInMinutes && recipe.servings &&
                      `Ready in ${recipe.readyInMinutes} minutes - ${recipe.servings} Servings`}
                  </p>
                  <a href={recipe.sourceUrl}>Go to Recipe</a>
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

