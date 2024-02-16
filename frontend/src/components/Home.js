import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RecipeSearch = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [diet, setDiet] = useState('none');
  const [excludeIngredients, setExcludeIngredients] = useState('');

  const searchRecipes = async () => {
    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=${showMore ? 100 : 20}&apiKey=f9182364c1d242fd8d9cd210473c9cb6`);
    const data = await response.json();
    setRecipes(data.results);
    console.log(data.results.length); // Log the number of recipes
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchRecipes();
  };

  const handleLoadMore = () => {
    setShowMore(true);
  };

  return (
    <div className="container-home">
      {/* <h1>Recipe Search</h1> */}
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

      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for recipes..."
          className="form-control"
        />
        <button type="submit" className="btn btn-primary mt-3">
          Search
        </button>
      </form> */}
      <div className="row mt-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={recipe.image} alt={recipe.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">Likes: {recipe.likes}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!showMore && recipes.length > 10 && (
        <button onClick={handleLoadMore} className="btn btn-primary mt-4">
          Load More
        </button>
      )}
    </div>
  );
};

export default RecipeSearch;
